import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoLogoGithub } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { useScrollDir } from "../hooks/useScrollDir";

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<Props> = ({ query, setQuery }) => {
  const router = useRouter();
  useScrollDir();
  const { scrollDir } = useScrollDir();

  const inputProps = {
    value: query,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setQuery(e.target.value),
    placeholder: "Search Tools...",
    type: "search",
    className:
      "rounded-full border ml-2 md:ml-8 text-secondary-dark px-4 outline-primary-main",
  };

  const { data: sessionData } = useSession();
  const isAdmin = sessionData?.user.role === "ADMIN";

  return (
    <header
      className={twMerge(
        "fixed top-0 z-10 w-full bg-secondary-main text-white transition-transform duration-300",
        scrollDir === "scrolling down" ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="custom-container flex h-20 items-center justify-between md:h-24">
        <Link href="/" className="text-white">
          <div className="flex cursor-pointer items-center">
            <Image
              className="mt-[1px]"
              src="/white-gear.png"
              width={40}
              height={30}
              alt="logo"
            />
            <h1 className="ml-2 text-3xl font-bold">WebTools</h1>
          </div>
        </Link>
        {router.pathname === "/home" && (
          <input
            {...inputProps}
            className={twMerge(
              inputProps.className,
              "hidden py-[.25rem] md:w-36 2md:block lg:w-52"
            )}
          />
        )}
        <div className="ml-auto mt-[6px] flex">
          {isAdmin && (
            <Link href="/admin">
              <p
                className={twMerge(
                  "link hidden sm:mr-4 2md:block lg:mr-8",
                  router.pathname === "/admin" && "border-b-primary-main"
                )}
              >
                Admin
              </p>
            </Link>
          )}
          <Link href="/bookmarks">
            <p
              className={twMerge(
                "link hidden sm:mr-4 2md:block lg:mr-8",
                router.pathname === "/bookmarks" && "border-b-primary-main"
              )}
            >
              Bookmarks
            </p>
          </Link>
        </div>
        <div className="min-w-[150px] sm:min-w-[200px]">
          {sessionData ? (
            <div>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => void signOut()}
                  className="btn-primary mx-auto mr-4 flex items-center"
                >
                  <p>Log out</p>
                </button>
                <h1 className="mr-4 cursor-default">
                  {sessionData?.user.name}
                </h1>
                <Image
                  className="rounded-full"
                  src={sessionData?.user.image || ""}
                  width={40}
                  height={40}
                  alt="profile"
                />
              </div>
            </div>
          ) : (
            <button
              onClick={() => void signIn()}
              className="btn-primary mx-auto flex items-center"
            >
              <p>Login</p>
              <p className="hidden sm:block">&nbsp;via GitHub</p>
              <IoLogoGithub className="ml-2" size={25} />
            </button>
          )}
        </div>
      </div>
      <div className="mx-6 flex justify-between pb-4 2md:hidden">
        <div className="mt-[3px]">
          <Link href="/bookmarks">
            <p
              className={twMerge(
                "link mr-1 md:mr-8",
                router.pathname === "/bookmarks" && "border-b-primary-main"
              )}
            >
              Bookmarks
            </p>
          </Link>
          {isAdmin && (
            <Link href="/admin">
              <p
                className={twMerge(
                  "link ml-2",
                  router.pathname === "/admin" && "border-b-primary-main"
                )}
              >
                Admin
              </p>
            </Link>
          )}
        </div>
        {router.pathname === "/" && (
          <input
            {...inputProps}
            className={twMerge(
              inputProps.className,
              "w-40 py-[.25rem] sm:w-52"
            )}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
