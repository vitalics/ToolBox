import { router } from '../trpc';
import { jsonRoutes } from './json/router';
import { csvRoutes } from './csv/router';
import { tsvRoutes } from './tsv/route';

export const converterRouter = router({
  json: jsonRoutes,
  csv: csvRoutes,
  tsv: tsvRoutes,
});

export default converterRouter;
