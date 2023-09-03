import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { CSVSchema, TSVSchema } from '../../schemas';

function jsonToSeparatedValues(jsonArray: Record<string, any>[], delimiter: ',' | '\t') {
  const headers = Object.keys(jsonArray[0]).join(delimiter);
  const rows = jsonArray.map(obj => Object.values(obj).join(delimiter));
  return `${headers}\n${rows.join('\n')}`;
}

export const jsonRoutes = router({
  toCsv: publicProcedure
    .input(z.array(z.record(z.any())))
    .output(CSVSchema)
    .query(async ({ input }) => jsonToSeparatedValues(input, ',')),
  toTsv: publicProcedure
    .input(z.array(z.record(z.any())))
    .output(TSVSchema)
    .query(async ({ input }) => jsonToSeparatedValues(input, '\t'))
})

export default jsonRoutes;

