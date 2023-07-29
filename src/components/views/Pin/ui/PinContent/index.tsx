import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  useDeletePinMutation,
  useGetOnePinQuery,
  useLazyGetOnePinQuery,
} from "@/shared/api";
import { selectAuthData } from "@/shared/store/slices/user/selectors";

import styles from "./styles.module.sass";

import { BsEyeFill } from "react-icons/bs";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { Skeleton } from "@/components/ui/Skeleton";

const PinContent = () => {
  const currentUser = useSelector(selectAuthData);
  const router = useRouter();

  const { data, isLoading } = useGetOnePinQuery(router.query.id);

  const [deletePin] = useDeletePinMutation();
  const [fetchPin] = useLazyGetOnePinQuery();

  const deletePinFunc = async () => {
    const params = {
      pinId: router.query.id,
    };
    await deletePin(params);
    router.push("/");
  };

  return (
    <div className={styles.pinContent}>
      <div className={styles.viewCount}>
        <BsEyeFill />
        <span>
          {isLoading ? (
            <Skeleton customStyles={{ width: "24px", height: "20px" }} />
          ) : (
            data?.viewsCount
          )}
        </span>
      </div>
      <h3 className={styles.title}>
        {isLoading ? (
          <Skeleton customStyles={{ width: "150px", height: "32px" }} />
        ) : (
          data?.title
        )}
      </h3>
      <h5 className={styles.description}>
        {isLoading ? (
          <Skeleton
            customStyles={{ maxWidth: "600px", width: "100%", height: "150px" }}
          />
        ) : (
          data?.description
        )}
      </h5>
      {isLoading ? (
        <div className={styles.author}>
          <Skeleton customStyles={{ width: "40px", height: "40px" }} />
          <Skeleton customStyles={{ width: "150px", height: "32px" }} />
        </div>
      ) : (
        <Link href={`/user/${data?.author._id}`} className={styles.author}>
          <UserAvatar
            avatarUrl={data?.author.avatarUrl}
            firstName={data?.author.firstName || "avatar"}
          />
          <h5 className={styles.authorName}>
            {data?.author.firstName} {data?.author.lastName}
          </h5>
        </Link>
      )}
    </div>
  );
};

export default PinContent;
