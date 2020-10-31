import { tsToGraph } from './ts2graph';

export function index(): Promise<any> {
  return tsToGraph();
};

index();
