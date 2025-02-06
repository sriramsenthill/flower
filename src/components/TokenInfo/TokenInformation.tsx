"use client";

import { useTokenOperations } from "@/hooks/useTokenOperations";
import { Box, Text, Heading, Flex, Stack, Separator } from "@chakra-ui/react";
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
        owner: string;
        status: boolean;
    } | null>(null);

    const { address } = useAccount();

    const {
        getTokenName,
        getTokenSymbol,
        getTokenDecimals,
        checkBalance,
        getOwner,
        getTotalSupply,
        getStatus,
    } = useTokenOperations();


    const fetchTokenDetails = async () => {
        try {
            const name = await getTokenName();
            const symbol = await getTokenSymbol();
            const decimals = await getTokenDecimals();
            const balance = await checkBalance(address);
            const totalSupply = await getTotalSupply();
            const owner = await getOwner();
            const status = await getStatus();
            setTokenDetails({ name, symbol, decimals, balance, totalSupply, owner, status });
        } catch (error) {
            console.error("Error fetching token details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTokenDetails();
    }, []);

    return (
        <Box
            p={8}
            borderWidth={2}
            borderRadius="lg"
            boxShadow="sm"
            bg="gray.50"
            maxW="4xl"
            minW="md"
            mx="auto"
            mt={8}
        >
            <Heading fontSize="xl" mb={4} color="black" fontWeight="semibold" textAlign="center">
                Token Information
            </Heading>

            {
                loading ? <Flex align="center" justify="center" minHeight="200px">
                    <Text fontSize="md" fontWeight="semibold" color="teal.700">
                        Loading...
                    </Text>
                </Flex> :
                    tokenDetails ? <Stack gap={3} separator={<Separator borderColor="gray.300" />}>
                        <Flex justify="space-between">
                            <Text fontSize="md" fontWeight="semibold" color="gray.700">
                                Name:
                            </Text>
                            <Text color="gray.600">{tokenDetails.name}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text fontSize="md" fontWeight="semibold" color="gray.700">
                                Symbol:
                            </Text>
                            <Text color="gray.600">{tokenDetails.symbol}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text fontSize="md" fontWeight="semibold" color="gray.700">
                                Decimals:
                            </Text>
                            <Text color="gray.600">{tokenDetails.decimals}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text fontSize="md" fontWeight="semibold" color="gray.700">
                                Your Balance:
                            </Text>
                            <Text color="gray.600">{tokenDetails.balance}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text fontSize="md" fontWeight="semibold" color="gray.700">
                                Total Supply:
                            </Text>
                            <Text color="gray.600">{tokenDetails.totalSupply}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text fontSize="md" fontWeight="semibold" color="gray.700">
                                Owner:
                            </Text>
                            <Text letterSpacing="wider" color="gray.600">{tokenDetails.owner.slice(0, 8)}.....{tokenDetails.owner.slice(-7)}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text fontSize="md" fontWeight="semibold" color="gray.700">
                                Status:
                            </Text>
                            <Text color={tokenDetails.status ? "green.600" : "red.600"}>
                                {tokenDetails.status ? "Active" : "Inactive"}
                            </Text>
                        </Flex>
                    </Stack> : <Box textAlign="center" p={6}>
                        <Text fontSize="md" color="red.500">
                            Failed to fetch token details. Please try again later.
                        </Text>
                    </Box>
            }
        </Box>
    );
}
