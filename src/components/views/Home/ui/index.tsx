import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useGetAllPinsQuery, useGetPopularPinsQuery } from "@/api";

import styles from "./styles.module.sass";

import { Loader } from "@/components/ui/Loader";
import { Masonry } from "@/components/common/Masonry";
import { PinItem } from "@/components/common/PinItem";
import { Button } from "@/components/ui/Button";

const Home = () => {
  const [isAllPins, seAllPins] = useState(true);

  const {
    query: { id },
  } = useRouter();

  const {
    data: allPins,
    isLoading: isLoadingAllPins,
    refetch: refetchAllPins,
  } = useGetAllPinsQuery();
  const {
    data: popularPins,
    isLoading: isLoadingPopularPins,
    refetch: refetchPopularPins,
  } = useGetPopularPinsQuery();

  useEffect(() => {
    refetchPopularPins();
  }, [id, refetchPopularPins]);

  useEffect(() => {
    refetchAllPins();
  }, [id, refetchAllPins]);

  return (
    <div className={`${styles.home} container`}>
      <div className={styles.btnsWrapper}>
        <Button func={() => seAllPins(true)} active={isAllPins}>
          Все
        </Button>
        <Button func={() => seAllPins(false)} active={!isAllPins}>
          Популярные
        </Button>
      </div>
      {isLoadingAllPins || isLoadingPopularPins ? (
        <Loader />
      ) : (
        <>
          {isAllPins ? (
            <Masonry>
              {allPins?.map((pin) => (
                <PinItem key={pin._id} pin={pin} />
              ))}
            </Masonry>
          ) : (
            <Masonry>
              {popularPins?.map((pin) => (
                <PinItem key={pin._id} pin={pin} />
              ))}
            </Masonry>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
