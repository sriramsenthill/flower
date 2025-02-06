"use client";

import { Box, Flex, Spacer } from "@chakra-ui/react";
import ConnectionDrawer from "./ConnectionDrawer";
import { useAccount } from "wagmi";
import WalletConnected from "./WalletConnected";
import Logo from "./Logo";
import { useEffect, useState } from "react";

export default function Navigation() {
    const { isConnected } = useAccount();

    return (
        <Box bg="white" color="black" px={6} py={4}>
            <Flex align="center">
                <Logo />
                <Spacer />
                <Flex gap={4}>
                    {isConnected ? <WalletConnected /> : <ConnectionDrawer />}
                </Flex>
            </Flex>
        </Box>
    );
}
