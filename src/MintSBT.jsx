// MintSBT.jsx
import React, { useState } from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
  useSwitchChain,
} from 'wagmi'
import { injected } from 'wagmi/connectors'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import ABI from './CuanSBT_ABI.json'

const CONTRACT_ADDRESS = '0x9cAB2e07574c5ee2E2945532A354FdB21114ad5F'
const TOKEN_URI = 'https://gateway.pinata.cloud/ipfs/bafkreihqahucweeoxz6533bemiveh6ysq3bjc6nc3dkdr4m7b3jeq5r4nm'
const MONAD_CHAIN_ID = 2710

export default function MintSBT() {
  const { address, isConnected, chain } = useAccount()
  const { connect } = useConnect({ connector: injected() })
  const { disconnect } = useDisconnect()
  const { writeContractAsync } = useWriteContract()
  const { switchChain } = useSwitchChain()
  const [txHash, setTxHash] = useState('')
  const [loading, setLoading] = useState(false)

  const handleMint = async () => {
    if (!address) {
      alert('Wallet not connected')
      return
    }

    try {
      setLoading(true)
      const tx = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'mint',
        args: [address, TOKEN_URI],
      })
      setTxHash(tx.hash)
    } catch (err) {
      console.error('Mint failed:', err)
      alert('Mint failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      padding: '2rem',
      minHeight: '100vh',
      background: '#f7f8fa',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        padding: '2rem',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
      }}>
        <h1 style={{ marginBottom: '1rem', color: '#222' }}>🎯 CUAN SBT Minter</h1>

        <div style={{ marginBottom: '1rem' }}>
          <ConnectButton />
        </div>

        {isConnected && (
          <>
            <p style={{ fontSize: '0.9rem' }}>Connected as:<br /><strong>{address}</strong></p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Network: {chain?.name || 'Unknown'}</p>

            {chain?.id !== MONAD_CHAIN_ID && (
              <button
                onClick={() => switchChain({ chainId: MONAD_CHAIN_ID })}
                style={{
                  background: '#facc15',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  cursor: 'pointer',
                }}>
                Switch to Monad Testnet
              </button>
            )}

            <button
              onClick={disconnect}
              style={{
                background: 'transparent',
                border: '1px solid #ccc',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
              Disconnect
            </button>

            <br />
            <button
              onClick={handleMint}
              disabled={loading}
              style={{
                background: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                fontWeight: 'bold'
              }}>
              {loading ? 'Minting...' : 'Mint SBT'}
            </button>

            {txHash && (
              <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                ✅ Minted! <br />
                <a href={`https://monadscan.dev/tx/${txHash}`} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>
                  View Transaction ↗
                </a>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
