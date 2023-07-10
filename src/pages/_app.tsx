import { useGetAuthMeQuery } from "@/api";
import { Header } from "@/components/layout/Header";
import { LoginModal } from "@/components/layout/LoginModal";
import { RegisterModal } from "@/components/layout/RegisterModal";
import { wrapper } from "@/shared/store";
import "@/styles/index.sass";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { MobileMenu } from "@/components/layout/MobileMenu";
const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  useGetAuthMeQuery();

  return (
    <main className={inter.className}>
      <Header />
      <LoginModal />
      <RegisterModal />
      <MobileMenu />
      <Component {...pageProps} />
    </main>
  );
};
export default wrapper.withRedux(App);
