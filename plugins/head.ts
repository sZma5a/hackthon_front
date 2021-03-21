import { Plugin } from '@nuxt/types'

const plugin: Plugin = (context, inject) => {
  function head(title: string, path: string, icatch?: string) {
    if (!icatch) {
        icatch = `${context.app.$config.BASE_URL}/img/scenery_eye_catch.png`;
    }
    return [
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Scenery' },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:url', property: 'og:url', content: `${context.app.$config.BASE_URL}${path}` },
      { hid: 'og:image', property: 'og:image', content: icatch },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
    ];
  };
  inject('head', head);
}

export default plugin;
