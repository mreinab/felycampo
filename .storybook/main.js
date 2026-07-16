

/** @type { import('@storybook/nextjs-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/nextjs-vite",
  "staticDirs": [
    "..\\public"
  ],
  async viteFinal(config) {
    config.esbuild = {
      ...(config.esbuild || {}),
      loader: "jsx",
      include: /src\/.*\.js$/,
    };
    config.optimizeDeps = {
      ...(config.optimizeDeps || {}),
      esbuildOptions: {
        ...(config.optimizeDeps?.esbuildOptions || {}),
        loader: { ".js": "jsx" },
      },
    };
    return config;
  },
};
export default config;