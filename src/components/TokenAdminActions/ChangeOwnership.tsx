import { useEffect, useState } from "react";
import { toaster } from "../ui/toaster";
import { Flex, Input } from "@chakra-ui/react";
import Button from "../ui/button";
import { BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, TOKEN_ABI } from "@/constants";

export default function ChangeOwnership() {

    const [newOwner, setNewOwner] = useState<string>("");

    const { data: hash, isPending, writeContract, isError, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });


    const changeOwnerShip = async () => {
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'transferOwnership',
                args: [newOwner],
            });
        } catch (error) {
            console.error(error);
            toaster.create({
                title: 'Error',
                description: 'Failed to tranfer ownership.',
                type: 'error',
                duration: 2000,
            });
        }
    };

    return (
        <Flex direction="column" gap={4}>

            <Input
                placeholder="Change ownership"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                className="w-full outline-none bg-white rounded-xl border-none bg-transparent text-custom-gray placeholder:text-custom-gray text-base sm:text-xl font-bold px-4"
            />
            <Button
                onClick={changeOwnerShip}
                loading={isPending}
                loadingText="Transferring.."
            >
                Transfer Ownership
            </Button>

            {isConfirming && (
                <div className=" text-black w-full text-center text-sm">
                    Waiting...
                </div>
            )}
            {isConfirmed && (
                <div className="text-sm w-full text-center text-green-600">
                    Success
                </div>
            )}
            {isError && (
                <div className="text-sm w-full text-center text-red-600">
                    Error
                </div>
            )}
        </Flex>
    );


}