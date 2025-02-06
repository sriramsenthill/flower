"use client";
import { State, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '../config/wagmiConfig'
import { ReactNode, useState } from 'react';

const queryClient = new QueryClient();

const WagmiProviderWrapper = (props: {
    children: ReactNode;
    initialState?: State;
}) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <WagmiProvider config={wagmiConfig} initialState={props.initialState}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
export default WagmiProviderWrapper
