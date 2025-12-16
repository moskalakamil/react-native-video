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
          label: 'Playback',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'playback-control/play',
            },
            {
              type: 'doc',
              id: 'playback-control/pause',
            },
            {
              type: 'doc',
              id: 'playback-control/isPlaying',
            },
            {
              type: 'doc',
              id: 'playback-control/rate',
            },
            {
              type: 'doc',
              id: 'playback-control/loop',
            },
            {
              type: 'doc',
              id: 'seeking-time/seekTo',
            },
            {
              type: 'doc',
              id: 'seeking-time/seekBy',
            },
            {
              type: 'doc',
              id: 'seeking-time/currentTime',
            },
            {
              type: 'doc',
              id: 'seeking-time/duration',
            },
          ],
        },
        {
          type: 'category',
          label: 'Audio',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'player-audio/volume',
            },
            {
              type: 'doc',
              id: 'player-audio/muted',
            },
            {
              type: 'doc',
              id: 'player-audio/mixAudioMode',
            },
            {
              type: 'doc',
              id: 'player-audio/ignoreSilentSwitchMode',
            },
            {
              type: 'category',
              label: 'Types',
              collapsed: false,
              items: [
                {
                  type: 'doc',
                  id: 'audio/MixAudioMode',
                },
                {
                  type: 'doc',
                  id: 'audio/IgnoreSilentSwitchMode',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Source',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'source-management/source',
            },
            {
              type: 'doc',
              id: 'source-management/replaceSourceAsync',
            },
            {
              type: 'category',
              label: 'Types',
              collapsed: false,
              items: [
                {
                  type: 'doc',
                  id: 'source/VideoSource',
                },
                {
                  type: 'doc',
                  id: 'source/VideoConfig',
                },
                {
                  type: 'doc',
                  id: 'source/SourceType',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Lifecycle',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'background-lifecycle/playInBackground',
            },
            {
              type: 'doc',
              id: 'background-lifecycle/playWhenInactive',
            },
            {
              type: 'doc',
              id: 'background-lifecycle/initialize',
            },
            {
              type: 'doc',
              id: 'background-lifecycle/preload',
            },
            {
              type: 'doc',
              id: 'background-lifecycle/release',
            },
          ],
        },
        {
          type: 'category',
          label: 'Text Tracks',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'player-text-tracks/selectedTrack',
            },
            {
              type: 'doc',
              id: 'player-text-tracks/getAvailableTextTracks',
            },
            {
              type: 'doc',
              id: 'player-text-tracks/selectTextTrack',
            },
            {
              type: 'category',
              label: 'Types',
              collapsed: false,
              items: [
                {
                  type: 'doc',
                  id: 'text-tracks/TextTrack',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Status & Events',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'status/status',
            },
            {
              type: 'doc',
              id: 'status/showNotificationControls',
            },
            {
              type: 'doc',
              id: 'events-management/addEventListener',
            },
            {
              type: 'doc',
              id: 'events-management/clearAllEvents',
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
      label: 'Events',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'events/getting-started',
        },
        {
          type: 'doc',
          id: 'events/useEvent',
        },
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
      label: 'Configuration',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'configuration/manual',
        },
        {
          type: 'doc',
          id: 'configuration/expo-plugin',
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

