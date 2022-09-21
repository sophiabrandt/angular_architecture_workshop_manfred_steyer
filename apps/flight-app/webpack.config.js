const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "dashboard": "http://localhost:4200/remoteEntry.js",
    "external": "http://localhost:4200/remoteEntry.js",
    "flightAdmin": "http://localhost:4200/remoteEntry.js",
    "luggage": "http://localhost:4200/remoteEntry.js",
    // "passenger": "http://localhost:4201/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
