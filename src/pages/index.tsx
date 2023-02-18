import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import Link from "next/link";
import { useState } from "react";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const helloQuery = api.example.hello.useQuery({ text: "from tRPC" });
  const getAllQuery = api.example.getAll.useQuery();
  const getSecretMessageQuery = api.example.getSecretMessage.useQuery();
  const context = api.useContext();
  const toolMutation = api.tool.create.useMutation({
    onSuccess: async () => {
      await context.tool.invalidate();
    },
  });
  const [toolName, setToolName] = useState("");
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Link href="/home">HOme</Link>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="flex flex-col items-center gap-2 text-white">
            <p className="text-2xl">
              {helloQuery.isLoading
                ? "Loading tRPC query..."
                : helloQuery.data?.greeting}{" "}
              {helloQuery.data?.date.toLocaleDateString("en-US")}
            </p>
            <ul>
              {getAllQuery.data?.length === 0
                ? "No data yet"
                : getAllQuery.data?.map((item) => (
                    <li key={item.id}>{item?.createdAt.toISOString()}</li>
                  ))}
            </ul>
            <p>{getSecretMessageQuery.data ?? "No message for you"}</p>
            <AuthShowcase />
          </div>
        </div>
        <form
          className="text-white"
          onSubmit={(e) => {
            e.preventDefault();
            toolMutation.mutate({
              data: {
                name: toolName,
                url: `${toolName}.com`,
                description: `This is ${toolName}`,
                image: `https://via.placeholder.com/150`,
                tag: Math.random() > 0.5 ? "APIs" : "Design",
              },
            });
          }}
        >
          <input
            type="text"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            className="text-[royalblue]"
          />
          <button>
            {toolMutation.isLoading ? "Loading..." : "Create Tool"}
          </button>
        </form>
      </main>
    </>
  );
};

export default Home;

export const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  console.log(sessionData);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
