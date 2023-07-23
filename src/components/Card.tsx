import Link from "next/link";
import { useRouter } from "next/router";

interface props {
  title: string;
  id: string;
  start: number;
  end: number;
}

export const Card = (props: props) => {
  const { title, id, start, end } = props;

  return (
    <li className="border">
      <Link
        href={{
          pathname: `/${id}`,
          query: {
            title,
            id,
            start,
            end,
          },
        }}
      >
        <div id="player"></div>
        <h2>{title}</h2>
        <p>{id}</p>
        <p>{start}</p>
        <p>{end}</p>
      </Link>
    </li>
  );
};
