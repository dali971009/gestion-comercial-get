import { ref } from 'vue';
import type { LabelResult } from '@/models/label-result';
import { makeServiceTypeApi } from '@/modules/api/proxy';
import type { AutocompleteFetcher } from '@/composable/autocomplete-fetcher';
import { useSnackBar } from '@/stores';

export function useServiceTypeLabel(): AutocompleteFetcher {
  const items = ref<Array<LabelResult>>([]);
  const loading = ref<boolean>(false);
  const snackbar = useSnackBar();

  async function fetch(search?: string, ids?: Array<number>) {
    try {
      loading.value = true;
      const response = await makeServiceTypeApi().getServiceTypeLabels();
      items.value = response.data;
    } catch (e) {
      console.log(e);
      snackbar.push({
        color: 'error',
        text: 'Error cargando los tipos de servicio advertisers.',
      });
    } finally {
      loading.value = false;
    }
  }

  return { items, fetch, loading };
}
