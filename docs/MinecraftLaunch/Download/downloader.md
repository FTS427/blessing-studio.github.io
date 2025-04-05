---
sidebar_position: 1
---

# 资源下载管理

ML 提供了强大的资源下载功能，支持游戏文件、模组、整合包等多种资源的下载。

## 基础下载

```csharp
using MinecraftLaunch.Components.Downloader;

// 创建下载任务
var task = new DownloadTask {
    Url = "https://example.com/file.jar",
    Directory = ".minecraft/mods",
    FileName = "mod.jar"
};

// 创建下载器
var downloader = new FileDownloader();

// 监听下载进度
downloader.ProgressChanged += (_, arg) => {
    Console.WriteLine($"下载速度: {FileDownloader.GetSpeedText(arg.Speed)}");
    Console.WriteLine($"下载进度: {arg.Progress:P2}");
};

// 开始下载
await downloader.DownloadAsync(task);
```

## 多文件下载

```csharp
// 创建多个下载任务
var tasks = new List<DownloadTask> {
    new() { Url = "...", Directory = "...", FileName = "..." },
    new() { Url = "...", Directory = "...", FileName = "..." }
};

// 并行下载
var downloader = new FileDownloader {
    MaxParallelDownloads = 64  // 最大并行数
};

await downloader.DownloadAsync(tasks);
```

## 镜像源配置

```csharp
// 配置下载镜像
DownloadMirrorManager.IsEnableMirror = true;
DownloadMirrorManager.MaxThread = 256;

// 自定义镜像源
DownloadMirrorManager.CustomMirrors = new[] {
    "https://mirror1.example.com",
    "https://mirror2.example.com"
};
```

## 下载验证

```csharp
var task = new DownloadTask {
    Url = "...",
    Directory = "...",
    FileName = "...",
    Hash = "文件的SHA1或MD5值",  // 可选
    Size = 1234567             // 可选，文件大小
};

// 下载时会自动验证文件完整性
await downloader.DownloadAsync(task);
```

## 错误处理

```csharp
try {
    await downloader.DownloadAsync(task);
} catch (DownloadException ex) {
    switch (ex.ErrorType) {
        case DownloadError.NetworkError:
            Console.WriteLine("网络错误");
            break;
        case DownloadError.HashMismatch:
            Console.WriteLine("文件校验失败");
            break;
        case DownloadError.DiskError:
            Console.WriteLine("磁盘写入错误");
            break;
    }
}
```
