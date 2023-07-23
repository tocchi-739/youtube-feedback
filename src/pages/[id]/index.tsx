import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";

const IndividualPage = () => {
  const router = useRouter();

  return (
    <>
      <main className={styles.main}>
        <h2>{router.query.title}</h2>
        <p>{router.query.id}</p>
        <p>{router.query.start}</p>
        <p>{router.query.end}</p>
      </main>
    </>
  );
};

export default IndividualPage;
