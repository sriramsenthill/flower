import { useState } from 'react';
import { Box, Text, Heading, Input, Stack } from '@chakra-ui/react';
import Button from '../ui/button';
import { toaster } from '../ui/toaster';
import { useTokenOperations } from '@/hooks/useTokenOperations';


const CheckBalance = () => {

    const [account, setAccount] = useState<string>("");
    const [balance, setBalance] = useState<string>('0');

    const [loading, setLoading] = useState<boolean>(false);

    const { checkBalance } = useTokenOperations();

    const getCurrentBalance = async () => {
        if (account.trim() === '') {
            toaster.create({
                title: "Warning",
                description: "Wallet address is required.",
                type: "info",
                duration: 3000,
            });
            return;
        }
        setLoading(true);
        try {
            const result = await checkBalance(account);
            setBalance(result.toString());
            toaster.create({
                title: "Success",
                description: "Checked Balance successfully.",
                type: "success",
            });
        } catch (error) {
            toaster.create({
                title: "Error",
                description: "Cannot check balance",
                type: "error",
                duration: 3000,
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

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
                Check Balance
            </Heading>
            <Stack gap={4}>
                <Box>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={1}>
                        Address
                    </Text>
                    <Input
                        color="black"
                        pl="4"
                        placeholder="Enter address"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        bg="gray.100"
                        borderColor="gray.300"
                        _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px #319795" }}
                        _hover={{ borderColor: "teal.400" }}
                    />
                </Box>
                <Button
                    bg="teal.500"
                    colorScheme="teal"
                    onClick={getCurrentBalance}
                    loading={loading}
                    loadingText="Loading..."
                    _hover={{ bg: "teal.400" }}
                    _active={{ bg: "teal.600" }}
                >
                    Check Balance
                </Button>
                {balance && (
                    <Text fontSize="sm" fontWeight="semibold" color="gray.700" textAlign="center">
                        Balance: {balance} KET
                    </Text>
                )}
            </Stack>
        </Box>
    );

};

export default CheckBalance;
