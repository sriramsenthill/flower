"use client";

import { Flex } from "@chakra-ui/react";
import ConnectionDrawer from "./ConnectionDrawer";
import { useAccount } from "wagmi";
import WalletConnected from "./WalletConnected";
import Logo from "./Logo";

export default function Navigation() {
    const { isConnected } = useAccount();

    return (
        <nav className="w-full px-6 py-4 bg-transparent">
            <Flex align="center" justify="space-between">
                {/* 🔹 Logo on the LEFT */}
                <Logo />

                {/* 🔹 Wallet Connection Button on the RIGHT */}
                {isConnected ? <WalletConnected /> : <ConnectionDrawer />}
            </Flex>
        </nav>
    );
}
