const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const root = path.resolve(__dirname, '../..');

function escape(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Packages that exist in both root and local node_modules.
// We must force Metro to use the local versions to avoid duplicate React.
const localOnly = [
  'react',
  'react-native',
];

// Packages that must resolve from root node_modules
// (nested copies inside workspace packages may be unbuilt/broken)
const resolveFromRoot = [
  'react-native-is-edge-to-edge',
];

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [root],
  resolver: {
    resolverMainFields: ['react-native', 'source', 'browser', 'main'],
    // Block root node_modules versions of packages that are local
    blacklistRE: new RegExp(
      `(${[
        // Block from root node_modules
        ...localOnly.map((m) => escape(path.join(root, 'node_modules', m))),
        // Block from all other workspace node_modules (each may have its own react copy)
        ...localOnly.map(
          (m) => escape(path.join(root, 'packages')) + '\\/[^/]+\\/node_modules\\/' + escape(m),
        ),
        // Block from example/ node_modules (old example has different react)
        escape(path.join(root, 'example', 'node_modules', 'react')),
        escape(path.join(root, 'example', 'node_modules', 'react-native')),
      ]
        .map((m) => `${m}\\/.*`)
        .join('|')})`,
    ),
    // Force all imports of these packages to resolve to local versions
    extraNodeModules: localOnly.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
    nodeModulesPaths: [
      path.join(__dirname, 'node_modules'),
      path.join(root, 'node_modules'),
    ],
    resolveRequest: (context, moduleName, platform) => {
      // Force certain packages to resolve from root node_modules
      // to avoid broken nested copies inside workspace packages
      if (resolveFromRoot.includes(moduleName)) {
        return {
          filePath: require.resolve(moduleName, {
            paths: [path.join(root, 'node_modules')],
          }),
          type: 'sourceFile',
        };
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
