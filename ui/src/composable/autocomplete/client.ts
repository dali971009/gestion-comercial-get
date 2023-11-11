import { ref } from 'vue';
import type { LabelResult } from '@/models/label-result';
import { makeClientApi } from '@/modules/api/proxy';
import type { AutocompleteFetcher } from '@/composable/autocomplete-fetcher';
import { useSnackBar } from '@/stores';

export function useClientLabel(): AutocompleteFetcher {
  const items = ref<Array<LabelResult>>([]);
  const loading = ref<boolean>(false);
  const snackbar = useSnackBar();

  async function fetch(search?: string, ids?: Array<number>) {
    try {
      loading.value = true;
      const response = await makeClientApi().getClientLabels();
      items.value = response.data;
    } catch (e) {
      console.log(e);
      snackbar.push({
        color: 'error',
        text: 'Error cargando los clientes.',
      });
    } finally {
      loading.value = false;
    }
  }

  return { items, fetch, loading };
}
