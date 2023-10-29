/// <reference types="vite/client" />

// Vue
declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

// Vuetify color fix.
declare module 'vuetify/lib/util/colors.mjs';

interface ImportMetaEnv {
    // see https://vitejs.dev/guide/env-and-mode.html#env-files
    // add .env variables.
    /*
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_WEBSTORAGE_NAMESPACE: string;
    readonly VITE_HIDE_SAMPLES: string;
    readonly VITE_UI_DOMAIN: string;
    readonly VITE_UI_SSL: string;
    readonly VITE_IMAGE_BUCKET_URL: string;
    readonly VITE_STATS_URL: string;
    readonly VITE_POSTBACK_URL_DOMAIN: string;
    readonly VITE_SENTRY_DNS: string;
     */
    readonly VITE_API_BASE_PATH: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
    readonly env: ImportMetaEnv;
}