import type { NavigationGuardNext, RouteLocationNormalized, NavigationGuard } from 'vue-router';
import Cookies from 'js-cookie';
import RouteNames from '@/router/route-names';
import CookieNames from '@/helpers/cookies/cookie-names';
import { useAuth, useBeforeAuthDestination } from '@/stores';

const authGuard: NavigationGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuth();
  const beforeAuthDestination = useBeforeAuthDestination();
  if (
    to.name === RouteNames.LOGIN /* ||
    to.name === RouteNames.LOGOUT ||
    to.name === RouteNames.FORGOT_PASSWORD ||
    to.name === RouteNames.PASSWORD_RESET */
  ) {
    next();
  } else if (Cookies.get(CookieNames.ACCESS_TOKEN) && Cookies.get(CookieNames.REFRESH_TOKEN)) {
    try {
      const resp = await authStore.checkSession();
      if (resp) {
        next();
      } else {
        beforeAuthDestination.setDestination(to);
        next({ name: RouteNames.LOGIN });
      }
    } catch (err) {
      beforeAuthDestination.setDestination(to);
      next({ name: RouteNames.LOGIN });
    }
  } else {
    // there are no tokens redirect to Login page.
    next({ name: RouteNames.LOGIN });
  }
};

export default authGuard;
