---
sidebar_position: 2
---

# 游戏核心管理

ML 提供了完整的游戏核心管理功能，包括核心检测、版本解析和依赖处理。

## 检测本地游戏核心

```csharp
using MinecraftLaunch.Components;

// 检测所有已安装的游戏核心
var cores = await GameCoreUtil.GetGameCoresAsync(".minecraft");

foreach (var core in cores)
{
    Console.WriteLine($"ID: {core.Id}");
    Console.WriteLine($"类型: {core.Type}");
    Console.WriteLine($"加载器: {core.Source}");
    Console.WriteLine("-------------------");
}

// 查找特定版本
var specific = await GameCoreUtil.GetGameCoreAsync(
    ".minecraft",
    "1.20.1-forge-47.1.0"
);
```

## 版本信息解析

```csharp
// 解析版本信息
var core = await GameCoreUtil.GetGameCoreAsync(".minecraft", "1.20.1");

// 获取核心信息
Console.WriteLine($"主类: {core.MainClass}");
Console.WriteLine($"资源版本: {core.Assets}");
Console.WriteLine($"发布时间: {core.ReleaseTime}");

// 判断加载器类型
if (core.IsForge)
    Console.WriteLine($"Forge 版本: {core.ForgeVersion}");
if (core.IsFabric)
    Console.WriteLine($"Fabric 版本: {core.FabricVersion}");
```

## 依赖库管理

```csharp
// 检查依赖完整性
var checker = new GameChecker(core);
var result = await checker.CheckLibrariesAsync();

foreach (var missing in result.MissingLibraries)
{
    Console.WriteLine($"缺失库文件: {missing.Name}");
    // 下载缺失的依赖
    await missing.DownloadAsync(".minecraft/libraries");
}
```

## 资源文件检查

```csharp
// 检查资源文件
var assetResult = await checker.CheckAssetsAsync();

if (!assetResult.IsComplete)
{
    Console.WriteLine($"缺失 {assetResult.MissingAssets.Count} 个资源文件");
    // 下载缺失的资源
    await checker.DownloadAssetsAsync();
}
```
