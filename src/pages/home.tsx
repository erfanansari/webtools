import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import {
  IoBookmark,
  IoBookmarkOutline,
  IoChevronForward,
} from "react-icons/io5";
import { twJoin } from "tailwind-merge";
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
  // const noTag = tag === "All";
  // const noQuery = query === "";

  const [fade, setFade] = useState(false);

  //   const toolsQuery = useInfiniteQuery<ToolsData, ClientError>(
  //     ["tools", ...(noTag ? [] : [tag]), ...(noQuery ? [] : [query])],
  //     ({ pageParam = 1, signal }) =>
  //       apiClient({
  //         url: `/tools`,
  //         params: {
  //           page: pageParam,
  //           limit,
  //           ...(noQuery ? {} : { query }),
  //           ...(noTag ? {} : { tag }),
  //         },
  //         signal,
  //       }),
  //     {
  //       getNextPageParam: (lastPage) => lastPage.info.next ?? undefined,
  //       initialData: {
  //         pages: [props.data.toolsData],
  //         pageParams: [1],
  //       },
  //       refetchOnWindowFocus: false,
  //     }
  //   );

  const toolsQuery = api.tool.getAll.useInfiniteQuery(
    {
      // limit: tag ? 5 : 3,
      limit: 3,
      query: query,
      tag,
    },
    {
      getNextPageParam: (lastPage) => lastPage.info.next ?? undefined,
      refetchOnWindowFocus: false,
    }
  );

  const [bookmarked, setBookmarked] = useState(false);

  const bookmarkIconProps = {
    size: 22,
    className: `cursor-pointer animate-bookmark`,
    onClick: () => setBookmarked(!bookmarked),
  };

  return (
    <Layout title="Web Tools" query={query} setQuery={setQuery}>
      <div className="mt-12 mb-6 text-[2.5rem] sm:mt-28 sm:mb-16 sm:text-6xl">
        {toolsQuery.isError ? (
          <h1 className="font-bold capitalize text-red-500">
            {toolsQuery.error.message}
          </h1>
        ) : (
          <h1 className="font-bold capitalize text-secondary-main">
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
                className={twJoin(
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
            {toolsQuery.data?.pages.map((page) => (
              <Fragment key={page.info.next}>
                {page.tools.map((tool, i) => (
                  <div
                    key={tool.id}
                    className={[
                      "flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-cart md:w-full",
                      fade && page.info.prev ? "animate-fade" : "",
                    ].join(" ")}
                    style={{
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
                          {bookmarked ? (
                            <IoBookmark {...bookmarkIconProps} />
                          ) : (
                            <IoBookmarkOutline {...bookmarkIconProps} />
                          )}
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
                          {tool.description}
                          {tool.description}
                          {tool.description}
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary m-6 mt-0 flex max-w-fit items-center"
                    >
                      Learn more
                      <IoChevronForward size={18} className="ml-2" />
                    </a>
                  </div>
                ))}
              </Fragment>
            ))}
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
