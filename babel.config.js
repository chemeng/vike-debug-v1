module.exports = function (api) {
  const output = {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          corejs: { version: 3, proposals: true },
          debug: true,
          modules: ["commonjs"],
        },
      ],
    ],
    plugins: ["@babel/plugin-transform-runtime"],
  };
  api.cache(false);
  return output;
};
