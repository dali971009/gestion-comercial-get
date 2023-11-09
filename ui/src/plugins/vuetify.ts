// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  defaults: {
    VTextField: {
      variant: 'outlined',
      density: 'compact',
    },
    VAutocomplete: {
      variant: 'outlined',
      density: 'compact',
    },
    VCheckbox: {
      density: 'compact',
    },
    VBtn: {
      color: 'primary',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'compact',
    },
  },
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          primary: '#106697',
          surface: '#f0f7ff',
          loginBackground: '#80c6f7',
          error: '#d92550', // Amaranth (red)
          info: '#78C3FB', // Maya Blue
          success: '#3ac47d', // UFO Green
          warning: '#f7b924', // Orange-Yellow
        },
      },
    },
  },
});
