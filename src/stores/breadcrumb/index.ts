import type { RouteLocationRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface BreadcrumbProps {
  back?: RouteLocationRaw
  backLabel?: string
  title: string
}

export const useBreadCrumb = defineStore('breadcrumb', () => {
  const defaultProps: BreadcrumbProps = { title: 'Test' }
  const props = ref<BreadcrumbProps>(defaultProps)

  function set(newProps: BreadcrumbProps) {
    props.value = newProps
  }

  function reset() {
    props.value = defaultProps
  }

  return { props, set, reset }
})
