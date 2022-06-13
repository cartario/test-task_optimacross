export type RawContent = {
  parentEntityLongIds: Array<number>,
  labels:  Array<string>,
  entityLongIds: Array<number>,
  entityLongIdsMap: Record<number, number>
}

export interface OptimaState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
  content: RawContent;
  items: Record<any, any> | null,
  currentItem: Record<string, number | string> | null
}