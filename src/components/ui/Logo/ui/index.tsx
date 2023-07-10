import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";

import styles from "./styles.module.sass";

const Logo = () => {
  const router = useRouter();

  const clickOnLogo = () => {
    if (router.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      router.push("/");
    }
  };

  return (
    <button onClick={clickOnLogo} className={styles.logo}>
      <Image src="/logo.svg" width={85} height={30} sizes="100vw" alt="logo" />
    </button>
  );
};

export default Logo;
