import { Flex } from "@chakra-ui/react";
import Button from '@/components/ui/button';
import { useAccount, useDisconnect } from "wagmi";
import {
    ClipboardIconButton,
    ClipboardInput,
    ClipboardRoot,
} from "@/components/ui/clipboard";
import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "../ui/toaster";

export default function WalletConnected() {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 7)}.....${address.slice(-7)}`;
    };

    return (
        <Flex direction="row" align="center" gap={2}>
            <ClipboardRoot value={address || ""} maxW="200px">
                <InputGroup width="fit" endElement={<ClipboardIconButton />}>
                    <ClipboardInput
                        fontSize="sm"
                        fontWeight="semibold"
                        value={shortenAddress(address || "")}
                        readOnly
                        borderColor="gray.300"
                        _focus={{ borderColor: "teal.500" }}
                        _hover={{ borderColor: "teal.400" }}
                        bg="gray.50"
                        borderRadius="md"
                        px={3}
                        py={2}
                        transition="all 0.3s ease"
                    />
                </InputGroup>
            </ClipboardRoot>

            <Button

                onClick={() => {
                    disconnect();
                    toaster.create({
                        title: "Disconnected Successfully.",
                        type: "info"
                    });
                }}

            >
                Disconnect
            </Button>
        </Flex>
    );
}
