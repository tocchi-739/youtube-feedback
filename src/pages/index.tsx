import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

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
    } catch (error) {
      toast.error("error");
    }
  };
  interface youtubeUrl {
    id: string;
    url: string;
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
          };
        });
        setYoutubeUrlArray(dataList);
      }
    );

    // コンポーネントのアンマウント時にデータ監視を停止
    return () => unsubscribe();
  }, []);
  console.log(youtubeUrlArray);

  const data = [
    {
      title: "タイトル1",
      id: "vEwFIwW3mg0",
      comments: [
        {
          title: "ここ",
          start: 10,
          end: 15,
          comment: "こうした方がいいと思う",
        },
        {
          title: "ここ",
          start: 100,
          end: 102,
          comment: "こうした方がいいと思う",
        },
        {
          title: "ここ",
          start: 205,
          end: 210,
          comment: "こうした方がいいと思う",
        },
        {
          title: "ここ",
          start: 210,
          end: 215,
          comment: "こうした方がいいと思う",
        },
        {
          title: "ここ",
          start: 220,
          end: 222,
          comment: "こうした方がいいと思う",
        },
        {
          title: "ここ",
          start: 240,
          end: 242,
          comment: "こうした方がいいと思う",
        },
        {
          title: "ここ",
          start: 1000,
          end: 1004,
          comment: "こうした方がいいと思う",
        },
        {
          title: "ここ",
          start: 2000,
          end: 2003,
          comment: "こうした方がいいと思う",
        },
      ],
    },
    {
      title: "タイトル2",
      id: "oXd0e-TQkII",
      comments: [
        {
          title: "ここ",
          start: 10,
          end: 15,
          comment: "こうした方がいいと思う",
        },
        {
          title: "ここ",
          start: 100,
          end: 102,
          comment: "こうした方がいいと思う",
        },
      ],
    },
    {
      title: "タイトル3",
      id: "O3mS6ft7ylE",
      comments: [
        {
          title: "ここ",
          start: 10,
          end: 15,
          comment: "こうした方がいいと思う",
        },
        {
          title: "ここ",
          start: 100,
          end: 102,
          comment: "こうした方がいいと思う",
        },
      ],
    },
    {
      title: "タイトル4",
      id: "PB-Ac9IcGcI",
      comments: [
        {
          title: "ここ",
          start: 10,
          end: 15,
          comment: "こうした方がいいと思う",
        },
        {
          title: "ここ",
          start: 100,
          end: 102,
          comment: "こうした方がいいと思う",
        },
      ],
    },
  ];

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
        <ul className="grid lg:grid-cols-3 gap-4 w-11/12 md:w-9/12">
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
        </ul>
      </main>
      <footer className={styles.footer}></footer>
      <Toaster />
    </div>
  );
};

export default Home;
