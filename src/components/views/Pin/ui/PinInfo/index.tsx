import { useRouter } from "next/router";

import { useGetOnePinQuery } from "@/shared/api";

import styles from "./styles.module.sass";

import PinComments from "../PinComments";
import PinContent from "../PinContent";
import PinImg from "../PinImg";

const PinInfo = () => {
  const {
    query: { id },
  } = useRouter();
  const { data, isLoading } = useGetOnePinQuery(id);

  return (
    <div className={styles.pinInfo}>
      <PinImg img={data?.imageUrl} isLoading={isLoading} />
      <div className={styles.pinInfoContent}>
        <PinContent />
        <PinComments />
      </div>
    </div>
  );
};

export default PinInfo;
