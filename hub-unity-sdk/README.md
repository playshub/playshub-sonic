# SONIC Unity SDK

A lightweight SDK for seamless integration with the SONIC blockchain network in pure JavaScript, making it easy to embed within Unity games. This SDK enables game developers to implement blockchain features like token transfers, NFT ownership verification, and in-game purchases without deep blockchain knowledge.

## Features

- **Wallet Integration**: Connect and interact with SONIC blockchain wallets
- **Token Transactions**: Send and receive SONIC tokens within games
- **In-Game Purchases**: Process secure blockchain-based purchases for game items
- **Balance Checking**: Query token balances and transaction history
- **NFT Verification**: Verify ownership of NFTs for game access or special features
- **Memo Support**: Attach metadata to transactions for game-specific processing

## How It Works

### Payment Process Flow

1. **Initiation**: User initiates a purchase within the Unity game
2. **Transaction**: The SDK creates and sends a transaction with an attached memo containing userId and itemId
3. **Verification**: The blockchain service polls via RPC to confirm the purchase
4. **Notification**: Upon successful confirmation, the service notifies the game server
5. **Fulfillment**: Game server updates the player's inventory with purchased items

![Payment Process Flow](./figures/payment-flow.png)

## Technology Stack

- **@solana/web3.js**: JavaScript library for interacting with the SONIC blockchain
- **Webpack**: JavaScript bundler that compiles and packages modules for Unity WebGL
- **TypeScript**: Strongly typed programming language for better developer experience
- **Unity Integration**: Custom jslib plugins for Unity WebGL communication

## Installation

### Option 1: CDN Installation

Add the script to your Unity WebGL HTML template:

```html
<!-- Latest version (auto-updates) -->
<script src="https://unpkg.com/@playshub/sonic-unity-sdk@latest"></script>

<!-- OR specific version (recommended for production) -->
<script src="https://unpkg.com/@playshub/sonic-unity-sdk@1.0.0"></script>

<!-- Initialize the SDK -->
<script src="./load-sdk.js"></script>
```

Create a `load-sdk.js` file to initialize the SDK:

```js
const plugin = new SonicUnitySDK.default({
  rpcUrl: "https://api.sonic-chain.io",
  privateKey: "YOUR_PRIVATE_KEY", // Only for server-side usage
  purchaseItemAddress: "RECIPIENT_ADDRESS_FOR_PURCHASES",
});
```

### Option 2: NPM Installation

```shell
npm install @playshub/sonic-unity-sdk
```

Then import and use in your JavaScript:

```js
import SonicUnitySDK from "@playshub/sonic-unity-sdk";

const plugin = new SonicUnitySDK({
  rpcUrl: "https://api.sonic-chain.io",
  privateKey: "YOUR_PRIVATE_KEY", // Only for server-side usage
  purchaseItemAddress: "RECIPIENT_ADDRESS_FOR_PURCHASES",
});
```

## Unity Integration

### Creating the jslib Plugin

Create a jslib file in your Unity project's Plugins folder:

```jslib
mergeInto(LibraryManager.library, {
  GetPublicAddress: function () {
    var returnStr = plugin.getPublicAddress();
    var bufferSize = lengthBytesUTF8(returnStr) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(returnStr, buffer, bufferSize);
    return buffer;
  },
  PurchaseItem: async function (args) {
    var returnStr = await plugin.purchaseItem(UTF8ToString(args));
    var bufferSize = lengthBytesUTF8(returnStr) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(returnStr, buffer, bufferSize);
    return buffer;
  },
  GetBalance: function () {
    var returnStr = plugin.getBalance();
    var bufferSize = lengthBytesUTF8(returnStr) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(returnStr, buffer, bufferSize);
    return buffer;
  },
  VerifyNFTOwnership: async function (nftAddress) {
    var returnStr = await plugin.verifyNFTOwnership(UTF8ToString(nftAddress));
    var bufferSize = lengthBytesUTF8(returnStr) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(returnStr, buffer, bufferSize);
    return buffer;
  },
});
```

### C# Integration in Unity

```csharp
using System.Runtime.InteropServices;
using UnityEngine;
using System.Threading.Tasks;

public class SonicSDKBridge : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern string GetPublicAddress();

    [DllImport("__Internal")]
    private static extern string PurchaseItem(string args);

    [DllImport("__Internal")]
    private static extern string GetBalance();

    [DllImport("__Internal")]
    private static extern string VerifyNFTOwnership(string nftAddress);

    public string GetWalletAddress()
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
            return GetPublicAddress();
        #else
            return "Wallet not available in editor mode";
        #endif
    }

    public async Task<string> PurchaseGameItem(string itemId, string price)
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
            string args = JsonUtility.ToJson(new { itemId = itemId, price = price });
            return PurchaseItem(args);
        #else
            return "Purchase not available in editor mode";
        #endif
    }

    // Additional methods for other SDK functions
}
```

## API Reference

| Function                         | Description                               | Parameters                        | Return Value                    |
| -------------------------------- | ----------------------------------------- | --------------------------------- | ------------------------------- |
| `getPublicAddress()`             | Get the connected wallet address          | None                              | String: Wallet address          |
| `purchaseItem(args)`             | Send a transaction for purchasing an item | JSON string with itemId and price | String: Transaction ID          |
| `getBalance()`                   | Get the balance of connected wallet       | None                              | String: Balance in SONIC tokens |
| `verifyNFTOwnership(nftAddress)` | Check if user owns a specific NFT         | String: NFT address               | Boolean: Ownership status       |
| `signMessage(message)`           | Sign a message with the wallet            | String: Message to sign           | String: Signed message          |

## Examples

Complete working examples are available in the [Examples](./examples/) directory:

- Basic wallet integration
- In-game shop with SONIC payments
- NFT-gated game features

## Building from Source

1. Clone the repository:

   ```bash
   git clone https://github.com/playshub/playshub-sonic.git
   cd playshub-sonic/hub-unity-sdk
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the SDK:
   ```bash
   npm run build
   ```

The compiled SDK will be available in the `dist` directory.

## Troubleshooting

### Common Issues

- **Connection Issues**: Ensure the RPC URL is correct and accessible
- **Transaction Failures**: Check wallet balance and network status
- **Unity Integration**: Make sure the jslib plugin is in the correct location

## Contributing

We welcome contributions to improve the SONIC Unity SDK! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Authors and Acknowledgment

Playshub Team

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Project Status

We are actively developing this SDK following the roadmap available at: https://playshub.io/
