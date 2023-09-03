
import { autoUpdater } from 'electron-updater'
import { observable } from '@trpc/server/observable';

import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

const SettingsSchema = z.object({
  autoDownload: z.boolean(),
  disableWebInstaller: z.boolean(),
  allowDowngrade: z.boolean(),
})

export const updateRouter = router({
  setSettings: publicProcedure
    .input(SettingsSchema.strip())
    .mutation(async ({ input }) => {
      autoUpdater.autoDownload = input.autoDownload;
      autoUpdater.disableWebInstaller = input.disableWebInstaller;
      autoUpdater.allowDowngrade = input.allowDowngrade;
    }),
  getSettings: publicProcedure
    .output(SettingsSchema)
    .query(() => ({
      autoDownload: autoUpdater.autoDownload,
      disableWebInstaller: autoUpdater.disableWebInstaller,
      allowDowngrade: autoUpdater.allowDowngrade,
    })),
  checkUpdate: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.app.isPackaged) {
      throw new Error('The update feature is only available after the package.');
    }
    try {
      return await autoUpdater.checkForUpdatesAndNotify()
    } catch (error) {
      throw new Error(`Network error`, { cause: error })
    }
  }),

  onDownload: publicProcedure.subscription(() => observable(emit => {
    autoUpdater.on('download-progress', emit.next)
    autoUpdater.on('error', emit.error)
    autoUpdater.on('update-downloaded', emit.complete)
    autoUpdater.downloadUpdate();

    return () => {
      autoUpdater.off('download-progress', emit.next);
      autoUpdater.off('error', emit.error);
      autoUpdater.off('update-downloaded', emit.complete);
    }
  })),

  quitAndInstall: publicProcedure.mutation(() => {
    autoUpdater.quitAndInstall(false, true)
  }),

  available: publicProcedure.subscription(({ ctx }) => observable(emit => {
    const onAvailable = (available: boolean) => (arg: any) => {
      emit.next({ update: available, version: ctx.app.getVersion(), newVersion: arg?.version })
    }
    const available = onAvailable(true);
    const notAvailable = onAvailable(false);
    // update available
    autoUpdater.on('update-available', available);
    // update not available
    autoUpdater.on('update-not-available', notAvailable);

    return () => {
      // update available
      autoUpdater.off('update-available', available);
      // update not available
      autoUpdater.off('update-not-available', notAvailable);
    }
  }))
})

export default updateRouter;
