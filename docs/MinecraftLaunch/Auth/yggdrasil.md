---
sidebar_position: 4
---

# Yggdrasil 第三方验证

Yggdrasil 验证实现了与 Mojang 验证服务器相同的验证协议，可用于连接第三方验证服务器（如 LittleSkin、AuthLib-Injector 等）。

## 初始化验证器

```csharp
using MinecraftLaunch.Components.Authenticator;

var authenticator = new YggdrasilAuthenticator(
    "YGGDRASIL_SERVER", // 验证服务器地址
    "YOUR_EMAIL", // 邮箱
    "YOUR_PASSWORD" // 密码
);
```

## 账户验证

由于一个邮箱可能绑定了多个角色，验证方法会返回一个异步枚举器：

```csharp
await foreach (var account in authenticator.AuthenticateAsync())
{
    Console.WriteLine($"角色名: {account.Name}");
}

// 如果只需要第一个角色，可以使用
var firstAccount = await authenticator.AuthenticateAsync().FirstAsync();
```

## 刷新令牌

当访问令牌过期时，可以使用以下方法刷新：

```csharp
var newAccount = await authenticator.RefreshAsync(oldAccount);
```

## 验证结果

验证成功后会返回 `YggdrasilAccount` 实例，包含以下属性：

- `Name` - 角色名称
- `Uuid` - 角色的 UUID
- `AccessToken` - 访问令牌
- `ClientToken` - 客户端令牌
- `ServerId` - 验证服务器地址

:::note
刷新令牌操作会返回一个新的 `YggdrasilAccount` 实例，其中包含更新后的访问令牌
:::
