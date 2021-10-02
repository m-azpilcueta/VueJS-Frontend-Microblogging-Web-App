import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    disable: true,
    dark: false,
    themes: {
      light: {
        primary: "#383950",
        secondary: "#e2e5ed",
        accent: "#a967ad",
      },
    },
  },
});
