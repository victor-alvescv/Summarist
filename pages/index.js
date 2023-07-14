import { useDispatch, useSelector } from "react-redux";
import HomePage from "../components/HomePage";
import Head from "next/head";
import SignInModal from "@/components/modals/SignInModal";

export default function Home() {
  const isOpen = useSelector((state) => state?.modals.SignInModalOpen);
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="./style.css" />
        <title>Summarist</title>
      </Head>
      <div>
        <HomePage />
      </div>
    </>
  );
}
