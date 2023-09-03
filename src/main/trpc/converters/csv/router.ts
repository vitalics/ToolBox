/* eslint-disable no-plusplus */
import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { CSVSchema, TSVSchema } from '../../schemas';


export const csvRoutes = router({
  toJson: publicProcedure
    .input(CSVSchema)
    .output(z.array(z.record(z.string())))
    .query(async ({ input }) => {
      const lines = input.split('\n');
      const headers = lines[0].split(',');
      const result: Record<string, string>[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const obj: Record<string, string> = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = values[j];
        }
        result.push(obj);
      }

      return result;
    }),
  toTsv: publicProcedure
    .input(CSVSchema)
    .output(TSVSchema)
    .query(async ({ input }) => {
      // Split the CSV string into lines
      const lines = input.trim().split('\n');

      // Convert comma-separated values to tab-separated values
      const tsvLines = lines.map(line => line.split(',').join('\t'));

      // Join the lines back into a TSV string
      return tsvLines.join('\n');
    })
});
export default csvRoutes;
