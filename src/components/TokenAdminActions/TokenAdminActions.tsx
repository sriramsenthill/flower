"use client";

import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import ChangeOwnership from "./ChangeOwnership";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
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
        console.log(isOwner);
    }

    useEffect(() => {
        checkTokenOwner();
    }, [isConnected]);


    return (
        <Box
            p={8}
            borderWidth={2}
            borderRadius="lg"
            boxShadow="sm"
            bg="gray.50"
            maxW="md"
            mx="auto"
            mt={8}
        >
            <Heading
                fontSize="xl"
                mb={4}
                color="black"
                fontWeight="semibold"
                textAlign="center"
            >
                Admin Operations
            </Heading>

            <Stack gap={4}>
                <ChangeOwnership />
                <Flex flexDirection="row" gap={4} justify="space-between" width="full">
                    <PauseTokenOperations />
                    <UnPauseTokenOperations />
                </Flex>
            </Stack>
        </Box>
    );

};