import "../styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

const { chains, provider } = configureChains(
	[chain.goerli, chain.sepolia, chain.polygonMumbai, chain.optimismGoerli],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()],
)
const { connectors } = getDefaultWallets({
	appName: "My RainbowKit App",
	chains,
})
const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
})

function MyApp({ Component, pageProps }) {
	return (
		<div className="m-10">
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains}>
					<Component {...pageProps} />
				</RainbowKitProvider>
			</WagmiConfig>
		</div>
	)
}

export default MyApp