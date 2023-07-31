import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";
import YouTube from "react-youtube";
import { useEffect, useRef, useState } from "react";
import { Header } from "../../components/Header";
import Head from "next/head";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "../../components/Button";

const IndividualPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { detail: serializedDetail } = router.query;
  const detail =
    typeof serializedDetail === "string" && serializedDetail.trim() !== ""
      ? JSON.parse(serializedDetail)
      : [];

  // const { comments: serializedComments } = router.query;
  // const comments =
  //   typeof serializedComments === "string"
  //     ? JSON.parse(serializedComments)
  //     : [];

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
  const [playerWidth, setPlayerWidth] = useState(640); // プレーヤーの初期幅
  const playerHeight = (playerWidth * 9) / 16;

  // ウィンドウサイズが変更されたときにコンポーネントの幅を調整
  useEffect(() => {
    const handleResize = () => {
      const containerWidth =
        document.getElementById("youtube-container")?.clientWidth;
      if (containerWidth) {
        setPlayerWidth(containerWidth);
        console.log(containerWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // 初回表示時に幅を調整
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // コメント投稿関係

  const handleClickSubmit = async () => {
    console.log("クリックされました");
  };

  return (
    <>
      <Head>
        <title>詳細ページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className="w-11/12 md:w-6/12 lg:w-11/12 lg:flex lg:flex-wrap">
          <div className="lg:w-[70%]">
            <YouTube
              className="aspect-video"
              videoId={id}
              opts={{
                height: "100%",
                width: "100%",
                playerVars: {
                  start: start,
                  end: end,
                  loop: 1,
                },
              }}
              onStateChange={onStateChange}
              ref={playerRef}
            />
          </div>

          <ul className="flex flex-col w-full gap-4 mt-4 overflow-y-scroll h-[40vh] lg:w-[30%] lg:h-[70vh] lg:mt-0">
            {detail.map(
              (
                data: {
                  start: number;
                  end: number;
                  title: string;
                  comment: string;
                },
                index: number
              ) => (
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
              )
            )}
          </ul>
          <div className="flex flex-col mt-4 w-full">
            <div>
              <input
                type="text"
                // onChange={handleChange}
                value={start}
                placeholder="開始時間"
                className="border p-2"
              />
              <input
                type="text"
                // onChange={handleChange}
                value={end}
                placeholder="終了時間"
                className="border p-2"
              />

              <Button
                handleClick={handleClickSubmit}
                buttonText="ボタン"
              ></Button>
            </div>
            <textarea
              // onChange={handleChange}
              value={end}
              placeholder="コメント"
              className="border p-2 w-full"
            />
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
};

export default IndividualPage;
