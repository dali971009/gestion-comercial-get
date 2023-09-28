import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ServiceGroup } from '../models/service'
import { InvoiceFrequency } from '../models/service'

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
          category: 'Servicios de transmisión de datos'
        },
        {
          id: 2,
          description: 'Conmutado (Servidor de Correo)',
          um: 'Enlaces x Mes',
          price: 247.35,
          category: 'Servicios de transmisión de datos'
        },
        {
          id: 3,
          description: 'Sobre redes propias',
          um: 'Enlaces x Mes',
          price: 1131.99,
          category: 'Servicios de transmisión de datos'
        },
        {
          id: 4,
          description: ' Sobre linea arrendada (64 Kbps)',
          um: 'Enlaces x Mes',
          price: 420.0,
          category: 'Servicios de transmisión de datos',
          subcategory: 'TxD L/A Navegación y Correo Nacional e Internacional',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        }
      ]
    },
    {
      name: 'Salva digital',
      descriptionLabel: 'Capacidad de almacenamiento',
      services: [
        {
          id: 5,
          description: 'Hasta  10 GB',
          um: 'GB',
          price: 70.0,
          category: 'Servicios de salva de información dígital',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 6,
          description: 'Más de 10GB y hasta 20 GB',
          um: 'GB',
          price: 140.0,
          category: 'Servicios de salva de información dígital',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 7,
          description: 'Más de 20 GBy hasta 60 GB',
          um: 'GB',
          price: 406.0,
          category: 'Servicios de salva de información dígital',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 8,
          description: 'Más de 60 GB y hasta 100 GB',
          um: 'GB',
          price: 665.0,
          category: 'Servicios de salva de información dígital',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 9,
          description: 'Más de 100 y hasta 200 GB',
          um: 'GB',
          price: 1330.0,
          category: 'Servicios de salva de información dígital',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 10,
          description: 'Más de 200 GB y hasta 500 GB',
          um: 'GB',
          price: 3325.0,
          category: 'Servicios de salva de información dígital',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 11,
          description: 'Más de 500GB y hasta 1 TB',
          um: 'GB',
          price: 6790.0,
          category: 'Servicios de salva de información dígital',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        }
      ]
    },
    {
      name: 'Hospedaje',
      services: [
        {
          id: 12,
          description: 'INSTALACIÓN Y ACTIVACIÓN DEL SERVIDOR VPS (CUOTA ÚNICA)',
          price: 538.92,
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 13,
          description:
            'HOSPEDAJE DE SERVIDOR VIRTUAL DEDICADO (TARIFA IGUAL AL 15% CONFIGURACIÓN VPS)',
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 14,
          description: '1 GB MEMORIA RAM',
          um: 'GB',
          price: 84.0,
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          subcategory: 'CONFIGURACIÓN DE VPS',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 15,
          description: '1MICROPROCESADOR (CPU VIRTUAL)',
          um: 'U',
          price: 84.0,
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          subcategory: 'CONFIGURACIÓN DE VPS',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 16,
          description: '1 INTERFACE DE RED',
          um: 'INTERFACE',
          price: 49.0,
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          subcategory: 'CONFIGURACIÓN DE VPS',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 17,
          description: 'IP REAL',
          um: 'U',
          price: 7.0,
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          subcategory: 'CONFIGURACIÓN DE VPS',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 18,
          description: 'HDD 10 GB',
          um: 'GB',
          price: 70.0,
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          subcategory: 'CONFIGURACIÓN DE VPS',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 19,
          description: 'HDD 20 GB',
          um: 'GB',
          price: 140.0,
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          subcategory: 'CONFIGURACIÓN DE VPS',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 20,
          description: 'HDD 60 GB',
          um: 'GB',
          price: 406.0,
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          subcategory: 'CONFIGURACIÓN DE VPS',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 21,
          description: 'HDD 100 GB',
          um: 'GB',
          price: 665.0,
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          subcategory: 'CONFIGURACIÓN DE VPS',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 22,
          description: 'HDD 200 GB',
          um: 'GB',
          price: 1330.0,
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          subcategory: 'CONFIGURACIÓN DE VPS',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 23,
          description: 'HDD 500 GB',
          um: 'GB',
          price: 3325.0,
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          subcategory: 'CONFIGURACIÓN DE VPS',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        },
        {
          id: 24,
          description: 'HDD 1 TB',
          um: 'TB',
          price: 6790.0,
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          subcategory: 'CONFIGURACIÓN DE VPS',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        }
      ]
    },
    {
      name: 'VIDEO CONFERENCIA',
      services: [
        {
          id: 25,
          description: 'VIDEO CONFERENCIA',
          um: 'USUARIO',
          price: 111.5,
          category:
            ' SERVICIOS DE  HOSPEDAJE DE SERVIDORES VIRTUALES DEDICADOS CONTRATADOS\t\t\t\t',
          invoiceFrequency: InvoiceFrequency.MONTHLY
        }
      ]
    },
    {
      name: ' SEGURIDAD INFORMATICA',
      services: [
        {
          id: 26,
          description: 'Elaboración del Plan de Seguridad Informática',
          um: 'U',
          price: 24307.0,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 27,
          description: 'Actualizacion del Plan de Seguridad Informática',
          um: 'U',
          price: 10536.24,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 28,
          description: 'Análisis de Trazas de Correo y Navegación (Complejidad Simple)',
          um: 'U',
          price: 802.8,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          subcategory: 'Análisis de Trazas de Correo y Navegación',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 29,
          description: 'Análisis de Trazas de Correo y Navegación (Complejidad Media)',
          um: 'U',
          price: 1003.5,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          subcategory: 'Análisis de Trazas de Correo y Navegación',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 30,
          description: 'Análisis de Trazas de Correo y Navegación (Complejidad Alta)',
          um: 'U',
          price: 1360.3,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          subcategory: 'Análisis de Trazas de Correo y Navegación',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 31,
          description: 'Servicio Integral de Seguridad Informática (Complejidad Simple)',
          um: 'U',
          price: 7124.85,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          subcategory: 'Servicio Integral de Seguridad Informática',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 32,
          description: 'Servicio Integral de Seguridad Informática (Complejidad Media)',
          um: 'U',
          price: 10699.54,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          subcategory: 'Servicio Integral de Seguridad Informática',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 33,
          description: 'Servicio Integral de Seguridad Informática (Complejidad Alta)',
          um: 'U',
          price: 17840.0,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          subcategory: 'Servicio Integral de Seguridad Informática',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 34,
          description: 'Instalación de estación de trabajo para información clasificada',
          um: 'U',
          price: 446.0,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 35,
          description: 'Exploraciòn Externa de la Red (Complejidad Simple)',
          um: 'U',
          price: 1288.55,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          subcategory: 'Exploraciòn Externa de la Red',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 36,
          description: 'Exploraciòn Externa de la Red (Complejidad Media)',
          um: 'U',
          price: 2577.1,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          subcategory: 'Exploraciòn Externa de la Red',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 37,
          description: 'Exploraciòn Externa de la Red (Complejidad Alta)',
          um: 'U',
          price: 5154.19,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          subcategory: 'Exploraciòn Externa de la Red',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 38,
          description: 'Exploraciòn Interna de la Red (Complejidad Simple)',
          um: 'U',
          price: 1288.55,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          subcategory: 'Exploraciòn Interna de la Red',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 39,
          description: 'Exploraciòn Interna de la Red (Complejidad Media)',
          um: 'U',
          price: 2577.1,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          subcategory: 'Exploraciòn Interna de la Red',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 40,
          description: 'Exploraciòn Interna de la Red (Complejidad Alta)',
          um: 'U',
          price: 5154.19,
          category: ' SERVICIOS DE SEGURIDAD INFORMATICA\t\t\t\t',
          subcategory: 'Exploraciòn Interna de la Red',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        }
      ]
    },
    {
      name: ' Asistencia Tecnica Especializada',
      services: [
        {
          id: 41,
          description: 'Servicio de Instalación y/o Configuración de Servidor Firewall',
          price: 2691.63,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 42,
          description:
            'Servicio de Instalación y/o Configuración de Servidor Firewall con alta disponibilidad',
          price: 3122.0,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 43,
          description: 'Servicio de Instalación y/o Configuración de Servidor Proxy',
          price: 2691.63,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 44,
          description:
            'Servicio de Instalación y/o Configuración de Servidor Proxy con Alta disponibilidad',
          price: 4069.75,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 45,
          description:
            'Servicio de Instalación y Configuración de Controlador de Dominio (Hasta 50 users)',
          price: 4906.0,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 46,
          description:
            'Servicio de Instalación y Configuración de Controlador de Dominio (Hasta 100 users)',
          price: 9143.0,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 47,
          description:
            'Servicio de Instalación y Configuración de Controlador de Dominio (Hasta 300 users)',
          price: 16149.78,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 48,
          description:
            'Servicio de Instalación y Configuración de Controlador de Dominio (+ 300 users)',
          price: 34565.0,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 49,
          description: 'Servicio de Instalación y/o Configuración de DNS.',
          price: 2691.63,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 50,
          description: 'Servicio de Instalación y/o Configuración de DHCP',
          price: 2691.63,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 51,
          description: 'Servicio de Instalación y/o Configuración de Servidor de correo',
          price: 2248.58,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 52,
          description:
            'Servicio de Instalación y/o Configuración de Servicio de mensajería instantánea',
          price: 2691.63,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 53,
          description:
            'Servicio de Instalación y/o Configuración de Servicio de actualización de SO (WSUS)',
          price: 2406.96,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 54,
          description:
            'Servicio de Instalación y/o Configuración de Servidor de Actualización de Antivirus',
          price: 2691.63,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 55,
          description: 'Servicio de Instalación y Configuración de Software Antivirus',
          price: 2691.63,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 56,
          description:
            'Servicio de Instalación y/o Configuración de Servidor FTP o Servicio de Carpetas compartidas.',
          price: 2691.63,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 57,
          description: 'Servicio de Instalación y/o Configuración de Servidor de Salvas.',
          price: 2691.63,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 58,
          description:
            'Servicio de Instalación y/o Configuración de Servicio de Video Conferencia.',
          price: 28544.0,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 59,
          description: 'Servicio de Instalación y/o Configuración de Sistema Operativo.',
          price: 278.75,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 60,
          description: 'Servicio de Instalación y/o Configuración de dispositivos de red capa 2 ',
          price: 297.33,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 61,
          description: 'Servicio de Instalación y Configuración de dispositivos de red capa 3',
          price: 669.0,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 62,
          description: 'Servicio de Virtualización de Servidores (Hasta 5 Pcs virtuales)',
          price: 2101.87,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 63,
          description: 'Servicio de Virtualización de Servidores (+5 Pcs virtuales)',
          price: 2802.76,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 64,
          description:
            'Servicio de Reestructuración de un nodo (de 2 a 4 servidores con o sin virtualización)',
          price: 26369.75,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 65,
          description:
            'Servicio de Reestructuración de un nodo (de 5 a 10 servidores con o sin virtualización)',
          price: 34318.29,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        },
        {
          id: 66,
          description:
            'Servicio de Reestructuración de un nodo (más de 11 servidores con o sin virtualización)',
          price: 66955.75,
          category: 'SERVICIO DE ASISTENCIA TECNICA ESPECIALIZADA A LA TRANSMISIÓN DE DATOS\t\t',
          invoiceFrequency: InvoiceFrequency.OCCASIONALLY
        }
      ]
    }
  ])

  return { serviceGroups }
})
