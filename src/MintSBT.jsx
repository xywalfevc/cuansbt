import React from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { parseAbi } from 'viem'

const contractAddress = '0x9cAB2e07574c5ee2E2945532A354FdB21114ad5F'
const tokenUri = 'https://gateway.pinata.cloud/ipfs/bafkreihqahucweeoxz6533bemiveh6ysq3bjc6nc3dkdr4m7b3jeq5r4nm'

const abi = parseAbi([
  'function mint(address to, string uri)'
])

export default function MintSBT() {
  const { address } = useAccount()
  const { writeContract, isPending } = useWriteContract()

  const handleMint = async () => {
    writeContract({
      address: contractAddress,
      abi,
      functionName: 'mint',
      args: [address, tokenUri],
    })
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>CUAN SBT Mint</h1>
      <button onClick={handleMint} disabled={isPending}>
        {isPending ? 'Minting...' : 'Mint SBT'}
      </button>
    </div>
  )
}