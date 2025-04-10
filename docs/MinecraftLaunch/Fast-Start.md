---
sidebar_position: 3
---

# ML 快速开始

本文档将帮助您快速上手 MinecraftLaunch (ML) 的核心功能。

## 初始化配置

在使用 ML 之前，建议先进行基础配置：

```csharp
using MinecraftLaunch;

// 配置下载线程数和镜像源
DownloadMirrorManager.MaxThread = 256;
DownloadMirrorManager.IsEnableMirror = true; // 启用镜像源加速

// 如果需要使用 Curseforge API
CurseforgeProvider.CurseforgeApiKey = "Your Api Key";

// 初始化 HTTP 工具
HttpUtil.Initialize();
```

## 基础功能

### 1. 原版游戏安装

```csharp
// 获取版本信息
var version = await VanillaInstaller.EnumerableMinecraftAsync()
    .FirstAsync(x => x.Id == "1.20.1");

// 创建安装器
var installer = VanillaInstaller.Create(".minecraft", version);

// 监听进度
installer.ProgressChanged += (_, arg) => {
    Console.WriteLine($"{arg.StepName} - {arg.Progress:P2}");
};

// 开始安装
var result = await installer.InstallAsync();
```

### 2. 模组加载器安装

```csharp
// Forge 安装示例
var forge = await ForgeInstaller.EnumerableForgeAsync("1.20.1", true)
    .FirstOrDefaultAsync();
var forgeInstaller = ForgeInstaller.Create(
    ".minecraft", 
    "java.exe",
    forge
);

// Fabric 安装示例
var fabric = await FabricInstaller.EnumerableFabricAsync("1.20.1")
    .FirstOrDefaultAsync();
var fabricInstaller = FabricInstaller.Create(".minecraft", fabric);
```

### 3. 账户验证

```csharp
// 离线验证
var offlineAccount = new OfflineAuthenticator()
    .Authenticate("PlayerName");

// 微软验证
var msAuth = new MicrosoftAuthenticator("CLIENT_ID");
var oAuth2Token = await msAuth.DeviceFlowAuthAsync(code => {
    Console.WriteLine($"请访问: {code.VerificationUrl}");
    Console.WriteLine($"输入代码: {code.UserCode}");
});
var msAccount = await msAuth.AuthenticateAsync(oAuth2Token);
```

### 4. 游戏启动

```csharp
var runner = new MinecraftRunner(new LaunchConfig() {
    Account = account,
    MaxMemorySize = 4096,
    JavaPath = JavaUtil.EnumerableJava().First(),
    WindowSize = new(1280, 720)
}, ".minecraft");

var process = await runner.RunAsync(gameCore);
```

## 高级功能

### 复合安装器

```csharp
var installer = CompositeInstaller.Create(
    ".minecraft",
    "java.exe",
    new[] { 
        vanillaEntry,
        forgeEntry,
        optifineEntry 
    }
);
```

### 整合包安装

```csharp
// Curseforge 整合包
var cfInstaller = CurseforgeModpackInstaller.Create(
    ".minecraft",
    "modpack.zip",
    "java.exe"
);

// Modrinth 整合包
var mrInstaller = ModrinthModpackInstaller.Create(
    ".minecraft",
    "modpack.mrpack",
    "java.exe"
);
```

:::tip
所有安装器都支持进度回调，可以通过 `ProgressChanged` 事件监听安装进度
:::

## 配置建议

1. 在生产环境中建议：
   - 启用镜像源加速下载
   - 适当调整下载线程数
   - 正确配置 Java 运行时路径

2. 在开发环境中建议：
   - 使用离线验证进行测试
   - 设置合适的日志级别
   - 处理可能的异常情况

:::warning
请确保：
- 有足够的磁盘空间
- 正确的文件权限
- 稳定的网络连接
:::
