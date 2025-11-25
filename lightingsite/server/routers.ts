import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getProducts, getFeaturedProducts, getProductById, getCategories, getCategoryById, createContactSubmission } from "./db";

const listProductsInput = z.object({ 
  categoryId: z.number().optional(), 
  limit: z.number().default(20), 
  offset: z.number().default(0) 
}).optional();

const featuredProductsInput = z.object({ 
  limit: z.number().default(6) 
}).optional();

const getProductByIdInput = z.object({ 
  id: z.number() 
});

const getCategoryByIdInput = z.object({ 
  id: z.number() 
});

const contactSubmitInput = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    list: publicProcedure
      .input(listProductsInput)
      .query(async ({ input }) => {
        const categoryId = input?.categoryId;
        const limit = input?.limit ?? 20;
        const offset = input?.offset ?? 0;
        return getProducts(categoryId, limit, offset);
      }),
    featured: publicProcedure
      .input(featuredProductsInput)
      .query(async ({ input }) => {
        return getFeaturedProducts(input?.limit || 6);
      }),
    byId: publicProcedure
      .input(getProductByIdInput)
      .query(async ({ input }) => {
        return getProductById(input.id);
      }),
  }),

  categories: router({
    list: publicProcedure.query(async () => {
      return getCategories();
    }),
    byId: publicProcedure
      .input(getCategoryByIdInput)
      .query(async ({ input }) => {
        return getCategoryById(input.id);
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(contactSubmitInput)
      .mutation(async ({ input }) => {
        try {
          await createContactSubmission(input);
          return { success: true };
        } catch (error) {
          console.error("Failed to submit contact form:", error);
          return { success: false };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
