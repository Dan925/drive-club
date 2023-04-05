import { NextPageContext } from "next";
import Head from "next/head";
import Login from "~/components/login";
import { getCsrfToken } from "next-auth/react";
import { getSession } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";
const Home = ({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
        <>
            <Head>
                <title>Drive Club</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className=" w-full h-screen flex flex-col items-center justify-center gap-4">
                <h1>Driving Lesson Scheduling</h1>

                <Login csrfToken={csrfToken} />

            </main>
        </>
    );
};
export async function getServerSideProps(context: NextPageContext) {

    const session = await getSession(context)
    console.log(session)
    if (session) {
        return {
            redirect: {
                destination: '/lessons',
                permanent: false,
            },
        }
    }
    const csrfToken = await getCsrfToken(context)

    return {
        props: { csrfToken: csrfToken },
    }

}

export default Home;

