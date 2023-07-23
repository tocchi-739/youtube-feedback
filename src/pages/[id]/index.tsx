import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";
import YouTube, { YouTubeProps } from "react-youtube";

const IndividualPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const start = Number(router.query.start);
  const end = Number(router.query.end);

  // const onPlayerReady:YouTubeProps["onReady"]=()=>{

  // }

  const opts = {
    height: "360",
    width: "640",
    playerVars: {
      start: start,
      end: end,
    },
  };

  return (
    <>
      <main className={styles.main}>
        <YouTube videoId={id} opts={opts} />
        <h2>{router.query.title}</h2>
        <p>{router.query.id}</p>
        <p>{router.query.start}</p>
        <p>{router.query.end}</p>
      </main>
    </>
  );
};

export default IndividualPage;
