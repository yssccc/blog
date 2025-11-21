import Header from '@/components/layout/Header';
import './globals.css';
import Footer from '@/components/layout/Footer';
import Toast from '@/components/toast/Toast';
import ToastProvider from '@/components/toast/ToastProvider';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ToastProvider>
          <Header />
          <main>{children}</main>
          <Footer /> <Toast />
        </ToastProvider>
        <GoogleAnalytics gaId="G-2ZHB1CWBQ9" />
      </body>
    </html>
  );
}
