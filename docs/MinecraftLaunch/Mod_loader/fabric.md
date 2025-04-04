# Fabric 安装器

该安装器用于安装 Fabric 模组加载器，支持所有 Fabric 官方发布的版本。

## 获取版本信息

```csharp
using MinecraftLaunch.Components.Installer;

// 获取所有可用的 Fabric 加载器版本
await foreach(var loader in FabricInstaller.EnumerableFabricLoadersAsync()) {
    Console.WriteLine($"加载器版本: {loader.Version}");
}

// 获取指定游戏版本的最新加载器
var latestLoader = await FabricInstaller.EnumerableFabricLoadersAsync()
    .FirstOrDefaultAsync();
```

## 初始化安装器

```csharp
var installer = FabricInstaller.Create(
    ".minecraft",     // 游戏根目录
    "1.20.1",        // Minecraft 版本
    latestLoader     // Fabric 加载器版本
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

- `IsFabric` - 标识这是一个 Fabric 核心
- `FabricVersion` - Fabric 加载器版本
- `Arguments` - Fabric 特定的启动参数

:::note
Fabric 安装器会自动处理以下依赖：

- Fabric Loader
- Fabric API（如果需要）
- 中间映射文件

:::
