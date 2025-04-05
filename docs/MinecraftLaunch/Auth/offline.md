---
sidebar_position: 2
---

# 离线验证

该验证类型实现了最基础的验证功能，通常用于本地调试和验证

:::warning
在生产环节使用该验证模型在部分国家和地区可能会违反版权法或是最终用户协议，详见 [Mojang 最终用户协议（英文）](https://www.minecraft.net/en-us/eula)
:::

## 初始化验证器

```csharp
using MinecraftLaunch.Components.Authenticator;
var account = new OfflineAuthenticator().Authenticate("PLAYER_NAME"); // `PLAYER_NAME` 换成所需要的玩家名称
```

## 验证结果

离线验证会返回一个 `OfflineAccount` 实例，包含以下属性：

- `Name` - 玩家名称
- `Uuid` - 玩家的 UUID（如果未指定则自动生成）
- `AccessToken` - 访问令牌（自动生成的 GUID）

## 高级用法

你也可以在创建离线账户时指定自定义的 UUID：

```csharp
var customUuid = Guid.Parse("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
var account = new OfflineAuthenticator().Authenticate("PLAYER_NAME", customUuid);
```

:::note
如果不指定 UUID，验证器会自动生成一个新的 UUID
:::
