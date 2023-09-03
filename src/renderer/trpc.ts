import { createTRPCReact } from '@trpc/react-query';
// @ts-ignore
import type { AppRouter } from '../main/trpc';
// @ts-check

export const trpcReact = createTRPCReact<AppRouter>();

export default trpcReact;
