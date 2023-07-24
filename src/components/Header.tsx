import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <div className="flex justify-between w-11/12 md:w-9/12 mx-auto h-24 items-center">
        <Link href="/">
          <h1 className="text-xl">YouTube FeedBack</h1>
        </Link>
        <ul className="flex gap-3">
          <li>menu1</li>
          <li>menu2</li>
          <li>menu3</li>
        </ul>
      </div>
    </header>
  );
};
