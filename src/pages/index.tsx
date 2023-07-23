import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { Card } from "../components/Card";

const Home: NextPage = () => {
  const data = [
    { title: "タイトル1", id: "111", start: 100, end: 102 },
    { title: "タイトル2", id: "222", start: 100, end: 102 },
    { title: "タイトル3", id: "333", start: 100, end: 102 },
    { title: "タイトル4", id: "444", start: 100, end: 102 },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Youtube Feecback</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul className="grid grid-cols-3 gap-4">
          {data.map((data) => {
            return (
              <Card
                title={data.title}
                id={data.id}
                start={data.start}
                end={data.end}
              />
            );
          })}
        </ul>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
