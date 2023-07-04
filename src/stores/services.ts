import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {ServiceGroup} from "@/models/service";
import {InvoiceFrequency} from "@/models/service";

export const useServicesStore = defineStore('services', () => {
    const serviceGroups = ref<ServiceGroup[]>([
        {
            name: 'TXD',
            services: [
                {
                    id: 1,
                    description: 'Conmutado ( Una (1) Cuenta de Correo)',
                    um: 'Enlaces x Mes',
                    price: 197.88,
                    category: 'Servicios de transmisión de datos',
                },
                {
                    id: 2,
                    description: 'Conmutado (Servidor de Correo)',
                    um: 'Enlaces x Mes',
                    price: 247.35,
                    category: 'Servicios de transmisión de datos',
                },
                {
                    id: 3,
                    description: 'Sobre redes propias',
                    um: 'Enlaces x Mes',
                    price: 1131.99,
                    category: 'Servicios de transmisión de datos',
                },
                {
                    id: 4,
                    description: ' Sobre linea arrendada (64 Kbps)',
                    um: 'Enlaces x Mes',
                    price: 420.00,
                    category: 'Servicios de transmisión de datos',
                    subcategory: 'TxD L/A Navegación y Correo Nacional e Internacional',
                    invoiceFrequency: InvoiceFrequency.MONTHLY,
                },
            ]
        },
        {
            name: 'Salva digital',
            services: []
        }
    ]);

    return {serviceGroups};
})
