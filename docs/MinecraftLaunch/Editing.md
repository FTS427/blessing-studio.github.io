---
sidebar_position: 2
title: 快速开始
---


# MinecraftLaunch 功能指南

## 基础配置

```csharp
// 网络配置
DownloadMirrorManager.MaxThread = 256;        // 最大并发下载线程
DownloadMirrorManager.IsEnableMirror = false; // 是否启用下载镜像
CurseforgeProvider.CurseforgeApiKey = "your_api_key"; // Curseforge API密钥

// HTTP初始化
HttpUtil.Initialize();
```

## 核心功能模块

### 1. 原版游戏安装器
**用途**：安装纯净版 Minecraft

**参数列表**：
- `.minecraft`：游戏根目录路径
- `entry`：通过 `VanillaInstaller.EnumerableMinecraftAsync()` 获取的版本条目

```csharp
var entry = await VanillaInstaller.EnumerableMinecraftAsync()
    .FirstAsync(x => x.Id == "1.20.1");

var installer = VanillaInstaller.Create(
    minecraftPath: ".minecraft", 
    entry: entry
);

installer.ProgressChanged += (_, arg) => 
    Console.WriteLine($"{arg.StepName} - 进度: {arg.Progress * 100:0.00}%");

var minecraft = await installer.InstallAsync();
```

### 2. Forge 安装器
**用途**：安装 Forge 模组加载器

**参数列表**：
- `.minecraft`：游戏根目录路径
- `javaPath`：Java 执行文件路径（推荐 JDK 8）
- `entry`：通过 `ForgeInstaller.EnumerableForgeAsync()` 获取的版本条目

```csharp
var forgeEntry = await ForgeInstaller.EnumerableForgeAsync(
    mcVersion: "1.20.1", 
    isSnapshot: true
).FirstAsync();

var installer = ForgeInstaller.Create(
    minecraftPath: ".minecraft",
    javaPath: "/path/to/java.exe", 
    entry: forgeEntry
);
```

### 3. 整合包安装（Curseforge）
**用途**：安装 Curseforge 整合包

**参数列表**：
- `minecraftPath`：游戏根目录
- `modpackPath`：整合包 ZIP 文件路径
- `entry`：通过 `ParseModpackInstallEntry()` 解析的条目
- `targetMinecraft`：目标 Minecraft 版本

```csharp
var modpackEntry = CurseforgeModpackInstaller.ParseModpackInstallEntry(
    @"path/to/modpack.zip"
);

var installer = CurseforgeModpackInstaller.Create(
    minecraftPath: ".minecraft",
    modpackPath: @"path/to/modpack.zip",
    entry: modpackEntry,
    targetMinecraft: new MinecraftParser(".minecraft").GetMinecraft("1.20.1")
);
```

### 4. 微软账户验证
**用途**：实现微软账户登录验证

**参数列表**：
- `clientId`：Azure 应用注册的客户端 ID
- `UserCode`：设备流验证码
- `VerificationUrl`：验证网址

```csharp
var authenticator = new MicrosoftAuthenticator("your_client_id");
var oAuth2Token = await authenticator.DeviceFlowAuthAsync(x => {
    Console.WriteLine($"访问 {x.VerificationUrl} 输入代码: {x.UserCode}");
});

var account = await authenticator.AuthenticateAsync(oAuth2Token);
```

### 5. 游戏启动器
**用途**：启动 Minecraft 实例

**参数列表**：
- `Account`：验证器获取的账户对象
- `MaxMemorySize`：最大分配内存（MB）
- `JavaPath`：Java 运行时路径
- `SaveName`：存档名称

```csharp
var runner = new MinecraftRunner(new LaunchConfig {
    Account = new OfflineAuthenticator().Authenticate("PlayerName"),
    MaxMemorySize = 4096,
    JavaPath = JavaUtil.EnumerableJava().First(),
    SaveName = "MyWorld"
}, ".minecraft");

var process = await runner.RunAsync(minecraftEntry);
```

## 高级功能

### 复合安装器
**用途**：组合安装多个模组加载器

**参数列表**：
- `entries`：安装条目数组（支持 Vanilla/Forge/Optifine 等）
- `javaPath`：Java 执行路径
- `versionName`：自定义版本名称

```csharp
var compositeInstaller = CompositeInstaller.Create(
    entries: [vanillaEntry, forgeEntry, optifineEntry],
    minecraftPath: ".minecraft",
    javaPath: "/path/to/java.exe",
    versionName: "Custom_Pack"
);
```

## 配置建议

1. **路径规范**
   ```csharp
   // 推荐使用绝对路径
   var minecraftPath = Path.Combine(Environment.GetFolderPath(
       Environment.SpecialFolder.ApplicationData), 
       ".minecraft");
   ```

2. **Java 检测**
   ```csharp
   // 自动检测所有已安装 Java
   var javas = await JavaUtil.EnumerableJavaAsync().ToListAsync();
   var suitableJava = minecraftEntry.GetAppropriateJava(javas);
   ```

3. **错误处理**
   ```csharp
   try {
       await installer.InstallAsync();
   } 
   catch (Exception ex) {
       Console.WriteLine($"安装失败: {ex.Message}");
   }
   ```
