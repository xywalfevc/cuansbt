import React from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function MintSBT() {
  const { address, isConnected } = useAccount()

  const mint = async () => {
    const tx = {
      to: '0x9cAB2e07574c5ee2E2945532A354FdB21114ad5F',
      data: '0xa0712d68' + address.slice(2).padStart(64, '0') + '0000000000000000000000000000000000000000000000000000000000000020' + Buffer.from("https://gateway.pinata.cloud/ipfs/bafkreihqahucweeoxz6533bemiveh6ysq3bjc6nc3dkdr4m7b3jeq5r4nm").toString('hex').padEnd(128, '0'),
    }
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx],
    })
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <ConnectButton />
      {isConnected && (
        <button onClick={mint} style={{ marginTop: '2rem', padding: '1rem 2rem' }}>
          Mint SBT
        </button>
      )}
    </div>
  )
}

export default MintSBT