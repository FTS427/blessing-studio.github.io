# Modrinth 整合包安装器

该安装器用于安装来自 Modrinth 的整合包，支持 `.mrpack` 格式。

## 初始化安装器

```csharp
using MinecraftLaunch.Components.Installer.Modpack;

var installer = ModrinthModpackInstaller.Create(
    ".minecraft",                    // 游戏根目录
    "path/to/modpack.mrpack",       // 整合包文件路径
    "java.exe"                      // Java 可执行文件路径（如需安装 Forge/Fabric）
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
var result = await installer.InstallAsync();
Console.WriteLine($"安装完成: {result.Id}");
```

## 安装结果

整合包安装完成后会返回安装结果，包含以下信息：

- `GameCore` - 安装的游戏核心实例
- `ModCount` - 已安装的模组数量
- `ResourcepackCount` - 已安装的资源包数量
- `ShaderpackCount` - 已安装的光影包数量
- `ConfigCount` - 已安装的配置文件数量

## 自定义安装选项

```csharp
var installer = ModrinthModpackInstaller.Create(
    ".minecraft",
    "path/to/modpack.mrpack",
    "java.exe",
    new() {
        SkipExistingFiles = true,       // 跳过已存在的文件
        OverrideConfigs = false,        // 是否覆盖配置文件
        MaxParallelDownloads = 64       // 最大并行下载数
    }
);
```
