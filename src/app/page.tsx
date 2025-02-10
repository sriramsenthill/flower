"use client";

import ApproveAllowance from "@/components/TokenTransactions/ApproveAllowance";
import BurnTokens from "@/components/TokenAdminActions/BurnTokens";
import CheckAllowance from "@/components/TokenInfo/CheckAllowance";
import MintTokens from "@/components/TokenAdminActions/MintTokens";
import TransferFromTokens from "@/components/TokenTransactions/TransferFromTokens";
import TransferTokens from "@/components/TokenTransactions/TransferTokens";
import { useAccount } from "wagmi";
import { Box, Flex, Heading, Highlight, Stack, Text } from "@chakra-ui/react";
import TokenAdminActions from "@/components/TokenAdminActions/TokenAdminActions";
import CheckBalance from "@/components/TokenInfo/CheckBalance";
import TokenInformation from "@/components/TokenInfo/TokenInformation";
import { useTokenOperations } from "@/hooks/useTokenOperations";
import { useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";

export default function Home() {
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
  }

  useEffect(() => {
    checkTokenOwner();
  }, [isConnected]);

  return (
    <Box height="100%" minHeight="100dvh" p={6}>


      {isConnected && (
        <>
          {/* Token Info Section */}
          <Box mt={12} px={6} py={8} borderRadius="lg">
            <h1 className="w-full text-center text-3xl text-black h-fit font-bold mb-2">
              <Highlight query="Flower Token." styles={{ color: "teal.700" }}>
                Interact with Flower Token.
              </Highlight>
            </h1>
            <Text fontSize="sm" color="gray.500" mb={6} textAlign="center">
              Check your Flower token balances, allowances, and manage your holdings.
            </Text>
            <Flex
              wrap="wrap"
              justify="center"
              align="start"
              p={4}
              borderRadius="lg"
            >
              <TokenInformation />
              <CheckAllowance />
              <CheckBalance />
            </Flex>
          </Box>

          {/* Token Transactions Section */}
          <Box mt={12} px={6} py={8} borderRadius="lg">
            <Heading
              as="h1"
              textAlign="center"
              fontSize="3xl"
              fontWeight="bold"
              color="black"
              mb={2}
            >
              <Highlight query="Flower Token" styles={{ color: "teal.700" }}>
                Flower Token Transactions
              </Highlight>
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={6} textAlign="center">
              Transfer Flower tokens and manage allowances securely.
            </Text>
            <Flex
              wrap="wrap"
              justify="center"
              align="start"
              p={4}
              borderRadius="lg"
            >
              <TransferFromTokens />
              <TransferTokens />
              <ApproveAllowance />
            </Flex>
          </Box>

          {/* Admin Operations Section */}
          <Box mt={12} px={6} py={8} borderRadius="lg">
            <Heading
              as="h1"
              textAlign="center"
              fontSize="3xl"
              fontWeight="bold"
              color="black"
              mb={2}
            >
              <Highlight query="Flower Token" styles={{ color: "teal.700" }}>
                Flower Token Admin Operations
              </Highlight>
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={6} textAlign="center">
              Manage Flower token supply and perform administrative actions.
            </Text>
            <Flex
              wrap="wrap"
              justify="center"
              align="start"
              p={4}
              borderRadius="lg"
            >
              <TokenAdminActions />
              <MintTokens />
              <BurnTokens />
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );
}