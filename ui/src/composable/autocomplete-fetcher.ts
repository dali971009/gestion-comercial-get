import type { ComputedRef } from 'vue';
import type { LabelResult } from '@/models/label-result';

export interface AutocompleteFetcher {
  items: ComputedRef<LabelResult[]>;
  fetch(): Promise<void>;
  loading: ComputedRef<boolean>;
}
