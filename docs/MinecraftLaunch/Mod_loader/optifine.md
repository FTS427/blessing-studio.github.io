# OptiFine 安装器

该安装器用于安装 OptiFine 优化工具，支持独立安装或与 Forge 联合安装。

## 获取版本信息

```csharp
using MinecraftLaunch.Components.Installer;

// 获取指定 Minecraft 版本的所有可用 OptiFine 版本
await foreach(var version in OptifineInstaller.EnumerableOptifineAsync("1.20.1")) {
    Console.WriteLine($"版本: {version.Type}_{version.Patch}");
}

// 获取最新版本
var latest = await OptifineInstaller.EnumerableOptifineAsync("1.20.1")
    .FirstOrDefaultAsync();
```

## 初始化安装器

```csharp
var installer = OptifineInstaller.Create(
    ".minecraft",     // 游戏根目录
    "java.exe",       // Java 可执行文件路径
    latest           // OptiFine 版本信息
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
// 独立安装
var minecraft = await installer.InstallAsync();
```

你可以按照以上的代码对 Optofine 进行独立安装，或者采用下方的代码联合 Forge 进行安装

```csharp
// 与 Forge 联合安装
var minecraft = await installer.InstallAsync(forgeVersion);
```

## 安装结果

安装完成后会返回一个 `GameCore` 实例，包含以下特有属性：

- `IsOptifine` - 标识这是一个包含 OptiFine 的核心
- `OptifineVersion` - OptiFine 版本信息
- `Arguments` - OptiFine 特定的启动参数

:::warning
安装 OptiFine 需要注意

1. 需要提供正确版本的 Java 运行时
2. 与 Forge 联合安装时需确保版本兼容性
3. 不支持与 Fabric/Quilt 联合安装

:::

:::tip
使用复合安装器可以更方便地完成 Forge+OptiFine 的联合安装
:::
