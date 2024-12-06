import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: { Component: React.ComponentType, pageProps: any }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div>Test Component</div>
    </SessionProvider>
  );
}

export default MyApp;
