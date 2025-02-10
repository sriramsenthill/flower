"use client";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import { parseUnits } from "viem";
import Button from "@/components/ui/button";

const ApproveAllowance = () => {
    const [spender, setSpender] = useState("");
    const [amount, setAmount] = useState("");

    const { data: hash, isPending, writeContract, isError, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    const approve = async () => {
        if (spender.trim() === "" || !amount) {
            toaster.create({
                title: "Warning",
                description: "Both spender address and amount are required.",
                type: "info",
                duration: 2000,
            });
            return;
        }

        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "approve",
                args: [spender, parseUnits(amount, DECIMALS)],
            });
        } catch (error) {
            console.error("Error approving allowance:", error);
            toaster.create({
                title: "Error",
                description: "Failed to approve allowance. Please try again.",
                type: "error",
                duration: 2000,
            });
        }
    };

    return (
        <div className="flex flex-col gap-4 p-3 bg-white/50 rounded-2xl">
            <div className="relative flex flex-col gap-4">
                {/* Spender Address */}
                <div className="flex flex-col gap-2 rounded-2xl bg-white p-4">
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <span className="font-satoshi text-custom-gray text-xs font-bold">Spender</span>
                        </div>
                    </div>
                    <div className="flex h-6 justify-between">
                        <input
                            className="w-full outline-none border-none bg-transparent placeholder:text-custom-gray text-base sm:text-xl font-bold"
                            placeholder="Enter spender address"
                            type="text"
                            value={spender}
                            onChange={(e) => setSpender(e.target.value)}
                        />
                    </div>
                </div>

                {/* Amount */}
                <div className="flex flex-col gap-2 rounded-2xl bg-white p-4">
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <span className="font-satoshi text-custom-gray text-xs font-bold">Amount</span>
                        </div>
                    </div>
                    <div className="flex h-6 justify-between">
                        <input
                            className="w-full outline-none border-none bg-transparent placeholder:text-custom-gray text-base sm:text-xl font-bold"
                            placeholder="Enter amount"
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Approve Button */}
            <Button
                onClick={approve}
                className="text-white bg-primary text-xs sm:text-xs md:text-sm lg:text-base h-9 sm:h-9 md:h-10 lg:h-12 px-6 min-w-32 font-satoshi font-bold transition-colors duration-500 focus:outline-none rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-2xl flex items-center justify-center hover:opacity-90"
                disabled={isPending}
            >
                {isPending ? "Approving..." : "Approve Allowance"}
            </Button>

            {/* Transaction Details */}
            {hash && (
                <div className="text-black w-full text-xs">Transaction Hash: {hash.slice(0, 7)}...{hash.slice(-7)}</div>
            )}
            {isConfirming && (
                <div className=" text-black w-full text-center text-sm">
                    Waiting for confirmation...
                </div>
            )}
            {isConfirmed && (
                <div className="text-sm w-full text-center text-green-600">
                    Transaction confirmed.
                </div>
            )}
            {isError && (
                <div className="text-sm w-full text-center text-red-600">
                    Error: {(error as BaseError).shortMessage || error.message}
                </div>
            )}
        </div>
    );
};

export default ApproveAllowance;
