<template>
  <page-view title="Añadir cliente" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" style="color: white" @click="handleSave" rounded>
        <v-icon icon="mdi-check" class="mr-2" />
        Guardar
      </v-btn>
    </template>
    <v-sheet class="mb-2" border>
      <v-tabs v-model="selectedTab">
        <v-tab :value="ClientTab.GENERAL">General</v-tab>
        <v-tab :value="ClientTab.CONTACTS">Contactos</v-tab>
        <v-tab :value="ClientTab.BANK">Datos bancarios</v-tab>
      </v-tabs>
      <v-divider />
      <v-window v-model="selectedTab">
        <v-window-item :value="ClientTab.GENERAL">
          <client-general-form v-model="client" />
        </v-window-item>
        <v-window-item :value="ClientTab.CONTACTS">
          <client-contacts-form v-model="client" />
        </v-window-item>
        <v-window-item :value="ClientTab.BANK">
          <client-bank-form v-model="client" />
        </v-window-item>
      </v-window>
    </v-sheet>
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue'
import CustomLabeledContainer from '@/components/CustomLabeledContainer.vue'
import { useBreadCrumb } from '@/stores/breadcrumb'
import { onMounted, ref } from 'vue'
import { RouteNames } from '@/router/route-names'
import { useRoute } from 'vue-router'
import type { Client } from '@/models/client'
import { useClientsStore } from '@/stores/clients'
import router from '@/router'
import { ClientTab } from '@/modules/clients/tabs'
import ClientGeneralForm from '@/modules/clients/forms/ClientGeneralForm.vue'
import ClientContactsForm from '@/modules/clients/forms/ClientContactsForm.vue'
import ClientBankForm from '@/modules/clients/forms/ClientBankForm.vue'

const breadcrumb = useBreadCrumb()
const route = useRoute()
const clientsStore = useClientsStore()

const selectedTab = ref<ClientTab>(ClientTab.GENERAL)

const edit = route.name === RouteNames.CLIENT_EDIT
const clientCode = parseInt(route.params.client_code?.toString() ?? '')

const client = ref<Client>({
  staff: {
    executiveStaff: {
      director: {},
      economic: {},
      it: {}
    },
    authorizedPeople: []
  },
  bankData: {}
})

function loadClient() {
  client.value = clientsStore.loadClient(clientCode)
}

function handleSave() {
  if (edit) {
    clientsStore.updateClient(clientCode, client.value)
  } else {
    clientsStore.addClient(client.value)
  }
  router.push({ name: RouteNames.CLIENT_LIST })
}

onMounted(() => {
  if (edit) {
    loadClient()
  }
  breadcrumb.set({
    back: { name: RouteNames.CLIENT_LIST },
    backLabel: 'Clientes',
    title: edit ? 'Editar cliente' : 'Añadir cliente'
  })
})
</script>

<style scoped></style>
