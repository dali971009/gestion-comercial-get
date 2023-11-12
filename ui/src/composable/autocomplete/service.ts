import { ref } from 'vue';
import type { LabelResult } from '@/models/label-result';
import { makeServiceApi } from '@/modules/api/proxy';
import type { AutocompleteFetcher } from '@/composable/autocomplete-fetcher';
import { useSnackBar } from '@/stores';

export function useServiceLabel(): AutocompleteFetcher {
  const items = ref<Array<LabelResult>>([]);
  const loading = ref<boolean>(false);
  const snackbar = useSnackBar();

  async function fetch(search?: string, ids?: Array<number>) {
    try {
      loading.value = true;
      const response = await makeServiceApi().getServiceLabels();
      items.value = response.data.map(it => ({ title: it.description, value: it.id }));
    } catch (e) {
      console.log(e);
      snackbar.push({
        color: 'error',
        text: 'Error cargando los servicios.',
      });
    } finally {
      loading.value = false;
    }
  }

  return { items, fetch, loading };
}
