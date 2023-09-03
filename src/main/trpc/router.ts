import converterRouter from './converters/router';
import electronRouter from './electron/router';
import { router } from './trpc';

export const appRouter = router({
  converter: converterRouter,
  electron: electronRouter,
});

export type AppRouter = typeof appRouter;
