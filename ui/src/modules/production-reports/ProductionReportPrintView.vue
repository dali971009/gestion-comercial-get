<template>
  <page-view :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" style="color: white" @click="generatePDF" rounded>
        <v-icon icon="mdi-printer" class="mr-2" />
        Imprimir
      </v-btn>
    </template>
    <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="600"></iframe>
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import { onMounted, ref } from 'vue';
import RouteNames from '@/router/route-names';
import { useRoute, useRouter } from 'vue-router';
import type { Contract } from '@/models/contract';
import { ContractType } from '@/models/contract';
import { makeContractApi } from '@/modules/api/proxy';
import { isArray } from 'lodash';
import { useSnackBar } from '@/stores';
import { useErrorHandler } from '@/helpers/errors/error-handler';

const breadcrumb = useBreadCrumb();
const route = useRoute();

const pdfUrl = ref<string>();

const contractId = isArray(route.params.id) ? route.params.id[0] : route.params.id;

const contract = ref<Contract>({
  id: '',
  isPreform: true,
  oldVersions: [],
});

const errorHandler = useErrorHandler();
const snackbarStore = useSnackBar();

async function fetchContract() {
  try {
    const response = await makeContractApi().getContract({ id: contractId });
    contract.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

async function generatePDF() {
  const response = await makeContractApi().printContract({ id: contractId });
  pdfUrl.value = response.data;
}

onMounted(() => {
  fetchContract();
  breadcrumb.set({
    back: { name: RouteNames.CONTRACT_LIST },
    backLabel: 'Contratos',
    title: 'Imprimir contrato',
  });
});
</script>

<style scoped></style>
