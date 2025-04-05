# Java 运行时管理

ML 提供了完整的 Java 运行时检测和管理功能，帮助您正确选择和使用 Java 运行时。

## 检测系统 Java

```csharp
using MinecraftLaunch.Components;

// 获取系统中所有的 Java 运行时
var javas = JavaUtil.EnumerableJava();

foreach (var java in javas)
{
    Console.WriteLine($"版本: {java.JavaVersion}");
    Console.WriteLine($"路径: {java.JavaPath}");
    Console.WriteLine($"64位: {java.Is64Bit}");
    Console.WriteLine($"可执行文件: {java.ExecutablePath}");
}
```

## 版本检查

```csharp
// 检查 Java 版本是否兼容
bool isCompatible = JavaUtil.CheckJavaVersion(
    javaPath,           // Java 路径
    gameVersion,        // 游戏版本
    out string message  // 错误信息
);

if (!isCompatible)
{
    Console.WriteLine($"Java 版本不兼容: {message}");
}
```

## 版本推荐

```csharp
// 获取推荐的 Java 版本
var recommendedVersion = JavaUtil.GetRecommendedJavaVersion(gameCore);
Console.WriteLine($"推荐使用 Java {recommendedVersion}");

// 获取符合要求的 Java 运行时
var suitable = JavaUtil.EnumerableJava()
    .Where(x => x.JavaVersion.Major == recommendedVersion);
```

## 兼容性对照表

| Minecraft 版本 | 推荐 Java 版本 | 最低要求 |
|----------------|----------------|----------|
| 1.17+ | Java 17 | Java 16 |
| 1.16.5 | Java 8/11 | Java 8 |
| 1.12.2 及以下 | Java 8 | Java 8 |

## 自动下载 Java

```csharp
// 自动下载所需的 Java 运行时
var downloader = new JavaDownloader(
    ".minecraft/runtime",  // 下载目录
    JavaVersion.Java_17    // 目标版本
);

downloader.ProgressChanged += (_, arg) => {
    Console.WriteLine($"下载进度: {arg.Progress:P2}");
};

var javaPath = await downloader.DownloadAsync();
```
