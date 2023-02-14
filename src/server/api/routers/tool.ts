import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const toolRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tool.findMany();
  }),

  create: protectedProcedure
    .input(
      z.object({
        data: z.object({
          name: z.string(),
          description: z.string(),
          url: z.string(),
          image: z.string(),
          // tags: z.array(z.string()),
          // bookmarked: z.boolean(),
        }),
      })
    )
    .mutation(async ({ ctx, input: { data } }) => {
      const tool = await ctx.prisma.tool.create({
        data,
      });
      return tool;
    }),
});
