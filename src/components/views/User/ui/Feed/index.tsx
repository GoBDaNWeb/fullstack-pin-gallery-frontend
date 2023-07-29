import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useGetCreatedQuery, useGetPinedQuery } from "@/shared/api";

import styles from "./styles.module.sass";

import { Masonry } from "@/components/common/Masonry";
import { Loader } from "@/components/ui/Loader";
import { PinItem } from "@/components/common/PinItem";
import { Button } from "@/components/ui/Button";

const Feed = () => {
  const [isCreated, setIsCreated] = useState(true);

  const {
    query: { id },
  } = useRouter();

  const { data: pinedItems, isLoading: isLoadingPined } = useGetPinedQuery(id);

  const { data: createdItems, isLoading: isLoadingCreated } =
    useGetCreatedQuery(id);

  useEffect(() => {
    setIsCreated(true);
  }, [id]);

  return (
    <div>
      <div className={styles.buttons}>
        <Button active={isCreated} func={() => setIsCreated(true)}>
          Созданные
        </Button>
        <Button active={!isCreated} func={() => setIsCreated(false)}>
          Сохраненные
        </Button>
      </div>
      {isLoadingPined || isLoadingCreated ? (
        <Loader />
      ) : (
        <>
          {isCreated ? (
            <Masonry>
              {createdItems?.map((pin) => (
                <PinItem key={pin._id} pin={pin} />
              ))}
            </Masonry>
          ) : (
            <Masonry>
              {pinedItems?.map((pin) => (
                <PinItem key={pin._id} pin={pin} />
              ))}
            </Masonry>
          )}
        </>
      )}
    </div>
  );
};

export default Feed;
