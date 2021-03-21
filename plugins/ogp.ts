import { Plugin } from '@nuxt/types'

const plugin: Plugin = (context, inject) => {
  const ogp = async function(title: string, display_name: string, img_src: string) {
    return context.app.$cloudinary.image.url('ogp/material/board.jpg', {
      version: '1610822682',
      crop: 'scale',
      width: 1200,
      height: 630,
      transformation: [
        {
          overlay: {
            url: img_src,
          },
          crop: 'fill',
          width: 1200,
          height: 630,
          opacity: 100,
        },
        {
          overlay: {
            url: 'https://res.cloudinary.com/scenery-cam/image/upload/v1610389668/ogp/material/back_ground.png',
          },
          crop: 'fill',
          width: 1200,
          height: 630,
          opacity: 100,
          background: '#000000',
        },
        {
          overlay: {
            font_family: 'Sawarabi%20Gothic',
            font_size: 100,
            font_weight: 'bold',
            text_align: 'center',
            text: encodeURI(title),
          },
          y: -120,
          width: '1000',
          color: '#fff',
          crop: 'fit',
        },
        {
          overlay: {
            font_family: 'Sawarabi%20Gothic',
            font_size: 60,
            text_align: 'center',
            text: encodeURI(`by ${display_name}`),
          },
          y: 75,
          width: '1000',
          color: '#fff',
          crop: 'fit',
        },
      ]
    });
  }

  inject('ogp', ogp);
};

export default plugin;
