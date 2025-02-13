import React, { useState, useEffect } from 'react';
import { useConnect, Connector, useChainId, useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';

const WalletConnectionModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { connect, connectors } = useConnect();
    const chainId = useChainId();
    const { isConnected, address } = useAccount();  // Extract wallet address
    const router = useRouter();

    useEffect(() => {
        if (isConnected && address) {
            setIsOpen(false);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "wallet_connected",
                wallet_address: address,
            });
        }
    }, [isConnected, address]);

    if (!isOpen) {
        return (
            <Button onClick={() => setIsOpen(true)}>
                Connect
            </Button>
        );
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="gf-transform max-h-[692px] w-[600px] flex flex-col gap-6 rounded-2xl p-6 bg-white/50 backdrop-blur-md">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-700">Connect a wallet</span>
                        <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-800">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.33464 11.8334L0.167969 10.6667L4.83464 6.00002L0.167969 1.33335L1.33464 0.166687L6.0013 4.83335L10.668 0.166687L11.8346 1.33335L7.16797 6.00002L11.8346 10.6667L10.668 11.8334L6.0013 7.16669L1.33464 11.8334Z" />
                            </svg>
                        </button>
                    </div>

                    {/* Wallet List */}
                    <div className="flex flex-col gap-1 overflow-y-auto rounded-2xl bg-white/50 p-4">
                        {connectors.map((connector) => (
                            <WalletOption
                                key={connector.uid}
                                connector={connector}
                                onClick={async () => {
                                    await connect({ connector, chainId });
                                    router.push('/');
                                }}
                            />
                        ))}
                    </div>

                    {/* Terms */}
                    <div className="mb-2">
                        <span className="text-sm text-gray-700">
                            By connecting a wallet, you agree to Flower {' '}
                            <a href="https://garden.finance/terms.pdf" target="_blank" rel="noreferrer" className="font-bold">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="https://garden.finance/privacy.pdf" target="_blank" rel="noreferrer" className="font-bold">
                                Privacy Policy
                            </a>
                            .
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

const WalletOption = ({ connector, onClick }: { connector: Connector; onClick: () => void }) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            const provider = await connector.getProvider();
            setReady(!!provider);
        })();
    }, [connector]);

    return (
        <div className="flex h-full items-center justify-between gap-4 rounded-xl p-4 cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-4">
                <img src={`https://garden-finance.imgix.net/wallets/metamask.svg`} alt={connector.name} className="h-6 w-6" />
                <span className="text-base font-medium text-gray-700 sm:text-xl">{connector.name}</span>
            </div>
            <Button
                disabled={!ready}
                onClick={onClick}
                loadingText="Connecting"
            >
                Connect
            </Button>
        </div>
    );
};

export default WalletConnectionModal;
