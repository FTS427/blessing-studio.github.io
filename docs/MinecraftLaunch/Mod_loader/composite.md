# 复合安装器

复合安装器允许你在一次操作中完成多个组件的安装，比如同时安装 Forge 和 OptiFine。

## 初始化安装器

```csharp
using MinecraftLaunch.Components.Installer;

var installer = CompositeInstaller.Create(
    ".minecraft",     // 游戏根目录
    "java.exe"        // Java 可执行文件路径
);

// 添加需要安装的组件
installer.AddTask(new ForgeInstallerInfo {
    GameVersion = "1.20.1",
    BuildVersion = "47.1.0"
});

installer.AddTask(new OptifineInstallerInfo {
    GameVersion = "1.20.1",
    Type = "HD_U",
    Patch = "I4"
});

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

安装完成后会返回一个 `GameCore` 实例，包含所有已安装组件的特性。

## 支持的组合

| 组件 1 | 组件 2 | 组件 3 | 说明 |
|--------|--------|--------|------|
| Forge | OptiFine | - | 最常用的组合 |
| Fabric | - | - | 不支持与其他组件组合 |
| Quilt | - | - | 不支持与其他组件组合 |

:::warning
使用复合安装器时需注意

1. 确保所有组件版本相互兼容
2. Fabric/Quilt 不支持与其他组件组合
3. 需要提供合适的 Java 运行时

:::

:::tip
复合安装器会自动处理组件之间的依赖关系，并保证正确的安装顺序
:::
