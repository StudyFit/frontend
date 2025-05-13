module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./", // 또는 './' 로 전체 프로젝트 루트로 잡을 수도 있음
          },
        },
      ],
    ],
  };
};
