import React from 'react';
import TWGBadge from './components/TWGBadge/TWGBadge';

export default {
  head: (
    <>
      <meta name="language" content="en" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content="Video component for React Native" />
      <meta name="og:title" content="React Native Video" />
      <meta
        name="og:description"
        content="A Video component for React Native"
      />
      <meta
        name="og:image"
        content="https://docs.thewidlarzgroup.com/react-native-video/thumbnail.jpg"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="React Native Video" />
      <meta
        name="twitter:description"
        content="A Video component for React Native"
      />
      <meta
        name="twitter:image"
        content="https://docs.thewidlarzgroup.com/react-native-video/thumbnail.jpg"
      />
      <meta name="twitter:image:alt" content="React Native Video" />
      <link
        rel="icon"
        type="image/png"
        href="https://docs.thewidlarzgroup.com/react-native-video/favicon.png"
      />
      {/* Google Tag Manager*/}
      <script>
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-P4K9VDMV');`}
      </script>
      {/*End Google Tag Manager*/}
      <script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="c405153a-f05d-48df-bec6-a822fef9e880"
        data-blockingmode="auto"
        type="text/javascript"></script>
    </>
  ),
  logo: (
    <span>
      🎬 <strong>Video component</strong> for React Native
    </span>
  ),
  project: {
    link: 'https://github.com/TheWidlarzGroup/react-native-video',
  },
  docsRepositoryBase:
    'https://github.com/TheWidlarzGroup/react-native-video/tree/master/docs/',
  main: ({children}) => (
    <>
      {children}
      <TWGBadge visibleOnLarge={false} />
    </>
  ),
  toc: {
    extraContent: <TWGBadge visibleOnLarge={true} />,
  },
  footer: {
    text: (
      <span>
        Built with ❤️ by <strong>TheWidlarzGroup</strong> &{' '}
        <strong>React Native Community</strong>
      </span>
    ),
  },

  useNextSeoProps() {
    return {
      titleTemplate: '%s – Video',
    };
  },
};
