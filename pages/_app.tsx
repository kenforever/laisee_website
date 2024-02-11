import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  optimism,
  sepolia
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura'


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    optimism,
  ],
  //@ts-ignore
  [infuraProvider({ infuraId: '1e44e067e9324913859ccf802099fcac'})]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  
  projectId: "0957ac998e70b480245f385815a573fb",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
