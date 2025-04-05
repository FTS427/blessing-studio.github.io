# Quilt 安装器

该安装器用于安装 Quilt 模组加载器，Quilt 是一个基于 Fabric 的新一代模组加载器。

## 获取版本信息

```csharp
using MinecraftLaunch.Components.Installer;

// 获取所有可用的 Quilt 加载器版本
await foreach(var loader in QuiltInstaller.EnumerableQuiltLoadersAsync()) {
    Console.WriteLine($"加载器版本: {loader.Version}");
}

// 获取最新版本的加载器
var latestLoader = await QuiltInstaller.EnumerableQuiltLoadersAsync()
    .FirstOrDefaultAsync();
```

## 初始化安装器

```csharp
var installer = QuiltInstaller.Create(
    ".minecraft",     // 游戏根目录
    "1.20.1",        // Minecraft 版本
    latestLoader     // Quilt 加载器版本
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

- `IsQuilt` - 标识这是一个 Quilt 核心
- `QuiltVersion` - Quilt 加载器版本
- `Arguments` - Quilt 特定的启动参数

:::note
Quilt 安装器会自动处理以下依赖

- Quilt Loader
- Quilted Fabric API（如果需要）
- 中间映射文件

:::

:::tip
由于 Quilt 与 Fabric 有很好的兼容性

1. 大多数 Fabric 模组可以直接在 Quilt 上运行
2. 可以同时安装 Fabric 和 Quilt 的模组

:::
