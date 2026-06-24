import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Roboto } from "next/font/google";
import MyState from "@/context/MyState";
import "./globals.css";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import Providers from "@/components/provider";
import { Footer, Navbar } from "@/components";

import { NextIntlClientProvider } from "next-intl";

const roboto = Roboto({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: {
    default: "e-commerce",
    template: "e-commerce - %s",
  },
  description: "Ecommerce Home Page",
};

interface ILayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout({ children, params }: ILayoutProps) {
  const { locale } = await params;
  const direction = locale === "ar" ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased bg-primary dark:bg-secondary text-secondary dark:text-white transition-colors duration-200`}
      >
        <NextTopLoader color="#22c55e" height={3} showSpinner={false} />
        <NextIntlClientProvider>
          <Providers>
            <main className="min-h-screen mx-auto max-w-screen-xl">
              <MyState>
                <Navbar />
                <div className="min-h-screen">{children}</div>
                <Footer />
              </MyState>
            </main>
          </Providers>
        </NextIntlClientProvider>
        <ToastContainer position="top-center" autoClose={1500} />
      </body>
    </html>
  );
}
