---
sidebar_position: 3
---

# 微软正版验证

该验证类型实现了微软 Xbox Live 和 Minecraft 的完整验证流程，用于正版账户登录。

## 初始化验证器

```csharp
using MinecraftLaunch.Components.Authenticator;

var authenticator = new MicrosoftAuthenticator("YOUR_CLIENT_ID"); // `YOUR_CLIENT_ID`替换为你的应用程序 Client ID
```

## 账户验证

微软验证使用设备代码流程进行身份验证：

```csharp
var oAuth2Token = await authenticator.DeviceFlowAuthAsync(deviceCode => {
    Console.WriteLine($"请访问: {deviceCode.VerificationUrl}");
    Console.WriteLine($"输入代码: {deviceCode.UserCode}");
});

var account = await authenticator.AuthenticateAsync(oAuth2Token);
```

## 刷新令牌

当访问令牌过期时，可以使用以下方法刷新：

```csharp
var newAccount = await authenticator.RefreshAsync(oldAccount);
```

## 验证结果

验证成功后会返回 `MicrosoftAccount` 实例，包含以下属性：

- `Name` - 玩家名称
- `Uuid` - 玩家的 UUID
- `AccessToken` - 访问令牌
- `RefreshToken` - 刷新令牌
- `ExpiresTime` - 令牌过期时间

:::note
刷新令牌操作会返回一个新的 `MicrosoftAccount` 实例，其中包含更新后的令牌和过期时间
:::

:::warning
需要确保你的应用程序已在 Azure 门户注册并获取了相应的 Client ID
:::
