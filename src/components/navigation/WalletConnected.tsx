import React from 'react';
import { useAccount, useDisconnect } from "wagmi";
import {
    ClipboardRoot,
    ClipboardIconButton,
    ClipboardInput
} from "@/components/ui/clipboard";
import Button from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "../ui/toaster";

const WalletConnected = () => {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 9)}...${address.slice(-7)}`;
    };

    return (
        <div className="flex flex-row items-center gap-4">
            <ClipboardRoot value={address || ""} className="max-w-[200px]">
                <InputGroup className="w-fit">
                    <div className="bg-white bg-opacity-50 ml-auto flex h-9 items-center justify-center rounded-full px-3">
                        <ClipboardInput
                            value={shortenAddress(address || "")}
                            readOnly
                            className="bg-transparent text-custom-gray text-sm font-semibold focus:outline-none w-auto"
                        />
                        <ClipboardIconButton className="p-0 text-custom-gray hover:opacity-80" />
                    </div>
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
                className="rounded-full px-4 h-9"
            >
                Disconnect
            </Button>
        </div>
    );
};

export default WalletConnected;