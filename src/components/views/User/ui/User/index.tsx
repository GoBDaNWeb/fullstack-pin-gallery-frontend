import styles from "./styles.module.sass";

import Avatar from "../Avatar";
import Feed from "../Feed";

const User = () => {
  return (
    <div className={styles.user}>
      <div className={styles.backgroundWrapper}>
        <div
          className={styles.background}
          style={{
            background:
              "url('https://images.unsplash.com/photo-1656904595885-fad847eef1f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className={styles.avatarWrapper}>
          <Avatar />
        </div>
      </div>
      <div className={`container ${styles.feedWrapper}`}>
        <Feed />
      </div>
    </div>
  );
};

export default User;
