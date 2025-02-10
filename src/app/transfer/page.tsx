"use client";

import ApproveAllowance from "@/components/TokenTransactions/ApproveAllowance";
import TransferFromTokens from "@/components/TokenTransactions/TransferFromTokens";
import TransferTokens from "@/components/TokenTransactions/TransferTokens";
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
                    <h2 className="text-lg font-bold text-custom-gray mb-4">💳 Token Transactions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div className="p-4 flex flex-col justify-between h-full min-h-[200px]">
                            <h3 className="text-lg font-semibold text-custom-gray mb-3">🔄 Transfer Tokens</h3>
                            <TransferTokens />
                        </div>
                        <div className="p-4 flex flex-col justify-between h-full min-h-[200px]">
                            <h3 className="text-lg font-semibold text-custom-gray mb-3">✅ Approve Allowance</h3>
                            <ApproveAllowance />
                        </div>
                        <div className="p-4 flex flex-col justify-between h-full min-h-[200px]">
                            <h3 className="text-lg font-semibold text-custom-gray mb-3">🔁 Transfer From Tokens</h3>
                            <TransferFromTokens />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-[50vh]">
                    <p className="text-custom-gray text-lg font-medium">
                        Please connect your wallet to view details.
                    </p>
                </div>
            )}
        </div>
    );
}
