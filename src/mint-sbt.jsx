import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseAbi } from "viem";

const contractAddress = "0x9cAB2e07574c5ee2E2945532A354FdB21114ad5F";
const tokenURI = "https://gateway.pinata.cloud/ipfs/bafkreihqahucweeoxz6533bemiveh6ysq3bjc6nc3dkdr4m7b3jeq5r4nm";

const abi = parseAbi([
  "function mint(address to, string uri) external"
]);

export default function MintSBT() {
  const { address } = useAccount();
  const [minted, setMinted] = useState(false);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: "mint",
    args: [address, tokenURI],
    enabled: Boolean(address),
  });

  const { write, isLoading, isSuccess } = useContractWrite({
    ...config,
    onSuccess: () => setMinted(true),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Mint CUAN SBT</h1>
      <ConnectButton />
      {address && !minted && (
        <button
          onClick={() => write?.()}
          disabled={isLoading || !write}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {isLoading ? "Minting..." : "Mint SBT"}
        </button>
      )}
      {isSuccess && <p className="mt-4 text-green-700">✅ Mint success!</p>}
      {minted && <p className="mt-4 text-blue-700">You already minted.</p>}
    </div>
  );
}