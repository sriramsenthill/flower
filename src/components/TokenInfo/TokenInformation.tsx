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
        <div className="flex flex-col w-full py-6 gap-y-4 bg-custom-green rounded-2xl">
            <span className="px-4 text-xs font-bold text-white">Token Information</span>

            {loading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                    <p className="text-base text-white">Loading...</p>
                </div>
            ) : tokenDetails ? (
                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                    <div className="flex items-center justify-between px-4 gap-y-2">
                        <div className="text-base text-white">Name</div>
                        <div className="flex items-center gap-x-1 w-fit">
                            <span className="text-base text-white">{tokenDetails.name}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 gap-y-2">
                        <div className="text-base text-white">Symbol</div>
                        <div className="flex items-center gap-x-1 w-fit">
                            <span className="text-base text-white">{tokenDetails.symbol}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 gap-y-2">
                        <div className="text-base text-white">Decimals</div>
                        <div className="flex items-center gap-x-1 w-fit">
                            <span className="text-base text-white">{tokenDetails.decimals}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 gap-y-2">
                        <div className="text-base text-white">Balance</div>
                        <div className="flex items-center gap-x-1 w-fit">
                            <span className="text-base text-white">{tokenDetails.balance}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 gap-y-2">
                        <div className="text-base text-white">Total Supply</div>
                        <div className="flex items-center gap-x-1 w-fit">
                            <span className="text-base text-white">{tokenDetails.totalSupply}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 gap-y-2">
                        <div className="text-base text-white">Minter</div>
                        <div className="flex items-center gap-x-1 w-fit">
                            <span className="text-base text-white">
                                {`${tokenDetails.minter.slice(0, 8)}...${tokenDetails.minter.slice(-7)}`}
                            </span>
                        </div>
                    </div>

                    <div className="absolute hidden h-full border-r sm:block border-white/30 left-1/2"></div>
                </div>
            ) : (
                <div className="px-4">
                    <p className="text-base text-white">
                        Failed to fetch token details. Please try again later.
                    </p>
                </div>
            )}
        </div>
    );
}