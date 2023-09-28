// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  defaults: {
    VTextField: {
      variant: 'outlined',
      density: 'compact',
      color: '#26a69a'
    },
    VCheckbox: {
      density: 'compact',
      color: '#26a69a'
    },
    VBtn: {
      color: '#26a69a'
    },
    VTextarea: {
      variant: 'outlined',
      density: 'compact',
      color: '#26a69a'
    },
    VAutocomplete: {
      variant: 'outlined',
      density: 'compact',
      color: '#26a69a'
    }
  }
})
