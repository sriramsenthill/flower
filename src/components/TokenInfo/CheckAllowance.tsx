import { useState } from "react";
import { Box, Input, Text, Heading, Stack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useTokenOperations } from "@/hooks/useTokenOperations";


const CheckAllowance = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [owner, setOwner] = useState<string>("");
    const [spender, setSpender] = useState<string>("");
    const [amount, setAmount] = useState<string>("0");

    const { checkAllowance } = useTokenOperations();

    const allowance = async () => {
        if (owner.trim() === "" || spender.trim() === "") {
            toaster.create({
                title: "Warning",
                description: "Both owner and spender wallet address is required.",
                type: "info",
            });
            return;
        }

        setLoading(true);

        try {
            const result = await checkAllowance(owner, spender);

            setAmount(result.toString());

            toaster.create({
                title: "Success",
                description: "Checked allowance successfully.",
                type: "success",
            });
        } catch (error) {
            console.error("Error fetching allowance:", error);
            toaster.create({
                title: "Error",
                description: "Failed to fetch allowance. Please try again.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            p={8}
            borderWidth={2}
            borderRadius="lg"
            boxShadow="sm"
            bg="gray.50"
            mx="auto"
            mt={8}
        >
            <Heading fontSize="xl" mb={4} color="black" fontWeight="semibold" textAlign="center">
                Check Allowance
            </Heading>
            <Stack gap={4}>
                <Box>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={1}>
                        From Address
                    </Text>
                    <Input
                        color="black"
                        pl="4"
                        placeholder="Enter from address"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        bg="gray.100"
                        borderColor="gray.300"
                        _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px #319795" }}
                        _hover={{ borderColor: "teal.400" }}
                    />
                </Box>
                <Box>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={1}>
                        To Address
                    </Text>
                    <Input
                        color="black"
                        pl="4"
                        placeholder="Enter to address"
                        value={spender}
                        onChange={(e) => setSpender(e.target.value)}
                        bg="gray.100"
                        borderColor="gray.300"
                        _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px #319795" }}
                        _hover={{ borderColor: "teal.400" }}
                    />
                </Box>
                <Button
                    bg="teal.500"
                    colorScheme="teal"
                    onClick={allowance}
                    loading={loading}
                    loadingText="Checking..."
                    _hover={{ bg: "teal.400" }}
                    _active={{ bg: "teal.600" }}
                >
                    Check Allowance
                </Button>
                <Text fontSize="sm" fontWeight="semibold" color="gray.700" textAlign="center">
                    Allowance: {amount} KET
                </Text>
            </Stack>
        </Box>
    );

};

export default CheckAllowance;