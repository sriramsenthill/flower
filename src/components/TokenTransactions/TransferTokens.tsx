"use client";
import { useEffect, useState } from "react";
import { Box, Input, Heading, Stack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import Button from "@/components/ui/button";
import { BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import { parseUnits } from "viem";

const TransferTokens = () => {
    const [toAddress, setToAddress] = useState<string>("");

    const [amount, setAmount] = useState<string>("");

    const { data: hash, isPending, writeContract, isError, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });


    const transferTokens = async () => {
        if (toAddress.trim() === "" || !amount) {
            toaster.create({
                title: "Warning",
                description: "Recipient address and amount are required.",
                type: "info",
                duration: 2000,
            });
            return;
        }
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "transfer",
                args: [toAddress, parseUnits(amount, DECIMALS)],
            });
        } catch (error) {
            console.log(error);
            toaster.create({
                title: "Error",
                description: "Failed to transfer tokens. Please try again.",
                type: "error",
                duration: 3000,
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
                Transfer Tokens
            </Heading>
            <Stack gap={4}>
                <Input
                    color="black"
                    placeholder="Enter recipient address"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    pl="4"
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px #319795" }}
                    _hover={{ borderColor: "teal.400" }}
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
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px #319795" }}
                    _hover={{ borderColor: "teal.400" }}
                />
                <Button
                    bg="teal.500"
                    colorScheme="teal"
                    textAlign="center"
                    onClick={transferTokens}
                    loading={isPending}
                    loadingText="Transferring..."
                    mt={4}
                    _hover={{ bg: "teal.400" }}
                    _active={{ bg: "teal.600" }}
                >
                    Transfer Tokens
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

export default TransferTokens;
