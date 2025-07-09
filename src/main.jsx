import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import MintSBT from "./mint-sbt.jsx";

const monadTestnet = {
  id: 2710,
  name: "Monad Testnet",
  network: "monad-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MON",
    symbol: "MON",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.monad.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "MonadScan", url: "https://monadscan.dev" },
  },
  testnet: true,
};

const { chains, publicClient } = configureChains([monadTestnet], [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: "CUAN SBT Mint",
  projectId: "cuan-mint",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <MintSBT />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);