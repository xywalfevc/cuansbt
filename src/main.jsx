import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider, http, createConfig } from 'wagmi'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MintSBT from './MintSBT'
import '@rainbow-me/rainbowkit/styles.css'
import { defineChain } from 'viem/chains'

const monadTestnet = defineChain({
  id: 2710,
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'MonadScan', url: 'https://monadscan.dev' },
  },
  testnet: true,
})

const { connectors } = getDefaultWallets({
  appName: 'CUAN SBT Mint',
  projectId: 'cuan-app',
  chains: [monadTestnet],
})

const config = createConfig({
  chains: [monadTestnet],
  connectors,
  transports: {
    [monadTestnet.id]: http('https://testnet-rpc.monad.xyz'),
  },
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider chains={[monadTestnet]} showRecentTransactions={true}>
          <MintSBT />
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
