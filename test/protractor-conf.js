exports.config = {
  allScriptsTimeout: 11000,

  specs: [

    'e2e/*.js',
    //'e2e/groupCardSpec.js',
    //'e2e/zoomEditSpec.js',
    //'e2e/titlebarSpec.js',
    'reporterHack.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 10000,
    showColors: true,
    realtimeFailure: true,
  },
  onPrepare: function() {
    require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new jasmine.SpecReporter({
        displayStacktrace: true,
        displaySkippedSpec: true,
        colors: {
          success: 'green',
          failure: 'red',
          skipped: 'yellow'
        },
        prefixes: {
          success: '✓ ',
          failure: '✗ ',
          skipped: '- '
        }
      }));
  }
};