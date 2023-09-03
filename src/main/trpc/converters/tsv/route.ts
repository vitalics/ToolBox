/* eslint-disable no-plusplus */
import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { CSVSchema, TSVSchema } from '../../schemas';

export const tsvRoutes = router({
  toCsv: publicProcedure
    .input(TSVSchema)
    .output(CSVSchema)
    .query(async ({ input }) => {
      // Split the TSV string into lines
      const lines = input.trim().split('\n');

      // Convert tab-separated values to comma-separated values
      const csvLines = lines.map(line => line.split('\t').join(','));

      // Join the lines back into a CSV string
      return csvLines.join('\n');
    }),
  toJson: publicProcedure
    .input(TSVSchema)
    .output(z.array(z.record(z.string())))
    .query(async ({ input }) => {
      const lines = input.trim().split('\n');
      const headers = lines[0].split('\t');
      const result: Record<string, string>[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split('\t');
        const obj: Record<string, string> = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = values[j];
        }
        result.push(obj);
      }

      return result;
    })
})

export default tsvRoutes;
