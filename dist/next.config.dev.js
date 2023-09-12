"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withFonts = require('next-fonts');

var nextConfig = withFonts({
  webpack: function webpack(config, _ref) {
    var isServer = _ref.isServer;

    if (!isServer) {
      config.resolve = _objectSpread({}, config.resolve, {
        fallback: _objectSpread({}, config.resolve.fallback, {
          child_process: false,
          fs: false,
          'builtin-modules': false,
          worker_threads: false
        })
      });
    }

    return config;
  },
  images: {
    domains: ['images.unsplash.com', 'placeimg.com', 'www.revixpert.ch']
  },
  output: 'standalone'
});
module.exports = nextConfig;