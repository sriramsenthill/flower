"use client";

import ApproveAllowance from "@/components/TokenTransactions/ApproveAllowance";
import BurnTokens from "@/components/TokenAdminActions/BurnTokens";
import CheckAllowance from "@/components/TokenInfo/CheckAllowance";
import MintTokens from "@/components/TokenAdminActions/MintTokens";
import TransferFromTokens from "@/components/TokenTransactions/TransferFromTokens";
import TransferTokens from "@/components/TokenTransactions/TransferTokens";
import TokenAdminActions from "@/components/TokenAdminActions/TokenAdminActions";
import CheckBalance from "@/components/TokenInfo/CheckBalance";
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
    <div className="min-h-screen p-6 bg-transparent">
      {isConnected ? (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 🔹 Token Information Section */}
          <div className="flex flex-col gap-6 p-3 bg-white/50 rounded-2xl">
            <h2 className="text-lg font-bold text-custom-gray">🔍 Token Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TokenInformation />
              <CheckBalance />
              <CheckAllowance />
            </div>
          </div>

          {/* 🔹 Token Transactions Section */}
          <div className="flex flex-col gap-6 p-3 bg-white/50 rounded-2xl">
            <h2 className="text-lg font-bold text-custom-gray">💳 Token Transactions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TransferTokens />
              <TransferFromTokens />
              <ApproveAllowance />
            </div>
          </div>

          {/* 🔹 Admin Actions (Only for Owner) */}
          {isOwner && (
            <div className="flex flex-col gap-6 p-3 bg-white/50 rounded-2xl">
              <h2 className="text-lg font-bold text-custom-gray">⚙️ Admin Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MintTokens />
                <BurnTokens />
                <TokenAdminActions />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-custom-gray text-lg font-medium">Please connect your wallet to view details.</p>
        </div>
      )}
    </div>
  );
}
