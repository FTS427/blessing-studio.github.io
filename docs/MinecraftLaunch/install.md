---
sidebar_position: 2
title: 安装 & 配置 ML
---

## 安装 ML

对于 ML 的安装，我们有两种方案可选:

1. 从发行包安装

2. 从源代码引用

### 从发行包进行安装

#### Nuget Package Manager

目前，您可以方便的从 Nuget 上搜索并下载 ML 的软件包，您可以在 Visual Studio 的包管理器中搜索 ML 并将其添加到您的项目中也是可行的

或者，您也可以手动在 Visual Studio 中的 “程序包管理器控制台”(Package Manager Console) 中执行以下命令进行安装

```PM
NuGet\Install-Package MinecraftLaunch -Version 4.0.0
```

#### .NET CLI

要通过 .NET CLI 来安装 ML，您只需要将终端的工作文件夹切换到包含 .csproj 文件的项目目录中执行一下命令进行安装

```bash
dotnet add package MinecraftLaunch --version 4.0.0
```

#### Package Reference

PackageReference 是微软为现代 .NET 项目推出的一种新的软件包管理规范， 详细信息可以在 [此处](https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files) 中查看

您只需要将以下的 XML 代码粘贴入您的项目文件(.csproj)即可

```xml
<PackageReference Include="MinecraftLaunch" Version="4.0.0" />
```

:::tip
以上的代码或者命令中的 `4.0.0` 为 ML 的版本号，随着不断地更新迭代，您可以选择其他的版本，所有的版本可以在 [此处](https://www.nuget.org/packages/MinecraftLaunch#versions-body-tab) 查看
:::

### 从源代码进行引用

本项目的所有源代码被托管在 Github 上，这将意味着您可以很轻松的使用 git，Github Desktop 等工具拉取和管理 ML 的源代码

#### 克隆

在您所需要的位置打开终端，执行以下命令进行克隆

```bash title="对于 git 用户"
git clone https://github.com/Lunova-Studio/MinecraftLaunch.git
```

```bash title="对于 github-cli 用户"
gh repo clone Lunova-Studio/MinecraftLaunch
```

#### 子模块

您可以将本项目作为一个 子模块(Git Submodule) 形式添加到您的项目中

在您所需要的位置打开终端，执行以下命令进行添加子模块

```bash
git submodule add https://github.com/Lunova-Studio/MinecraftLaunch.git
```

:::tip
Git Submodule 是一个非常实用的功能，在这里我们只展示了其最基本的用例。 在 [此处](https://git-scm.com/book/en/v2/Git-Tools-Submodules) 中您可以查看到更多的使用案例
:::

#### 添加引用(可选)

> 接下来的操作仅限于使用 Visual Studio 进行开发的人员

接下来，在 Visual Studio 的 解决方案资源管理器 视图中，右键点击位于树状图顶层的解决方案名称。 并选择 “添加”-“现有项目”，并在文件浏览窗口中找到刚刚克隆的 ML 项目文件夹中的 MinecraftLaunch/MinecraftLaunch.csproj

接着，在 解决方案资源管理器 找到您需要引用 ML 的项目，并右键单击，选择 “添加”-“项目引用”。 最后在弹出窗口中勾选 ML 即可完成对其的引用

## 配置 ML

在使用 ML 之前，您需要在程序的入口点（通常是 App.xaml.cs 或 Program.cs） 中添加一些代码来初始化 ML 的相关服务

### 网络相关

```csharp
using MinecraftLaunch.Utilities;

HttpUtil.Initialize();
```

### 下载相关

```csharp
using MinecraftLaunch;

DownloadMirrorManager.MaxThread = 256 //设置下载最大线程数
DownloadMirrorManager.IsEnableMirror = false //是否启用镜像下载
```

### Curseforge API(可选)

该服务为可选项目，如果您没有使用任何 CurseForge 相关服务，您可以忽略这个步骤

:::tip
在注册 CurseForge 服务前，您需要准备 CurseForge 官方下发的 API KEY。 如果您还没有，请前往 [此处](https://support.curseforge.com/en/support/solutions/articles/9000208346-about-the-curseforge-api-and-how-to-apply-for-a-key) 来获得您的 API KEY
:::

:::warning
API Key 为敏感个人数据，请妥善储存，不要轻易泄露给他人
:::

```csharp
using MinecraftLaunch.Components.Provider;

CurseforgeProvider.CurseforgeApiKey = "YOUR_API_KEY" //此处的 `YOUR_API_KEY` 填写你的 Curseforge API Key
```
