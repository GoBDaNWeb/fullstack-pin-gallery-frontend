import { useRouter } from "next/router";

import styles from "./styles.module.sass";

import { Button } from "@/components/ui/Button";
import { FaRegSadTear } from "react-icons/fa";

const Error = () => {
  const router = useRouter();

  return (
    <div className={`${styles.error} container`}>
      <h1>Кажется такой страницы не существует</h1>
      <FaRegSadTear className={styles.icon} />
      <Button func={() => router.push("/")}>Вернуться на главную</Button>
    </div>
  );
};

export default Error;
