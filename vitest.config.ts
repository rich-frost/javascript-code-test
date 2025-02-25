import {
  configDefaults,
  defineConfig,
  coverageConfigDefaults,
} from "vitest/config";

const excludedFolders = ["__original__/*", "src/__test__/*"];
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, ...excludedFolders],
    coverage: {
      exclude: [...coverageConfigDefaults.exclude, ...excludedFolders],
    },
  },
});
