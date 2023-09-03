/* eslint-disable no-plusplus */
import { z } from 'zod';

import { loggerMiddleware, publicProcedure, router } from '../trpc';
import { version } from '../../../../package.json';
import { updateRouter } from './update';


export const electronRouter = router({
  version: publicProcedure
    .output(z.string())
    .use(loggerMiddleware)
    .query(() => version),
  getLocale: publicProcedure
    .output(z.string())
    .use(loggerMiddleware)
    .query(({ ctx }) => ctx.app.getLocale()),
  update: updateRouter,
  toggleDevtools: publicProcedure.mutation(({ ctx }) => {
    ctx.window.webContents.toggleDevTools();
  })
})

export default electronRouter;
