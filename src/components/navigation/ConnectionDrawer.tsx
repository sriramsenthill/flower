"use client";

import Button from '@/components/ui/button';
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useState, useEffect } from "react";
import { useConnect, Connector, useChainId, useAccount } from "wagmi";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const ConnectionDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { connect, connectors } = useConnect();
    const chainId = useChainId();
    const { isConnected } = useAccount();


    useEffect(() => {
        if (isConnected) {
            setIsDrawerOpen(false);
        }
    }, [isConnected]);

    const router = useRouter();

    return (
        <DrawerRoot open={isDrawerOpen}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <Button

                    onClick={() => {
                        setIsDrawerOpen(true);
                    }}

                >
                    Connect
                </Button>
            </DrawerTrigger>

            <DrawerContent offset="4" rounded="md" bg="gray.50">
                <DrawerHeader>
                    <DrawerTitle fontSize="lg" fontWeight="medium" color="gray.800">
                        Select Wallet
                    </DrawerTitle>
                </DrawerHeader>

                <DrawerBody display="flex" flexDirection="column" gap={5}>
                    {connectors.map((connector) => (
                        <ConnectButton
                            key={connector.uid}
                            connector={connector}
                            onClick={async () => {
                                await connect({ connector, chainId });
                                router.push('/');
                            }}
                        />
                    ))}
                </DrawerBody>

                <DrawerFooter>
                    <DrawerActionTrigger asChild>
                        <Button onClick={() => {
                            setIsDrawerOpen(false);
                        }} >
                            Close
                        </Button>
                    </DrawerActionTrigger>
                </DrawerFooter>

                <DrawerCloseTrigger onClick={() => {
                    setIsDrawerOpen(false);
                }} color="black" />
            </DrawerContent>
        </DrawerRoot >
    );
};

export default ConnectionDrawer;

function ConnectButton({
    connector,
    onClick,
}: {
    connector: Connector;
    onClick: () => void;
}) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            const provider = await connector.getProvider();
            setReady(!!provider);
        })();
    }, [connector]);

    return (
        <Flex key={connector.id} align="center" justify="space-between" padding="2" border="1px solid gray" rounded="sm">
            <Text
                fontSize="md"
                fontWeight="normal"
                color="gray.900"
            >
                {connector.name}
            </Text>
            <Spacer />
            <Button
                disabled={!ready}
                onClick={onClick}
                key={connector.uid}

                loadingText="Connecting"
            >
                Connect
            </Button>
        </Flex>
    );
}
