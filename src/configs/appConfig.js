/**
 * app initial info
 */
const appInfo = {
  name: 'Admin Market App',
  version: '1.0.0',
  environment: 'dev'
};

/**
 * app initial environment
 */
const appEnvironment = {
  dev: {
    api: {
      baseurl: 'http://groceryapi.kabayancoding.com/api/v1'
    },
    firebase: {
      config: {}
    }
  },
  prod: {
    api: {
      baseurl: 'http://groceryapi.kabayancoding.com/api/v1'
    },
    firebase: {
      config: {}
    }
  }
};

/**
 * app initial active config
 */
const appActiveConfig = appEnvironment[appInfo.environment];

export { appInfo, appEnvironment, appActiveConfig };
