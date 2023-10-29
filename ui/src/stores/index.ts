import { createPinia, type Pinia } from 'pinia';
import { markRaw } from 'vue';
import router from '../router';

const pinia: Pinia = createPinia();

// Use router inside pinia
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

export default pinia;

import useAuth from './auth';
import useBeforeAuthDestination from './before-auth-destination';
import useSnackBar from './global-snackbar';

export { useAuth, useBeforeAuthDestination, useSnackBar };
