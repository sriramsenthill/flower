import { toaster } from "../ui/toaster";
import Button from "../ui/button";
import { BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, TOKEN_ABI } from "@/constants";
import { useEffect } from "react";
import { Stack } from "@chakra-ui/react";

export default function PauseTokenOperations() {

    const { data: hash, isPending, writeContract, isError, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const handlePause = async () => {
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'pause',
                args: [],
            });



        } catch (error) {
            console.log(error);
            toaster.create({
                title: 'Error',
                description: 'Failed to pause the token.',
                type: 'error',
                duration: 3000,
            });
        }
    };

    return (
        <Stack gap={1}>
            <Button
                onClick={handlePause}
                loading={isPending}
                loadingText="Pausing..."
            >
                Pause
            </Button>
            {isConfirming && (
                <div className=" text-black w-full text-center text-sm">
                    Waiting...
                </div>
            )}
            {isConfirmed && (
                <div className="text-sm w-full text-center text-green-600">
                    Paused
                </div>
            )}
            {isError && (
                <div className="text-sm w-full text-center text-red-600">
                    Error
                </div>
            )}
        </Stack>
    );
}