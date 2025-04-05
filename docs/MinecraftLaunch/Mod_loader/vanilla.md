# 原版安装器

该安装器用于安装原版 Minecraft，支持所有正式发布的版本。

## 获取版本信息

```csharp
using MinecraftLaunch.Components.Installer;

// 获取所有可用版本
await foreach(var version in VanillaInstaller.EnumerableMinecraftAsync()) {
    Console.WriteLine(version.Id);
}

// 获取指定版本
var version = await VanillaInstaller.EnumerableMinecraftAsync()
    .FirstAsync(x => x.Id == "1.20.1");
```

## 初始化安装器

```csharp
var installer = VanillaInstaller.Create(
    ".minecraft",     // 游戏根目录
    version          // 要安装的版本信息
);

// 注册进度回调
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

安装完成后会返回一个 `GameCore` 实例，包含以下主要属性：

- `Id` - 游戏版本号
- `Type` - 游戏类型 (Release/Snapshot等)
- `Source` - 游戏核心来源
- `MainClass` - 主类名称
- `Assets` - 资源索引版本
- `JavaVersion` - 所需Java版本信息

:::note
安装过程会自动下载所需的所有文件，包括游戏核心、资源文件等
:::

:::tip
可以通过配置 `DownloadMirrorManager` 来使用国内镜像加速下载
:::
