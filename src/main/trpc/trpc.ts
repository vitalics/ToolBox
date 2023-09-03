import * as trpc from "@trpc/server";


import type { Context } from './context';

export type { Context } from './context'
export type { AppRouter } from './router';

export const t = trpc.initTRPC
  .context<Context>()
  .create();

export const { middleware, router } = t;

export const publicProcedure = t.procedure;

export const loggerMiddleware = middleware(async ({ ctx, input, meta, next, path }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;

  if (result.ok) {
    ctx.log.verbose(`=> TRPC.\n Path: [${path}]\n Duration: ${durationMs} ms.\n Input: {${JSON.stringify(input)}}. \n Meta: {${meta}}\n Result: {${JSON.stringify(result.data)}}\n`);
  } else {
    ctx.log.error(`TRPC. \n path: [${path}]\n Duration: ${durationMs} ms.\n Input: {${input}}. \n Meta: {${meta}}`);
  }
  return result;
});

publicProcedure.use(loggerMiddleware);
