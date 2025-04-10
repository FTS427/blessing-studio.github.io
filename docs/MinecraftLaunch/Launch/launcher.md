---
sidebar_position: 1
---

# 启动器核心

ML 提供了强大的启动器核心功能，支持各类游戏版本和账户类型的启动。

## 基础配置

```csharp
using MinecraftLaunch.Components;
using MinecraftLaunch.Base.Models.Launch;

// 创建启动配置
var config = new LaunchConfig() {
    Account = account,                    // 账户实例
    MaxMemorySize = 4096,                // 最大内存(MB)
    MinMemorySize = 1024,                // 最小内存(MB)
    JavaPath = javaUtil,          // Java路径
    WindowSize = new(1280, 720),         // 窗口大小
    ServerAddress = "localhost:25565",    // 服务器地址(可选)
    LauncherName = "MyLauncher",         // 启动器名称
    IsFullScreen = false                 // 是否全屏
};
```

:::tip
- account 代指一个 Account 的实例或其子类的实例.
- javaUtil 代指一个 JavaUtil的实例或其子类的实例.
:::

## 启动游戏

```csharp
// 创建启动器实例
var runner = new MinecraftRunner(
    config,                 // 启动配置
    ".minecraft"           // 游戏根目录
);

// 监听启动日志
runner.GameLogEventReceived += (_, log) => {
    Console.WriteLine($"[Game] {log}");
};

// 监听启动状态
runner.GameExitEventReceived += (_, exitCode) => {
    Console.WriteLine($"游戏已退出，退出码: {exitCode}");
};

// 开始启动
var process = await runner.RunAsync(gameCore);
```

## 高级配置

### 自定义 JVM 参数

```csharp
var config = new LaunchConfig {
    // ...其他配置...
    ExtraJvmArgs = new[] {
        "-XX:+UseG1GC",
        "-XX:+UnlockExperimentalVMOptions",
        "-XX:G1NewSizePercent=20",
        "-XX:G1ReservePercent=20",
        "-XX:MaxGCPauseMillis=50",
        "-XX:G1HeapRegionSize=32M"
    }
};
```

### 自定义游戏参数

```csharp
var config = new LaunchConfig {
    // ...其他配置...
    ExtraGameArgs = new[] {
        "--debugMode",
        "--quickPlayMode=true",
        "--customSetting=value"
    }
};
```

:::warning
启动游戏时需要注意：

1. 确保 Java 版本与游戏版本兼容
2. 为游戏分配合适的内存大小
3. 正确配置游戏目录权限

:::

:::tip
优化建议：

1. 对于现代版本（1.13+）推荐使用 G1GC
2. 内存分配建议为系统可用内存的 1/2
3. 可以通过环境变量配置代理设置

:::
