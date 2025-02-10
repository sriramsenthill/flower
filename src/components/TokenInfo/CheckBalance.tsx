import { useState } from "react";
import { useTokenOperations } from "@/hooks/useTokenOperations";
import { toaster } from "../ui/toaster";
import Button from "../ui/button";
const CheckBalance = () => {
    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState("0");
    const [loading, setLoading] = useState(false);
    const { checkBalance } = useTokenOperations();

    const getCurrentBalance = async () => {
        if (account.trim() === "") {
            toaster.create({
                title: "Warning",
                description: "Wallet address is required.",
                type: "info",
                duration: 3000,
            });
            return;
        }
        setLoading(true);
        try {
            const result = await checkBalance(account);
            setBalance(result.toString());
            toaster.create({
                title: "Success",
                description: "Checked Balance successfully.",
                type: "success",
            });
        } catch (error) {
            toaster.create({
                title: "Error",
                description: "Cannot check balance",
                type: "error",
                duration: 3000,
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-3 bg-white/50 rounded-2xl">
            <div className="relative flex flex-col gap-4">
                {/* Address Input Field */}
                <div className="flex flex-col gap-2 rounded-2xl bg-white p-4">
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <span className="font-satoshi text-custom-gray text-xs font-bold">Address</span>
                        </div>
                    </div>
                    <div className="flex h-6 justify-between">
                        <input
                            className="w-full outline-none border-none bg-transparent text-custom-gray placeholder:text-custom-gray text-base sm:text-xl font-bold"
                            placeholder="Enter wallet address"
                            type="text"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Balance Display */}
            {balance && (
                <div className="flex cursor-pointer flex-col gap-3 text-custom-gray rounded-2xl bg-white/50 px-4 pb-3 pt-4 transition-[background-color] hover:bg-white">
                    <span className="font-satoshi text-dark-grey text-xs font-bold">Details</span>
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="font-satoshi text-dark-grey text-xs font-medium">Balance</span>
                            <div className="flex gap-5 py-1">
                                <span className="font-satoshi text-dark-grey text-sm font-medium">{balance} FLR</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Check Balance Button */}
            <Button
                onClick={getCurrentBalance}
                className="text-white bg-primary text-xs sm:text-xs md:text-sm lg:text-base h-9 sm:h-9 md:h-10 lg:h-12 px-6 min-w-32 font-satoshi font-bold transition-colors duration-500 focus:outline-none rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-2xl flex items-center justify-center hover:opacity-90"
                disabled={loading}
            >
                {loading ? "Checking..." : "Check Balance"}
            </Button>

        </div>
    );
};

export default CheckBalance;
