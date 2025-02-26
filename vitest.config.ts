import {
  configDefaults,
  defineConfig,
  coverageConfigDefaults,
} from "vitest/config";

const excludedFolders = ["__original__/*", "e2e/*", "src/__test__/*"];
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, ...excludedFolders],
    coverage: {
      exclude: [...coverageConfigDefaults.exclude, ...excludedFolders],
    },
  },
});
