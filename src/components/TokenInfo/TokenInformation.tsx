"use client";

import { useTokenOperations } from "@/hooks/useTokenOperations";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

export default function TokenInformation() {
    const [loading, setLoading] = useState(true);
    const [tokenDetails, setTokenDetails] = useState<{
        name: string;
        symbol: string;
        decimals: string;
        balance: string;
        totalSupply: string;
        minter: string;
    } | null>(null);

    const { address } = useAccount();

    const {
        getTokenName,
        getTokenSymbol,
        getTokenDecimals,
        checkBalance,
        getMinter,
        getTotalSupply,
    } = useTokenOperations();

    const fetchTokenDetails = async () => {
        try {
            const [name, symbol, decimals, balance, totalSupply, minter] =
                await Promise.all([
                    getTokenName(),
                    getTokenSymbol(),
                    getTokenDecimals(),
                    checkBalance(address),
                    getTotalSupply(),
                    getMinter()
                ]);

            setTokenDetails({
                name,
                symbol,
                decimals,
                balance,
                totalSupply,
                minter
            });
        } catch (error) {
            console.error("Error fetching token details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTokenDetails();
    }, [address]);

    return (
        <div className="p-6 max-w-4xl min-w-md mx-auto mt-8 bg-gray-50">
            <h2 className="text-xl font-semibold text-center mb-4">
                Token Information
            </h2>

            {loading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                    <p className="text-sm font-semibold text-teal-700">
                        Loading...
                    </p>
                </div>
            ) : tokenDetails ? (
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-700">Name:</p>
                        <p className="text-gray-600">{tokenDetails.name}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-700">Symbol:</p>
                        <p className="text-gray-600">{tokenDetails.symbol}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-700">Decimals:</p>
                        <p className="text-gray-600">{tokenDetails.decimals}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-700">Your Balance:</p>
                        <p className="text-gray-600">{tokenDetails.balance}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-700">Total Supply:</p>
                        <p className="text-gray-600">{tokenDetails.totalSupply}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-700">Minter:</p>
                        <p className="text-gray-600 tracking-wider">
                            {`${tokenDetails.minter.slice(0, 8)}...${tokenDetails.minter.slice(-7)}`}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="text-center p-6">
                    <p className="text-sm text-red-500">
                        Failed to fetch token details. Please try again later.
                    </p>
                </div>
            )}
        </div>
    );
}