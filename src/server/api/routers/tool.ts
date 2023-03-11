import { z } from "zod";
import { tagEnum } from "../../../utils/constants";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const toolRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
        query: z.string().nullish(),
        bookmarked: z.boolean().nullish(),
        tag: tagEnum,
      })
    )
    .query(({ ctx, input }) => {
      const limit = input?.limit ?? 10;
      const cursor = input?.cursor ?? 1;

      const skip = (cursor - 1) * limit;

      const where = {
        name: {
          contains: input?.query ?? "",
        },
        tag: {
          equals: input?.tag === "All" ? undefined : input?.tag ?? "",
        },
        bookmarked: {
          equals: input?.bookmarked ?? undefined,
        },
      };
      const tools = ctx.prisma.tool.findMany({
        take: limit,
        skip,
        where,
        orderBy: { id: "asc" },
      });

      const count = ctx.prisma.tool.count({
        where,
      });

      return Promise.all([tools, count]).then(([tools, count]) => ({
        tools,
        info: {
          count,
          pages: Math.ceil(count / limit),
          next: count - skip > limit ? cursor + 1 : null,
          prev: cursor > 1 ? cursor - 1 : null,
        },
      }));
    }),

  create: protectedProcedure
    .input(
      z.object({
        data: z.object({
          name: z.string(),
          description: z.string(),
          url: z.string(),
          image: z.string(),
          tag: tagEnum,
          bookmarked: z.boolean().nullish(),
        }),
      })
    )
    .mutation(async ({ ctx, input: { data } }) => {
      const tool = await ctx.prisma.tool.create({
        data,
      });
      return tool;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          bookmarked: z.boolean(),
        }),
      })
    )
    .mutation(async ({ ctx, input: { id, data } }) => {
      const tool = await ctx.prisma.tool.update({
        where: {
          id,
        },
        data,
      });
      return tool;
    }),
});
