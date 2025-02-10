"use client";

import { useEffect, useState } from "react";
import ChangeOwnership from "./ChangeOwnership";
import { useAccount } from "wagmi";
import { useTokenOperations } from "@/hooks/useTokenOperations";
import { toaster } from "../ui/toaster";
import PauseTokenOperations from "./PauseTokenOperations";
import UnPauseTokenOperations from "./UnPauseTokenOperations";

export default function TokenAdminActions() {
    const { isConnected, address } = useAccount();
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const { getOwner } = useTokenOperations();

    const checkTokenOwner = async () => {
        try {
            const result = await getOwner();
            if (address === result) {
                setIsOwner(true);
                return;
            }
        } catch (error) {
            console.error("Error fetching allowance:", error);
            toaster.create({
                title: "Error",
                description: "Failed to fetch allowance. Please try again.",
                type: "error",
            });
        }
        setIsOwner(false);
    };

    useEffect(() => {
        checkTokenOwner();
    }, [isConnected]);

    return (
        <div className="flex flex-col gap-4 p-3 bg-white/50 rounded-2xl">
            {/* Heading */}
            {/* Admin Actions */}
            <div className="flex flex-col gap-4">
                <ChangeOwnership />

                <div className="flex flex-row gap-4 justify-between w-full">
                    <PauseTokenOperations />
                    <UnPauseTokenOperations />
                </div>
            </div>
        </div>
    );
}
