# Forge 安装器

该安装器用于安装 Forge 加载器，支持新版 Forge 和 NeoForge。

## 获取版本信息

```csharp
using MinecraftLaunch.Components.Installer;

// 获取指定 Minecraft 版本的所有可用 Forge 版本
await foreach(var version in ForgeInstaller.EnumerableForgeAsync("1.20.1")) {
    Console.WriteLine($"Build: {version.BuildVersion}");
}

// 获取最新版本
var latest = await ForgeInstaller.EnumerableForgeAsync("1.20.1", true)
    .FirstOrDefaultAsync();
```

## 初始化安装器

```csharp
var installer = ForgeInstaller.Create(
    ".minecraft",                         // 游戏根目录
    "java.exe",                          // Java 可执行文件路径
    forgeVersion                         // Forge 版本信息
);

installer.ProgressChanged += (_, arg) => {
    Console.WriteLine($"{arg.StepName} - " +
        $"{arg.FinishedStepTaskCount}/{arg.TotalStepTaskCount} - " +
        $"{(arg.IsStepSupportSpeed ? 
            $"{FileDownloader.GetSpeedText(arg.Speed)} - {arg.Progress * 100:0.00}%" : 
            $"{arg.Progress * 100:0.00}%")}"
    );
};
```

## 开始安装

```csharp
var minecraft = await installer.InstallAsync();
Console.WriteLine($"安装完成: {minecraft.Id}");
```

## 安装结果

安装完成后会返回一个 `GameCore` 实例，包含以下特有属性：

- `IsForge` - 标识这是一个 Forge 核心
- `ForgeVersion` - Forge 版本号
- `Arguments` - Forge 特定的启动参数

:::warning
安装 Forge 需要提供正确版本的 Java 运行时，建议：

- 1.17+ 版本使用 Java 17
- 1.16.5 及更早版本使用 Java 8

:::
