import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import {
  IoBookmark,
  IoBookmarkOutline,
  IoChevronForward,
} from "react-icons/io5";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";
import Layout from "../components/Layout";
import { api } from "../utils/api";
import type { tagEnum } from "../utils/constants";
import { tags } from "../utils/constants";
import { formatDate } from "../utils/helpers/formateDate";

const Home: NextPage = () => {
  type Tag = z.infer<typeof tagEnum>;

  const [tag, setTag] = useState<Tag>("All");
  const [query, setQuery] = useState("");
  const [shouldBeBookmarked, setShouldBeBookmarked] = useState(false);

  const [fade, setFade] = useState(false);

  const toolsQuery = api.tool.getAll.useInfiniteQuery(
    {
      limit: 3,
      query: query,
      tag,
      bookmarked: shouldBeBookmarked ? true : undefined,
    },
    {
      getNextPageParam: (lastPage) => lastPage.info.next ?? undefined,
      refetchOnWindowFocus: false,
    }
  );

  const context = api.useContext();

  const toolUpdateMutation = api.tool.update.useMutation();

  return (
    <Layout
      title="Web Tools"
      query={query}
      setQuery={setQuery}
      shouldBeBookmarked={shouldBeBookmarked}
      setShouldBeBookmarked={setShouldBeBookmarked}
    >
      <div className="mt-12 mb-6 text-[2.5rem] sm:mt-28 sm:mb-16 sm:text-6xl">
        {toolsQuery.isError ? (
          <h1 className="font-bold capitalize text-red-500">
            {toolsQuery.error.message}
          </h1>
        ) : (
          <h1 className="flex gap-3 font-bold capitalize text-secondary-main/90">
            {shouldBeBookmarked && <IoBookmark />}
            {toolsQuery.isFetching ? (
              "Updating"
            ) : query ? (
              <span
                style={{
                  textTransform: "initial",
                }}
              >
                Results for {query}
              </span>
            ) : (
              `${tag} Tools`
            )}
          </h1>
        )}
      </div>
      {toolsQuery.isError ? null : (
        <>
          <div className="tags flex h-12 max-w-full overflow-x-scroll">
            {tags.map((t) => (
              <button
                key={t}
                className={twMerge(
                  "mx-3 min-w-fit text-[17px] text-neutral-dark transition-all hover:border-b-2 hover:border-b-primary-main",
                  t === tag && "border-b-2 border-b-primary-main"
                )}
                onClick={() => {
                  console.log({ t });
                  setFade(false);
                  setTag(t);
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-8 pb-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {toolsQuery.data?.pages[0]?.info.count === 0 ? (
              <h1 className="w-max text-3xl">
                No tools found. Try searching for something else.
              </h1>
            ) : (
              toolsQuery.data?.pages.map((page) => (
                <Fragment key={page.info.next}>
                  {page.tools.map((tool, i) => (
                    <div
                      key={tool.id}
                      className={twMerge(
                        "flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-cart md:w-full",
                        fade && page.info.prev ? "animate-fade" : ""
                      )}
                      style={{
                        // Safari hack to fix border radius bug around images
                        WebkitBackfaceVisibility: "hidden",
                        MozBackfaceVisibility: "hidden",
                        WebkitTransform: "translate3d(0, 0, 0)",
                        // @ts-expect-error - this is a valid property
                        MozTransform: "translate3d(0, 0, 0)",
                      }}
                    >
                      <div>
                        <div className="relative h-[192px] overflow-hidden">
                          <Image
                            src={`https://random.imagecdn.app/500/${i + 5}50/`}
                            alt={tool.name}
                            className="object-cover transition duration-300 hover:scale-125"
                            fill
                          />
                        </div>
                        <div className="px-6">
                          <div className="flex items-center justify-between text-secondary-main opacity-[.4]">
                            <p className="my-4">{formatDate(tool.createdAt)}</p>
                            <button>
                              {tool.bookmarked ? (
                                <IoBookmark
                                  size={22}
                                  className="animate-bookmark cursor-pointer"
                                  onClick={() => {
                                    toolUpdateMutation.mutate(
                                      {
                                        id: tool.id,
                                        data: {
                                          bookmarked: false,
                                        },
                                      },
                                      {
                                        onSuccess: () => {
                                          void context.tool.invalidate();
                                          toast.success(
                                            "Removed from bookmarks"
                                          );
                                        },
                                        onError: (err) => {
                                          toast.error(err.message);
                                        },
                                      }
                                    );
                                  }}
                                />
                              ) : (
                                <IoBookmarkOutline
                                  size={22}
                                  className="animate-bookmark cursor-pointer"
                                  onClick={() => {
                                    toolUpdateMutation.mutate(
                                      {
                                        id: tool.id,
                                        data: {
                                          bookmarked: true,
                                        },
                                      },
                                      {
                                        onSuccess: () => {
                                          void context.tool.invalidate();
                                          toast.success("Added to bookmarks");
                                        },
                                        onError: (err) => {
                                          toast.error(err.message);
                                        },
                                      }
                                    );
                                  }}
                                />
                              )}
                            </button>
                          </div>
                          <h2
                            id={tool.id}
                            className="mb-4 text-2xl font-semibold transition-colors"
                            style={{
                              scrollMarginTop: "700px",
                            }}
                          >
                            <Link href={tool.id}>{tool.name}</Link>
                          </h2>
                          <p className="mb-4 max-h-[70px] min-h-[70px] overflow-hidden text-ellipsis whitespace-normal text-secondary-main">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                      <Link
                        target="_blank"
                        href={tool.url}
                        rel="noreferrer"
                        className="btn-primary m-6 mt-0 flex max-w-fit items-center"
                      >
                        Learn more
                        <IoChevronForward size={18} className="ml-2" />
                      </Link>
                    </div>
                  ))}
                </Fragment>
              ))
            )}
          </div>
          {toolsQuery.hasNextPage && (
            <button
              onClick={() => {
                void toolsQuery.fetchNextPage();
                setFade(true);
              }}
              className="btn-secondary mx-auto mb-8 mt-8 flex"
            >
              {toolsQuery.isFetching ? "Fetching" : "More"}
            </button>
          )}
        </>
      )}
    </Layout>
  );
};

// export async function getStaticProps() {
//   const [tags, toolsData] = await Promise.all([
//     apiClient<string[]>({
//       url: "/tags",
//     }),
//     apiClient<ToolsData>({
//       url: "/tools",
//       params: {
//         limit,
//       },
//     }),
//   ]).catch((err) => {
//     console.error("server side", err);

//     return [[], { tools: [], info: {} }];
//   });

//   return {
//     props: {
//       data: {
//         tags,
//         toolsData,
//       },
//     },
//   };
// }

export default Home;
