module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-css-modules",
  ],
  framework: "@storybook/react",
  staticDirs: ["../src/public"],
  webpackFinal: async (config, { configType }) => {
    if (configType !== "DEVELOPMENT") {
      config.output.publicPath = "/storybook/";
    }
    return config;
  },
  managerWebpack: async (config, { configType }) => {
    if (configType !== "DEVELOPMENT") {
      config.output.publicPath = "/storybook/";
    }
    return config;
  },
};
