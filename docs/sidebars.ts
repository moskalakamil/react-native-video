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
          id: 'players/use-video-player',
        },
        {
          type: 'doc',
          id: 'players/player',
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
              id: 'players/usage/multiview',
              customProps: {
                plan: 'pro',
                badgeType: 'planned',
              },
            },
            {
              type: 'doc',
              id: 'players/usage/lifecycle',
            },
            {
              type: 'doc',
              id: 'players/usage/low-latency',
              customProps: {
                plan: 'pro',
                badgeType: 'planned',
              },
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
              id: 'players/usage/frame-processors',
              customProps: {
                badgeType: 'planned',
              },
            },
            {
              type: 'doc',
              id: 'players/usage/notification-controls',
            },
          ],
        },
        {
          type: 'category',
          label: 'Analytics',
          collapsed: false,
          customProps: {
            badgeType: 'planned',
          },
          items: [
            {
              type: 'doc',
              id: 'players/analytics/manual',
            },
            {
              type: 'doc',
              id: 'players/analytics/mux',
              customProps: {
                plan: 'pro',
              },
            },
            {
              type: 'doc',
              id: 'players/analytics/conviva',
              customProps: {
                plan: 'pro',
              },
            },
            {
              type: 'doc',
              id: 'players/analytics/npaw',
              customProps: {
                plan: 'pro',
              },
            },
            {
              type: 'doc',
              id: 'players/analytics/adobe',
              customProps: {
                plan: 'pro',
              },
            },
            {
              type: 'doc',
              id: 'players/analytics/google-analytics',
              customProps: {
                plan: 'pro',
              },
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
              id: 'players/events/useEvent',
            },
            {
              type: 'category',
              label: 'Usage',
              collapsed: false,
              items: [
                {
                  type: 'doc',
                  id: 'players/events/loading',
                },
                {
                  type: 'doc',
                  id: 'players/events/playback',
                },
                {
                  type: 'doc',
                  id: 'players/events/buffering',
                },
                {
                  type: 'doc',
                  id: 'players/events/audio',
                },
                {
                  type: 'doc',
                  id: 'players/events/tracks',
                },
                {
                  type: 'doc',
                  id: 'players/events/ui',
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
                  id: 'players/events/AllPlayerEvents',
                },
                {
                  type: 'doc',
                  id: 'players/events/ALL_PLAYER_EVENTS',
                },
                {
                  type: 'doc',
                  id: 'players/events/ALL_VIEW_EVENTS',
                },
                {
                  type: 'doc',
                  id: 'players/events/JSVideoPlayerEvents',
                },
                {
                  type: 'doc',
                  id: 'players/events/event-data/onLoadData',
                },
                {
                  type: 'doc',
                  id: 'players/events/event-data/onLoadStartData',
                },
                {
                  type: 'doc',
                  id: 'players/events/event-data/onProgressData',
                },
                {
                  type: 'doc',
                  id: 'players/events/event-data/onPlaybackStateChangeData',
                },
                {
                  type: 'doc',
                  id: 'players/events/event-data/onVolumeChangeData',
                },
                {
                  type: 'doc',
                  id: 'players/events/event-data/BandwidthData',
                },
                {
                  type: 'doc',
                  id: 'players/events/event-data/TimedMetadata',
                },
                {
                  type: 'doc',
                  id: 'players/events/event-data/TimedMetadataObject',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Ads',
          collapsed: false,
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
                badgeType: 'planned',
              },
            },
            {
              type: 'doc',
              id: 'players/advertising/spotx',
              customProps: {
                plan: 'pro',
                badgeType: 'planned',
              },
            },
            {
              type: 'doc',
              id: 'players/advertising/freewheel',
              customProps: {
                plan: 'pro',
                badgeType: 'planned',
              },
            },
            {
              type: 'doc',
              id: 'players/advertising/yospace',
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
      label: 'VideoView',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'video-view/getting-started',
        },
        {
          type: 'doc',
          id: 'video-view/props',
        },
        {
          type: 'doc',
          id: 'video-view/fullscreen',
        },
        {
          type: 'doc',
          id: 'video-view/picture-in-picture',
        },
      ],
    },
    {
      type: 'category',
      label: 'UI',
      collapsed: false,
      customProps: {
        badgeType: 'planned',
      },
      items: [
        {
          type: 'doc',
          id: 'ui/getting-started',
        },
        {
          type: 'doc',
          id: 'ui/playback',
        },
        {
          type: 'doc',
          id: 'ui/chapters',
          customProps: {
            plan: 'pro',
          },
        },
        {
          type: 'doc',
          id: 'ui/skip-intro',
        },
        {
          type: 'doc',
          id: 'ui/screen-sharing',
          customProps: {
            plan: 'pro',
          },
        },
        {
          type: 'doc',
          id: 'ui/subtitles',
          customProps: {
            plan: 'pro',
          },
        },
        {
          type: 'doc',
          id: 'ui/resolution-select',
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
          collapsed: true,
          customProps: {
            plan: 'pro',
            badgeType: 'planned',
          },
          items: [
            {
              type: 'doc',
              id: 'extensions/caching/getting-started',
            },
            {
              type: 'doc',
              id: 'extensions/caching/configuration',
            },
            {
              type: 'doc',
              id: 'extensions/caching/strategies',
            },
            {
              type: 'doc',
              id: 'extensions/caching/management',
            },
            {
              type: 'doc',
              id: 'extensions/caching/storage',
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
        {
          type: 'doc',
          id: 'plugins/use-in-third-party-library',
        },
      ],
    },
    {
      type: 'html',
      value: '<br />',
    },
  ],
};

export default sidebars;
