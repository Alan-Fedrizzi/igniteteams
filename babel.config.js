module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./scr/components",
            "@routes": "./scr/routes",
            "@screens": "./scr/screens",
            "@storage": "./scr/storage",
            "@theme": "./scr/theme",
            "@utils": "./scr/utils",
          },
        },
      ],
    ],
  };
};
