import { formatUnits } from "viem";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import client from "@/lib/viemClient";
import { readContract } from "viem/actions";

export const useTokenOperations = () => {
    const checkBalance = async (address: string | undefined) => {
        if (!address) return "";

        try {
            const result: bigint = await readContract(client, {
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'balanceOf',
                args: [address],
                blockTag: "latest",
            }) as bigint;

            return formatUnits(result, DECIMALS);
        } catch (error) {
            throw error;
        }
    };

    const checkAllowance = async (owner: string, spender: string) => {
        try {
            const result: bigint = await readContract(client, {
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'allowance',
                args: [owner, spender],
                blockTag: "latest",
            }) as bigint;

            return formatUnits(result, DECIMALS);
        } catch (error) {
            throw error;
        }
    };

    const getMinter = async () => {
        try {
            const result: string = await readContract(client, {
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "minter",
                args: [],
                blockTag: "latest",
            }) as string;

            return result;
        } catch (error) {
            console.error("Error fetching minter:", error);
            return "null";
        }
    }

    const getTokenName = async () => {
        try {
            const result: string = await readContract(client, {
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "name",
                args: [],
                blockTag: "latest",
            }) as string;

            return result;
        } catch (error) {
            throw error;
        }
    }

    const getTotalSupply = async () => {
        try {
            const result: bigint = await readContract(client, {
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "totalSupply",
                args: [],
                blockTag: "latest",
            }) as bigint;

            return formatUnits(result, DECIMALS);
        } catch (error) {
            throw error;
        }
    }

    const getTokenSymbol = async () => {
        try {
            const result: string = await readContract(client, {
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "symbol",
                args: [],
                blockTag: "latest",
            }) as string;

            return result;
        } catch (error) {
            throw error;
        }
    }

    const getTokenDecimals = async () => {
        try {
            const result: number = await readContract(client, {
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "decimals",
                args: [],
                blockTag: "latest",
            }) as number;

            return result.toString();
        } catch (error) {
            throw error;
        }
    }

    return {
        getTotalSupply,
        getTokenDecimals,
        getTokenSymbol,
        getTokenName,
        getMinter,
        checkBalance,
        checkAllowance
    };
};