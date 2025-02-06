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

    const getOwner = async () => {
        try {
            const result: string = await readContract(client, {
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "getOwner",
                args: [],
                blockTag: "latest",
            }) as string;

            return result;
        } catch (error) {
            console.error("Error fetching balance:", error);
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
                functionName: "getTotalSupply",
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
            const result: string = await readContract(client, {
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "getDecimals",
                args: [],
                blockTag: "latest",
            }) as string;

            return result;
        } catch (error) {
            throw error;
        }
    }

    const getStatus = async () => {
        try {
            const result: boolean = await readContract(client, {
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "status",
                args: [],
                blockTag: "latest",
            }) as boolean;

            return result;
        } catch (error) {
            throw error;
        }
    }
    return { getStatus, getTotalSupply, getTokenDecimals, getTokenSymbol, getTokenName, getOwner, checkBalance, checkAllowance };
};
