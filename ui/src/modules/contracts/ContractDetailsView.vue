<template>
  <page-view title="Añadir contrato" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" style="color: white" @click="handleSave(false)" rounded>
        <v-icon icon="mdi-check" class="mr-2" />
        Guardar
      </v-btn>
      <v-btn v-if="contract.isPreform" class="text-subtitle-1 ml-2" color="success" @click="handleSave(true)" rounded>
        <v-icon icon="mdi-check" class="mr-2" />
        Crear contrato
      </v-btn>
    </template>
    <contract-form v-model="contract" :edit="edit" :error-handler="errorHandler" />
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import { onMounted, ref, watch } from 'vue';
import RouteNames from '@/router/route-names';
import { useRoute, useRouter } from 'vue-router';
import type { Contract } from '@/models/contract';
import ContractForm from './ContractForm.vue';
import { makeContractApi } from '@/modules/api/proxy';
import { isArray } from 'lodash';
import { useSnackBar } from '@/stores';
import { AxiosError } from 'axios';
import { messages } from '@/helpers/messages';
import { useErrorHandler } from '@/helpers/errors/error-handler';
import moment from 'moment';
import contracts from '@/modules/api/contracts';

const breadcrumb = useBreadCrumb();
const snackbar = useSnackBar();
const route = useRoute();
const router = useRouter();

const edit = route.name === RouteNames.CONTRACT_EDIT;
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

async function handleSave(isCreatingContract: boolean = false) {
  try {
    if (edit) {
      await makeContractApi().updateContract({
        contract: { ...contract.value, isPreform: isCreatingContract ? false : contract.value.isPreform },
      });
      snackbar.push({ color: 'error', text: 'Se han actualizado los datos del contrato' });
    } else {
      await makeContractApi().createContract({
        contract: { ...contract.value, isPreform: isCreatingContract ? false : contract.value.isPreform },
      });
      snackbar.push({ color: 'error', text: 'Se ha creado un nuevo contrato' });
    }
    router.push({ name: RouteNames.CONTRACT_LIST });
  } catch (error: any) {
    if (!errorHandler.handleErrorResponse(error)) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        snackbarStore.push({
          color: 'error',
          text: `Ocurrió un error ${edit ? 'actualizando' : 'creando'} el contrato`,
        });
        snackbarStore.push({ color: 'error', text: messages.AUTH.WRONG_CREDENTIALS });
      } else {
        snackbarStore.push({ color: 'error', text: error });
      }
      console.error(error);
    }
  }
}

watch(contract, newValue => {
  breadcrumb.set({
    back: { name: RouteNames.CONTRACT_LIST },
    backLabel: 'Contratos',
    title: !newValue.isPreform ? 'Crear suplemento' : edit ? 'Editar contrato' : 'Añadir contrato',
  });
});

onMounted(() => {
  if (edit) {
    fetchContract();
  }
  breadcrumb.set({
    back: { name: RouteNames.CONTRACT_LIST },
    backLabel: 'Contratos',
    title: !contract.value.isPreform ? 'Crear suplemento' : edit ? 'Editar contrato' : 'Añadir contrato',
  });
});
</script>

<style scoped></style>
