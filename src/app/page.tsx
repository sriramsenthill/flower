"use client";

import TokenInformation from "@/components/TokenInfo/TokenInformation";
import { useTokenOperations } from "@/hooks/useTokenOperations";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";

export default function Home() {
  const { isConnected, address } = useAccount();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { getOwner } = useTokenOperations();

  const checkTokenOwner = async () => {
    try {
      const result = await getOwner();
      setIsOwner(address === result);
    } catch (error) {
      console.error("Error fetching owner:", error);
      toaster.create({
        title: "Error",
        description: "Failed to fetch owner details. Please try again.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (isConnected) checkTokenOwner();
  }, [isConnected]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      {isConnected ? (
        <div className="w-full max-w-4xl p-6 bg-white/50 rounded-2xl flex flex-col items-center">
          <h2 className="text-lg font-bold text-custom-gray mb-6">🔍 Token Information</h2>
          <div className="w-full">
            <TokenInformation />
          </div>
        </div>
      ) : (
        <p className="text-custom-gray text-lg font-medium">Please connect your wallet to view details.</p>
      )}
    </div>
  );
}
