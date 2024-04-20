import { embeddedWallet } from "@thirdweb-dev/react";
import { createGlobalStyle } from "styled-components";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";

export const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  a:link { 
    text-decoration: none; 
  } 
}
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThirdwebProvider
        activeChain="binance-testnet"
        clientId="c1b4f57e83bf5da4d176bd589794d1e7"
        supportedWallets={[
          metamaskWallet({ recommended: true }),
          embeddedWallet({
            auth: {
              options: ["google"],
            },
          }),
        ]}
        autoConnect={false}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </>
  );
}
