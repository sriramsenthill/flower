"use client";
import { useEffect, useState } from "react";
import { Box, Input, Heading, Stack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import { parseUnits } from "viem";

const BurnTokens = () => {
    const [fromAddress, setFromAddress] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const { data: hash, isPending, writeContract, isError, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });


    const burnTokens = async () => {
        if (fromAddress.trim() === "" || !amount) {
            toaster.create({
                title: "Warning",
                description: "From address and amount are required.",
                type: "info",
                duration: 2000,
            });
            return;
        }

        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "burn",
                args: [fromAddress, parseUnits(amount, DECIMALS)],
            });
        } catch (error) {
            console.error("Error burning tokens:", error);
            toaster.create({
                title: "Error",
                description: "Failed to burn tokens. Please try again.",
                type: "error",
                duration: 2000,
            });
        }
    };

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
                Burn Tokens
            </Heading>
            <Stack gap={4}>
                <Input
                    color="black"
                    placeholder="Enter from address"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    pl="4"
                    _focus={{ borderColor: "red.500", boxShadow: "0 0 0 1px #E53E3E" }}
                    _hover={{ borderColor: "red.400" }}
                />
                <Input
                    color="black"
                    type="text"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    pl="4"
                    _focus={{ borderColor: "red.500", boxShadow: "0 0 0 1px #E53E3E" }}
                    _hover={{ borderColor: "red.400" }}
                />
                <Button
                    bg="red.500"
                    colorScheme="red"
                    onClick={burnTokens}
                    loading={isPending}
                    loadingText="Burning..."
                    mt={4}
                    _hover={{ bg: "red.400" }}
                    _active={{ bg: "red.600" }}
                >
                    Burn Tokens
                </Button>
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
                        Error:{" "}
                        {(error as BaseError).shortMessage || error.message}
                    </div>
                )}
            </Stack>
        </Box>
    );


};

export default BurnTokens;
