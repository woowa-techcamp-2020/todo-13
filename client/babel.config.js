module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        targets: "> 1%, not dead",
        modules: false,
        corejs: "3",
      },
    ],
  ];

  return {
    presets,
  };
};
