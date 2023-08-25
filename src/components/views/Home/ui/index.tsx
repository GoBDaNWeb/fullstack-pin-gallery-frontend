import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useGetAllPinsQuery, useGetPopularPinsQuery } from "@/shared/api";

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
    refetchAllPins();
    refetchPopularPins();
  }, [id, refetchAllPins, refetchPopularPins]);

  const handleChangePins = (type: "all" | "popular") => {
    if (type === "all") {
      seAllPins(true);
      refetchAllPins();
    } else if (type === "popular") {
      seAllPins(false);
      refetchPopularPins();
    }
  };

  return (
    <div className={`${styles.home} container`}>
      <div className={styles.btnsWrapper}>
        <Button func={() => handleChangePins("all")} active={isAllPins}>
          Все
        </Button>
        <Button func={() => handleChangePins("popular")} active={!isAllPins}>
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
