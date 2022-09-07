import "../styles/global.css"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

export default function MyApp({ Component, pageProps }) {
    const [queryClient] = React.useState(() => new QueryClient());
    return (
      // Provide the client to your App
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    )
  }