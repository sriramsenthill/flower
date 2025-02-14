import React, { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import Link from "next/link";
import {
    ClipboardRoot,
    ClipboardIconButton,
    ClipboardInput,
} from "@/components/ui/clipboard";
import Button from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "../ui/toaster";

const Navbar = () => {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    // Track wallet connection status
    useEffect(() => {
        if (isConnected && address) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "wallet_connected",
                wallet_address: address,
            });
        }
    }, [isConnected, address]);

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 9)}...${address.slice(-7)}`;
    };

    const handleDisconnect = () => {
        // Send GTM event before disconnecting
        if (address) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "wallet_disconnected",
                wallet_address: address,
            });
            console.log("Disconnected wallet address:", address);
        }

        disconnect();
        toaster.create({
            title: "Disconnected Successfully.",
            type: "info",
        });
    };

    return (
        <header className="w-full p-4 flex items-center gap-6 justify-between">
            {/* 🔹 Navigation Links */}
            <nav className="flex text-custom-gray gap-6 ml-auto">
                <Link
                    href="/balance"
                    className="text-sm font-extrabold hover:opacity-80"
                >
                    Check Balance
                </Link>
                <Link
                    href="/transfer"
                    className="text-sm font-extrabold hover:opacity-80"
                >
                    Transfer
                </Link>
                <Link
                    href="/admin"
                    className="text-sm font-extrabold hover:opacity-80"
                >
                    Admin Actions
                </Link>
            </nav>

            {/* 🔹 Wallet Info & Disconnect */}
            <div className="flex items-center gap-4">
                {address && (
                    <ClipboardRoot value={address || ""}>
                        <InputGroup className="w-fit">
                            <div className="bg-white bg-opacity-50 flex h-9 items-center justify-center rounded-full px-3">
                                <ClipboardInput
                                    value={shortenAddress(address)}
                                    readOnly
                                    className="bg-transparent text-custom-gray text-sm font-semibold focus:outline-none w-auto"
                                />
                                <ClipboardIconButton className="p-0 text-custom-gray hover:opacity-80" />
                            </div>
                        </InputGroup>
                    </ClipboardRoot>
                )}

                <Button
                    onClick={handleDisconnect}
                    className="rounded-full px-4 h-9 hover:bg-red-400"
                >
                    Disconnect
                </Button>
            </div>
        </header>
    );
};

export default Navbar;