import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

const db = getFirestore(app);
const Home: NextPage = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(() => e.target.value);
  };
  const handleClick = async () => {
    console.log("クリックされました");

    try {
      const col = collection(db, "youtube-feedback");
      await addDoc(col, { url: youtubeUrl });
      toast.success("success!" + youtubeUrl);
      setYoutubeUrl("");
    } catch (error) {
      toast.error("error");
    }
  };

  const handleDelete = async (e: string) => {
    const confirm: boolean = window.confirm("本当に削除しますか？");
    if (confirm) {
      try {
        await deleteDoc(doc(db, "youtube-feedback", e));
        toast.success("削除しました");
      } catch (error) {
        toast.error("error");
      }
    } else {
      await toast("削除を中止しました");
    }
  };
  interface youtubeUrl {
    id: string;
    url: string;
    youtubeId: string;
    detail: {
      title: string;
      start: number;
      end: number;
      comment: string;
    }[];
  }
  const [youtubeUrlArray, setYoutubeUrlArray] = useState<youtubeUrl[]>([]);
  useEffect(() => {
    // Firestoreのデータ監視を設定
    const unsubscribe = onSnapshot(
      collection(db, "youtube-feedback"),
      (snapshot) => {
        const dataList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            url: data.url,
            youtubeId: data.url
              .replace("https://www.youtube.com/watch?v=", "")
              .replace("https://youtu.be/", ""),
            detail: data.detail,
          };
        });
        setYoutubeUrlArray(dataList);
      }
    );

    // コンポーネントのアンマウント時にデータ監視を停止
    return () => unsubscribe();
  }, []);
  console.log(youtubeUrlArray);

  // const data = [
  //   {
  //     title: "タイトル1",
  //     id: "vEwFIwW3mg0",
  //     comments: [
  //       {
  //         title: "ここ",
  //         start: 10,
  //         end: 15,
  //         comment: "こうした方がいいと思う",
  //       },
  //       {
  //         title: "ここ",
  //         start: 100,
  //         end: 102,
  //         comment: "こうした方がいいと思う",
  //       },
  //       {
  //         title: "ここ",
  //         start: 205,
  //         end: 210,
  //         comment: "こうした方がいいと思う",
  //       },
  //       {
  //         title: "ここ",
  //         start: 210,
  //         end: 215,
  //         comment: "こうした方がいいと思う",
  //       },
  //       {
  //         title: "ここ",
  //         start: 220,
  //         end: 222,
  //         comment: "こうした方がいいと思う",
  //       },
  //       {
  //         title: "ここ",
  //         start: 240,
  //         end: 242,
  //         comment: "こうした方がいいと思う",
  //       },
  //       {
  //         title: "ここ",
  //         start: 1000,
  //         end: 1004,
  //         comment: "こうした方がいいと思う",
  //       },
  //       {
  //         title: "ここ",
  //         start: 2000,
  //         end: 2003,
  //         comment: "こうした方がいいと思う",
  //       },
  //     ],
  //   },
  //   {
  //     title: "タイトル2",
  //     id: "oXd0e-TQkII",
  //     comments: [
  //       {
  //         title: "ここ",
  //         start: 10,
  //         end: 15,
  //         comment: "こうした方がいいと思う",
  //       },
  //       {
  //         title: "ここ",
  //         start: 100,
  //         end: 102,
  //         comment: "こうした方がいいと思う",
  //       },
  //     ],
  //   },
  //   {
  //     title: "タイトル3",
  //     id: "O3mS6ft7ylE",
  //     comments: [
  //       {
  //         title: "ここ",
  //         start: 10,
  //         end: 15,
  //         comment: "こうした方がいいと思う",
  //       },
  //       {
  //         title: "ここ",
  //         start: 100,
  //         end: 102,
  //         comment: "こうした方がいいと思う",
  //       },
  //     ],
  //   },
  //   {
  //     title: "タイトル4",
  //     id: "PB-Ac9IcGcI",
  //     comments: [
  //       {
  //         title: "ここ",
  //         start: 10,
  //         end: 15,
  //         comment: "こうした方がいいと思う",
  //       },
  //       {
  //         title: "ここ",
  //         start: 100,
  //         end: 102,
  //         comment: "こうした方がいいと思う",
  //       },
  //     ],
  //   },
  // ];

  return (
    <div>
      <Head>
        <title>Youtube Feecback</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <input
          type="url"
          onChange={handleChange}
          value={youtubeUrl}
          className="border p-2"
        />
        <div onClick={handleClick}>ボタン</div>
        {/* <ul className="grid lg:grid-cols-3 gap-4 w-11/12 md:w-9/12">
          {data.map((data) => {
            return (
              <Card
                title={data.title}
                id={data.id}
                comments={data.comments}
                key={data.id}
              />
            );
          })}
        </ul> */}
        <ul className="grid lg:grid-cols-3 gap-4 w-11/12 md:w-9/12">
          {youtubeUrlArray.map((data) => {
            return (
              <li
                className="shadow p-4 rounded-sm bg-gray-100 hover:-translate-y-2 duration-300"
                key={data.id}
              >
                <Link
                  href={{
                    pathname: `/${data.youtubeId}`,
                    query: {
                      url: data.url,
                      id: data.youtubeId,
                      detail: JSON.stringify(data.detail),
                    },
                  }}
                >
                  <h2>{data.url}</h2>
                  <p>{data.youtubeId}</p>
                </Link>
                <button
                  className="p-1 border bg-red-400"
                  onClick={() => handleDelete(data.id)}
                >
                  削除
                </button>
              </li>
            );
          })}
        </ul>
      </main>
      <footer className={styles.footer}></footer>
      <Toaster />
    </div>
  );
};

export default Home;
