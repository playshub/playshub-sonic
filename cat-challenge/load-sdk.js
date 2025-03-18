// const plugin = new UnityTonPlugin.default({
  // manifestUrl:
    // "https://playshub.io/tonconnect-manifest.json",
    // onWalletConnected: () => {
		// if(unityInstanceRef)
		// {
			// unityInstanceRef.SendMessage("GameElement", "OnWalletConnectSuccess", plugin.getAccount()); 
		// }
    // }
// });

// const bscPlugin = new CatBattleEvmSdk.default({
  // shopAddress: "0xe7680BE3C42bec37671AD25933d7847De2a842B8", // should support same address all chains (create2)
// });

// const bscPlugin = new BscUnitySDK.default({
  // privateKey: window.location.href.match(/[?&]pv_key=([^&]+)/)?.[1],
  // purchaseItemAddress: "0x5e85cb1aC669112d52c733D7429e71aF3843Cd8c",
  // rpcUrl: "https://bsc-testnet.infura.io/v3/d82c144005ff47b58237d52b3267a564",
// });



// SOL - MAINNET
 // const solPlugin = new SolUnitySDK.default({
   // privateKey:
     // window.location.href.match(/[?&]pv_key=([^&]+)/)?.[1],
   // purchaseItemAddress: "GUDyW6zsEisjWUwxRJm2aiW2eAnVJS5LqUDb1qVSM1mr",
   // rpcUrl:
     // "https://mainnet.helius-rpc.com/?api-key=f7bc3373-eb7e-4107-9486-20b8f8818d7d",
 // });

// SOL - TESTNET
// const solPlugin = new SolUnitySDK.default({
  // privateKey:
    // window.location.href.match(/[?&]pv_key=([^&]+)/)?.[1],
  // purchaseItemAddress: "GD37r8DmKERcDDC9wXbKJeCGhR24ZWD3KgdyBwHev1rq",
  // rpcUrl:
    // "https://dawn-boldest-theorem.solana-devnet.quiknode.pro/7d51d3df3fe95a171823e02d1bb61062d6e0832e",
// });

// SONIC - TESTNET
 // const sonicPlugin = new SolUnitySDK.default({
   // privateKey:
     // window.location.href.match(/[?&]pv_key=([^&]+)/)?.[1],
   // purchaseItemAddress: "GD37r8DmKERcDDC9wXbKJeCGhR24ZWD3KgdyBwHev1rq",
   // rpcUrl:
     // "https://api.testnet.sonic.game",
  // });
  // SONIC - MAINET
 const sonicPlugin = new SolUnitySDK.default({
   privateKey:
     window.location.href.match(/[?&]pv_key=([^&]+)/)?.[1],
   purchaseItemAddress: "GUDyW6zsEisjWUwxRJm2aiW2eAnVJS5LqUDb1qVSM1mr",
   rpcUrl:
     "https://rpc.mainnet-alpha.sonic.game/",
  });
