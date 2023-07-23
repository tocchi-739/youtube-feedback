import { useRouter } from "next/router";

const IndividualPage = () => {
  const router = useRouter();

  return (
    <>
      <h2>{router.query.title}</h2>
      <p>{router.query.id}</p>
      <p>{router.query.start}</p>
      <p>{router.query.end}</p>
    </>
  );
};

export default IndividualPage;
