"use client";

import { useState } from "react";
import { useTokenOperations } from "@/hooks/useTokenOperations";
import { toaster } from "../ui/toaster";
import Button from "../ui/button";

export default function CheckAllowance() {
    const [loading, setLoading] = useState<boolean>(false);
    const [owner, setOwner] = useState<string>("");
    const [spender, setSpender] = useState<string>("");
    const [amount, setAmount] = useState<string>("0");

    const { checkAllowance } = useTokenOperations();

    const handleAllowanceCheck = async () => {
        if (owner.trim() === "" || spender.trim() === "") {
            toaster.create({
                title: "Warning",
                description: "Both owner and spender wallet address is required.",
            });
            return;
        }

        setLoading(true);

        try {
            const result = await checkAllowance(owner, spender);
            setAmount(result.toString());
            toaster.create({
                title: "Success",
                description: "Checked allowance successfully.",
            });
        } catch (error) {
            console.error("Error fetching allowance:", error);
            toaster.create({
                title: "Error",
                description: "Failed to fetch allowance. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-3 bg-white/50 rounded-2xl ">
            <div className="relative flex flex-col gap-4">
                {/* From Address Section */}
                <div className="flex flex-col gap-2 rounded-2xl bg-white p-4">
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <span className="font-satoshi text-custom-gray text-xs font-bold">From</span>
                        </div>
                    </div>
                    <div className="flex h-6 justify-between">
                        <input
                            className="w-full outline-none border-none bg-transparent text-custom-gray placeholder:text-custom-gray text-base sm:text-xl font-bold"
                            type="text"
                            placeholder="Enter from address"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                        />
                    </div>
                </div>


                {/* To Address Section */}
                <div className="flex flex-col gap-2 rounded-2xl bg-white p-4">
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <span className="font-satoshi text-custom-gray text-xs font-bold">To</span>
                        </div>
                    </div>
                    <div className="flex h-6 justify-between">
                        <input
                            className="w-full outline-none border-none bg-transparent text-custom-gray placeholder:text-custom-gray text-base sm:text-xl font-bold"
                            type="text"
                            placeholder="Enter to address"
                            value={spender}
                            onChange={(e) => setSpender(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="flex cursor-pointer flex-col gap-3 text-custom-gray rounded-2xl bg-white/50 px-4 pb-3 pt-4 transition-[background-color] hover:bg-white">
                <span className="font-satoshi text-dark-grey text-xs font-bold">Details</span>
                <div>
                    <div className="flex items-center justify-between">
                        <span className="font-satoshi text-dark-grey text-xs font-medium">Allowance</span>
                        <div className="flex gap-5 py-1">
                            <span className="font-satoshi text-dark-grey text-sm font-medium">
                                {amount} FLR
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Check Allowance Button */}
            <Button
                onClick={handleAllowanceCheck}
                disabled={loading}
                className={`transition-colors duration-500 font-bold min-w-32 px-6 focus:outline-none border-none h-12 rounded-2xl text-base
                    ${loading
                        ? 'bg-button-disabled-bg text-button-disabled-text cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
            >
                <div className="flex justify-center items-center gap-3">
                    {loading ? 'Checking...' : 'Check Allowance'}
                </div>
            </Button>
        </div>
    );
}