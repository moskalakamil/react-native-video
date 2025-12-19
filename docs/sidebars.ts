import type { TypedSidebarsConfig } from './src/types/sidebar';

const sidebars: TypedSidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Fundamentals',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'fundamentals/intro',
        },
        {
          type: 'doc',
          id: 'fundamentals/installation',
        },
        {
          type: 'category',
          label: 'Configuration',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'fundamentals/configuration/expo-plugin',
            },
            {
              type: 'doc',
              id: 'fundamentals/configuration/manual',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Players',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'players/player',
        },
        {
          type: 'doc',
          id: 'players/AdvancedPlayer',
        },
        {
          type: 'doc',
          id: 'players/drm',
        },
        {
          type: 'category',
          label: 'Usage',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'players/usage/playback',
            },
            {
              type: 'doc',
              id: 'players/usage/audio',
            },
            {
              type: 'doc',
              id: 'players/usage/source',
            },
            {
              type: 'doc',
              id: 'players/usage/background',
            },
            {
              type: 'doc',
              id: 'players/usage/lifecycle',
            },
            {
              type: 'doc',
              id: 'players/usage/text-tracks',
            },
            {
              type: 'doc',
              id: 'players/usage/status',
            },
        {
          type: 'doc',
          id: 'players/usage/notification-controls',
        },
          ],
        },
        {
          type: 'category',
          label: 'Events',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'events/useEvent',
            },
            {
              type: 'category',
              label: 'Usage',
              collapsed: false,
              items: [
                {
                  type: 'doc',
                  id: 'events/loading',
                },
                {
                  type: 'doc',
                  id: 'events/playback',
                },
                {
                  type: 'doc',
                  id: 'events/buffering',
                },
                {
                  type: 'doc',
                  id: 'events/audio',
                },
                {
                  type: 'doc',
                  id: 'events/tracks',
                },
                {
                  type: 'doc',
                  id: 'events/ui',
                },
              ],
            },
            {
              type: 'category',
              label: 'Types',
              collapsed: false,
              items: [
                {
                  type: 'doc',
                  id: 'events/AllPlayerEvents',
                },
                {
                  type: 'doc',
                  id: 'events/ALL_PLAYER_EVENTS',
                },
                {
                  type: 'doc',
                  id: 'events/ALL_VIEW_EVENTS',
                },
                {
                  type: 'doc',
                  id: 'events/JSVideoPlayerEvents',
                },
                {
                  type: 'doc',
                  id: 'events/event-data/onLoadData',
                },
                {
                  type: 'doc',
                  id: 'events/event-data/onLoadStartData',
                },
                {
                  type: 'doc',
                  id: 'events/event-data/onProgressData',
                },
                {
                  type: 'doc',
                  id: 'events/event-data/onPlaybackStateChangeData',
                },
                {
                  type: 'doc',
                  id: 'events/event-data/onVolumeChangeData',
                },
                {
                  type: 'doc',
                  id: 'bandwidth/BandwidthData',
                },
                {
                  type: 'doc',
                  id: 'metadata/TimedMetadata',
                },
                {
                  type: 'doc',
                  id: 'metadata/TimedMetadataObject',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Ads',
          collapsed: false,
          customProps: {
            badgeType: 'planned',
          },
          items: [
            {
              type: 'doc',
              id: 'players/advertising/getting-started',
            },
            {
              type: 'doc',
              id: 'players/advertising/google-ima',
            },
            {
              type: 'doc',
              id: 'players/advertising/google-dai',
              customProps: {
                plan: 'pro',
              },
            },
            {
              type: 'doc',
              id: 'players/advertising/spotx',
              customProps: {
                plan: 'pro',
              },
            },
            {
              type: 'doc',
              id: 'players/advertising/freewheel',
              customProps: {
                plan: 'pro',
              },
            },
            {
              type: 'doc',
              id: 'players/advertising/yospace',
              customProps: {
                plan: 'pro',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'VideoView',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'video-view/getting-started',
        },
        {
          type: 'category',
          label: 'Props',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'video-view/props/player',
            },
            {
              type: 'doc',
              id: 'video-view/props/style',
            },
            {
              type: 'doc',
              id: 'video-view/props/controls',
            },
            {
              type: 'doc',
              id: 'video-view/props/resizeMode',
            },
            {
              type: 'doc',
              id: 'video-view/props/keepScreenAwake',
            },
            {
              type: 'doc',
              id: 'video-view/props/surfaceType',
            },
          ],
        },
        {
          type: 'category',
          label: 'Fullscreen',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'video-view/fullscreen/enterFullscreen',
            },
            {
              type: 'doc',
              id: 'video-view/fullscreen/exitFullscreen',
            },
            {
              type: 'doc',
              id: 'video-view/fullscreen/onFullscreenChange',
            },
            {
              type: 'doc',
              id: 'video-view/fullscreen/willEnterFullscreen',
            },
            {
              type: 'doc',
              id: 'video-view/fullscreen/willExitFullscreen',
            },
          ],
        },
        {
          type: 'category',
          label: 'Picture in Picture',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'video-view/props/pictureInPicture',
            },
            {
              type: 'doc',
              id: 'video-view/props/autoEnterPictureInPicture',
            },
            {
              type: 'doc',
              id: 'video-view/picture-in-picture/enterPictureInPicture',
            },
            {
              type: 'doc',
              id: 'video-view/picture-in-picture/exitPictureInPicture',
            },
            {
              type: 'doc',
              id: 'video-view/picture-in-picture/canEnterPictureInPicture',
            },
            {
              type: 'doc',
              id: 'video-view/picture-in-picture/onPictureInPictureChange',
            },
            {
              type: 'doc',
              id: 'video-view/picture-in-picture/willEnterPictureInPicture',
            },
            {
              type: 'doc',
              id: 'video-view/picture-in-picture/willExitPictureInPicture',
            },
          ],
        },
        {
          type: 'category',
          label: 'Types',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'video-view/VideoView',
            },
            {
              type: 'doc',
              id: 'video-view/VideoViewProps',
            },
            {
              type: 'doc',
              id: 'video-view/VideoViewRef',
            },
            {
              type: 'doc',
              id: 'video-view/VideoViewEvents',
            },
            {
              type: 'doc',
              id: 'video-view/ResizeMode',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'UI',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'players/ui/getting-started',
        },
        {
          type: 'doc',
          id: 'players/ui/playback',
        },
        {
          type: 'doc',
          id: 'players/ui/screen-sharing',
        },
        {
          type: 'doc',
          id: 'players/ui/subtitles',
        },
        {
          type: 'doc',
          id: 'players/ui/chapters',
          customProps: {
            plan: 'pro',
          },
        },
        {
          type: 'doc',
          id: 'players/ui/resolution-select',
          customProps: {
            plan: 'pro',
          },
        },
      ],
    },
    {
      type: 'category',
      label: 'Extensions',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Downloading',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'extensions/downloading/getting-started',
            },
            {
              type: 'doc',
              id: 'extensions/downloading/basic-downloads',
            },
            {
              type: 'doc',
              id: 'extensions/downloading/adaptive-streaming',
              customProps: {
                plan: 'pro',
              },
            },
            {
              type: 'doc',
              id: 'extensions/downloading/track-selection',
              customProps: {
                plan: 'pro',
              },
            },
            {
              type: 'doc',
              id: 'extensions/downloading/metadata',
            },
            {
              type: 'doc',
              id: 'extensions/downloading/drm-downloads',
              customProps: {
                plan: 'pro',
              },
            },
            {
              type: 'doc',
              id: 'extensions/downloading/configuration',
            },
          ],
        },
        {
          type: 'category',
          label: 'Uploading',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'extensions/uploading/getting-started',
            },
            {
              type: 'doc',
              id: 'extensions/uploading/basic-upload',
            },
            {
              type: 'doc',
              id: 'extensions/uploading/multi-part-upload',
              customProps: {
                plan: 'pro',
              },
            },
            {
              type: 'doc',
              id: 'extensions/uploading/queue-management',
            },
            {
              type: 'doc',
              id: 'extensions/uploading/network-tracking',
            },
            {
              type: 'doc',
              id: 'extensions/uploading/configuration',
            },
          ],
        },
        {
          type: 'category',
          label: 'Caching',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'extensions/caching/getting-started',
              customProps: {
                plan: 'pro',
                badgeType: 'planned',
              },
            },
            {
              type: 'doc',
              id: 'extensions/caching/configuration',
              customProps: {
                plan: 'pro',
                badgeType: 'planned',
              },
            },
            {
              type: 'doc',
              id: 'extensions/caching/preloading',
              customProps: {
                plan: 'pro',
                badgeType: 'planned',
              },
            },
            {
              type: 'doc',
              id: 'extensions/caching/management',
              customProps: {
                plan: 'pro',
                badgeType: 'planned',
              },
            },
            {
              type: 'doc',
              id: 'extensions/caching/storage',
              customProps: {
                plan: 'pro',
                badgeType: 'planned',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Plugins',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'plugins/plugins',
        },
        {
          type: 'doc',
          id: 'plugins/interface',
        },
        {
          type: 'doc',
          id: 'plugins/registry',
        },
        {
          type: 'doc',
          id: 'plugins/examples',
        },
      ],
    },
    {
      type: 'doc',
      id: 'use-in-third-party-library',
    },
    // {
    //   type: 'html',
    //   value: '<hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--ifm-color-emphasis-300);" />',
    // },
    // {
    //   type: 'link',
    //   label: 'Example Apps',
    //   href: 'https://github.com/TheWidlarzGroup/react-native-video/tree/master/examples',
    // },
    // {
    //   type: 'doc',
    //   id: 'projects',
    // },
    // {
    //   type: 'html',
    //   value: '<hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--ifm-color-emphasis-300);" />',
    // },
    // {
    //   type: 'link',
    //   label: 'Offline Video SDK',
    //   customProps: {
    //     plan: "pro",
    //     badgeType: "planned"
    //   },
    //   href: 'https://www.thewidlarzgroup.com/offline-video-sdk/?utm_source=rnv&utm_medium=docs&utm_campaign=sidebar&utm_id=offline-video-sdk-button',
    // },
    // {
    //   type: 'link',
    //   label: 'Enterprise Support',
    //   customProps: {
    //     plan: "pro",
    //     badgeType: "new"
    //   },
    //   href: 'https://www.thewidlarzgroup.com/?utm_source=rnv&utm_medium=docs&utm_campaign=navbar&utm_id=enterprise#Contact',
    // },
    // {
    //   type: 'link',
    //   label: 'Boost Your Issue',
    //   href: 'https://www.thewidlarzgroup.com/issue-boost/?utm_source=rnv&utm_medium=docs&utm_campaign=sidebar&utm_id=issue-boost-button',
    // },
    // {
    //   type: 'html',
    //   value: '<hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--ifm-color-emphasis-300);" />',
    // },
    // {
    //   type: 'doc',
    //   id: 'updating',
    // },
    // {
    //   type: 'link',
    //   label: 'Releases',
    //   href: 'https://github.com/TheWidlarzGroup/react-native-video/releases',
    // }
  ],
};

export default sidebars;


