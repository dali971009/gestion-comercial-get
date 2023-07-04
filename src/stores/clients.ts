import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {Client} from "@/models/client";

export const useClientsStore = defineStore('clients', () => {
  const clients = ref<Client[]>([
    {
      code: 1425879,
      officialName: 'Test client',
      osdeGroupUnion: 'Test place',
      address: 'Czda de San Miguel del Padron e/ Calle 1 y Calle A',
      codeREEUP: '123443242',
      nit: '22342332432',
      staff: {
        executiveStaff: {
          director: {},
          economic: {},
          it: {},
        },
        authorizedPeople: [],
      },
      bankData: {}
    },
  ]);

  function addClient(client: Client) {
    clients.value.push(client);
  }

  function updateClient(code: number, client: Client) {
    const index = clients.value.findIndex(element => element.code && element.code === code);
    clients.value[index] = client;
  }

  function loadClient(code: number): Client | undefined {
    return clients.value.find(client => client.code === code);
  }

  return { clients, addClient, updateClient, loadClient };
})
