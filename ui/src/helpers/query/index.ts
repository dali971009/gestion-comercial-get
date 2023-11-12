import { useRoute } from 'vue-router';
import { isArray } from 'lodash';

export function getStringValueFromQuery(key: string): string | undefined {
  const route = useRoute();
  if (route.query[key] !== null && route.query[key] !== undefined) {
    if (isArray(route.query[key])) {
      if (route.query[key].length > 0) {
        return route.query[key][0].toString();
      }
    } else {
      return route.query[key].toString();
    }
  }
  return undefined;
}
