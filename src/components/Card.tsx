import Link from "next/link";

interface props {
  title: string;
  id: string;
  comments: {
    title: string;
    start: number;
    end: number;
    comment: string;
  }[];
}

export const Card = (props: props) => {
  const { title, id, comments } = props;

  const serializedComments = JSON.stringify(comments); // commentsをJSON文字列に変換

  return (
    <li className="shadow p-4 rounded-sm bg-gray-100 hover:bg-gray-200 duration-300">
      <Link
        href={{
          pathname: `/${id}`,
          query: {
            title,
            id,
            comments: serializedComments, // JSON文字列に変換したcommentsを渡す
          },
        }}
      >
        <h2>{title}</h2>
        <p>{id}</p>
      </Link>
    </li>
  );
};
