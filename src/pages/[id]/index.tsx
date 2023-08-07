import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";
import YouTube from "react-youtube";
import { useEffect, useRef, useState } from "react";
import { Header } from "../../components/Header";
import Head from "next/head";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "../../components/Button";
import { InputArea } from "../../components/InputArea";
import {
  Timestamp,
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../../firebase/firebase";

const db = getFirestore(app);
const IndividualPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const dataId = router.query.dataId as string;
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

  const [submitData, setSubmitData] = useState({ start: "", end: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubmitData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [submitComment, setSubmitComment] = useState("");

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSubmitComment(() => e.target.value);
    console.log(submitComment);
  };
  const handleClickSubmit = async () => {
    console.log(dataId, submitData, submitComment);

    try {
      const col = collection(db, "youtube-feedback", dataId, "commentsData");
      const commentData = {
        start: submitData.start,
        end: submitData.end,
        comment: submitComment,
        date: serverTimestamp(),
      };
      await addDoc(col, commentData);
      toast.success("success!");
      setSubmitData({ start: "", end: "" });
      setSubmitComment("");
    } catch (error) {
      console.log(error);

      toast.error("error");
    }
  };
  interface commentArray {
    id: string;
    start: string;
    end: string;
    comment: string;
    date: Timestamp;
  }
  const [commentArray, setCommentArray] = useState<commentArray[]>([]);
  useEffect(() => {
    // Firestoreのデータ監視を設定
    const unsubscribe = onSnapshot(
      collection(db, "youtube-feedback", dataId, "commentsData"),
      (snapshot) => {
        const dataList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            start: data.start,
            end: data.end,
            comment: data.comment,
            date: data.date,
          };
        });
        setCommentArray(dataList);
      }
    );

    // コンポーネントのアンマウント時にデータ監視を停止
    return () => unsubscribe();
  }, []);

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
            {commentArray.map((data: commentArray, index: number) => (
              <li
                key={index}
                className="bg-slate-100 mx-auto w-full p-2 shadow hover:bg-slate-50 duration-200
              "
                onClick={() =>
                  handleClick(Number(data.start), Number(data.end))
                }
              >
                <p>
                  開始：{data.start} 終了：{data.end}
                </p>
                {/* <p>{data.date}</p> */}
                <p>コメント</p>
                <p>{data.comment}</p>
              </li>
            ))}
          </ul>
          <div className="flex flex-col mt-4 w-full">
            <div>
              <InputArea
                name="start"
                type="text"
                handleChange={handleChange}
                value={submitData.start}
              ></InputArea>
              <InputArea
                name="end"
                type="text"
                handleChange={handleChange}
                value={submitData.end}
              ></InputArea>

              <Button
                handleClick={handleClickSubmit}
                buttonText="ボタン"
              ></Button>
            </div>
            <textarea
              onChange={handleChangeComment}
              value={submitComment}
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
