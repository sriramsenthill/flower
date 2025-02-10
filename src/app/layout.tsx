import type { Metadata } from "next";
import "./globals.css";
import WagmiProviderWrapper from "@/providers/WagmiProvider";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation/Navigation";
import { Provider } from "@/components/ui/provider";
import Footer from "@/components/footer/Footer";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { wagmiConfig } from "@/config/wagmiConfig";


export const metadata: Metadata = {
  title: "flower 🌸",
  description: "Experience unmatched strength and reliability in the world of tokens. Kal-El Token brings superpower to your crypto journey.",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const initialState = await cookieToInitialState(
    wagmiConfig,
    headersList.get("cookie")
  );
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-satoshi antialiased bg-custom-gradient">
        <WagmiProviderWrapper initialState={initialState}>
          <Provider>
            <Navigation />
            <Toaster />
            {children}
          </Provider>
        </WagmiProviderWrapper>
      </body>
    </html>
  );
}
