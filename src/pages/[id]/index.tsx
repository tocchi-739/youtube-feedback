import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";
import YouTube from "react-youtube";
import { useRef } from "react";

const IndividualPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const start = Number(router.query.start);
  const end = Number(router.query.end);
  const playerRef = useRef<any>(null);

  // プレーヤーの状態が変わったときに呼ばれるコールバック関数
  const onStateChange = (event: any) => {
    // 再生終了したら開始位置に戻す
    if (event.data === YouTube.PlayerState.ENDED) {
      playerRef.current?.internalPlayer?.seekTo(start);
      playerRef.current?.internalPlayer?.playVideo();
    }
  };

  return (
    <>
      <main className={styles.main}>
        <YouTube
          videoId={id}
          opts={{
            height: "360",
            width: "640",
            playerVars: {
              start: start,
              end: end,
              loop: 1,
            },
          }}
          onStateChange={onStateChange}
          ref={playerRef}
        />
        <h2>{router.query.title}</h2>
        <p>{router.query.id}</p>
        <p>{router.query.start}</p>
        <p>{router.query.end}</p>
      </main>
    </>
  );
};

export default IndividualPage;
