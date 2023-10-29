import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Client } from '../models/client';

export const useClientsStore = defineStore('clients', () => {
  const clients = ref<Client[]>([
    {
      code: 115716,
      officialName: 'Sucursal Marlin Cayo Largo del Sur',
      osdeGroupUnion: 'Test place',
      address: 'Cayo Largo del Sur, Los Canarreos',
      codeREEUP: '256.0.60655',
      nit: '30001501750',
      commercialRegister: 'Marinas',
      staff: {
        executiveStaff: {
          director: {},
          economic: {},
          it: {},
        },
        authorizedPeople: [],
      },
      bankData: {
        bankAccount: '4068 9221 2173 40016',
      },
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
});
