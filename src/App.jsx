import AppRouter from './AppRouter';
import { WagmiProvider } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { arbitrum } from 'wagmi/chains';
import { http, createConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

const config = createConfig({
  chains: [arbitrum],
  transports: {
    [arbitrum.id]: http(),
  },
})

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          chains={[arbitrum]}
          theme={lightTheme({
            accentColor: 'white',
            accentColorForeground: '#242424',
            borderRadius: 'none',
            fontStack: 'mono',
            overlayBlur: 'small',
          })}
          modalSize="compact"
          showRecentTransactions={false}
        >
          <div> 
            <AppRouter/>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App;