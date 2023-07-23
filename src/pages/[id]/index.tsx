import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";
import YouTube from "react-youtube";
import { useRef, useState } from "react";

const IndividualPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { comments: serializedComments } = router.query;
  const comments =
    typeof serializedComments === "string"
      ? JSON.parse(serializedComments)
      : [];

  // const start = Number(router.query.start);
  // const end = Number(router.query.end);
  const playerRef = useRef<any>(null);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(1);
  const handleClick = (start: number, end: number) => {
    setStart(start);
    setEnd(end);
  };

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
        <ul className="flex flex-col  w-[640px] gap-4 mt-4 overflow-y-scroll h-[40vh]">
          {comments.map((data: any, index: number) => (
            <li
              key={index}
              className="bg-slate-300 mx-auto w-full
              "
              onClick={() => handleClick(data.start, data.end)}
            >
              <p>{data.title}</p>
              <p>コメント</p>
              <p>{data.comment}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default IndividualPage;
