import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";
import YouTube from "react-youtube";
import { useRef, useState } from "react";
import { Header } from "../../components/Header";
import Head from "next/head";
import { Toaster, toast } from "react-hot-toast";

const IndividualPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { comments: serializedComments } = router.query;
  const comments =
    typeof serializedComments === "string"
      ? JSON.parse(serializedComments)
      : [];

  const playerRef = useRef<any>(null);

  const [start, setStart] = useState<number>();
  const [end, setEnd] = useState<number>();
  const handleClick = (start: number, end: number) => {
    setStart(start);
    setEnd(end);
    toast.success("開始〜終了時間を変更しました：" + start + "〜" + end);
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
      <Head>
        <title>詳細ページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
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
              className="bg-slate-100 mx-auto w-full p-2 shadow hover:bg-slate-50 duration-200
              "
              onClick={() => handleClick(data.start, data.end)}
            >
              <p>
                開始：{data.start} 終了：{data.end}
              </p>
              <p>{data.title}</p>
              <p>コメント</p>
              <p>{data.comment}</p>
            </li>
          ))}
        </ul>
      </main>
      <Toaster />
    </>
  );
};

export default IndividualPage;
