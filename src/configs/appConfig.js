/**
 * app initial info
 */
const appInfo = {
  name: "Grocery Admin",
  version: "1.0.0",
  environment: "dev",
};

/**
 * app initial environment
 */
const appEnvironment = {
  dev: {
    api: {
      baseUrl: "",
    },
  },
  prod: {
    api: {
      baseUrl: "",
    },
  },
};

/**
 * app initial active config
 */
const appActiveConfig = appEnvironment[appInfo.environment];

export { appInfo, appEnvironment, appActiveConfig };
