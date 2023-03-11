import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoLogoGithub } from "react-icons/io5";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { useScrollDir } from "../hooks/useScrollDir";

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  shouldBeBookmarked: boolean;
  setShouldBeBookmarked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({
  query,
  setQuery,
  shouldBeBookmarked,
  setShouldBeBookmarked,
}) => {
  const router = useRouter();
  useScrollDir();
  const { scrollDir } = useScrollDir();

  const inputProps = {
    value: query,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setQuery(e.target.value),
    placeholder: `Search ${shouldBeBookmarked ? "Bookmarked" : "All"} Tools...`,
    type: "search",
    className:
      "rounded-full border ml-2 md:ml-8 text-secondary-dark px-4 outline-primary-main",
  };

  const { data: sessionData } = useSession();
  const isAdmin = sessionData?.user.role === "ADMIN";

  console.log(shouldBeBookmarked);
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
        {router.pathname === "/" && (
          <input
            {...inputProps}
            className={twMerge(
              inputProps.className,
              "hidden py-[.25rem] transition-all md:w-36 2md:block lg:w-60 lg:focus:w-80"
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
          <button
            className={twMerge(
              "link mr-4 hidden 2md:block",
              shouldBeBookmarked && "!border-b-primary-main"
            )}
            onClick={() => {
              setShouldBeBookmarked(!shouldBeBookmarked);
              toast.info(
                `Search on ${shouldBeBookmarked ? "all" : "bookmarked"} tools`
              );
            }}
          >
            Bookmark
          </button>
        </div>
        <div className="min-w-[150px] sm:min-w-[200px]">
          {sessionData ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="mx-auto flex cursor-pointer items-center justify-center">
                  <h1 className="mr-4">{sessionData?.user.name}</h1>
                  <Image
                    className="rounded-full"
                    src={sessionData?.user.image || ""}
                    width={40}
                    height={40}
                    alt="profile"
                  />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  sideOffset={20}
                  align="end"
                  side="bottom"
                  className={twMerge(
                    `min-w-220 rounded-6 animate-duration-400 animate-ease-out
                  ml-auto w-8/12 transform space-y-4 rounded-b-lg bg-white p-5 px-4 opacity-100
                  shadow-md data-[side='bottom']:animate-slideDownAndFade`
                  )}
                >
                  <DropdownMenu.Item className="select-none text-sm outline-none">
                    <p className="mr-4">
                      Logged in as {sessionData?.user.email}
                    </p>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="select-none text-sm outline-none">
                    <button
                      onClick={() => void signOut()}
                      className="btn-primary"
                    >
                      <p>Log out</p>
                    </button>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
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
          <button
            className={twMerge(
              "link mr-4 hidden 2md:block",
              shouldBeBookmarked && "!border-b-primary-main"
            )}
            onClick={() => {
              setShouldBeBookmarked(!shouldBeBookmarked);
              toast.info(
                `Search on ${shouldBeBookmarked ? "all" : "bookmarked"} tools`
              );
            }}
          >
            Bookmark
          </button>
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
