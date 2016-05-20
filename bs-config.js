/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 */
var exec = require('child_process').exec;

/**
 * Function that runs build script and reloads files after that
 * @param {object} bs browser-sync instance
 * @param {string} task npm task to run
 * @param {string|boolean} files that should be reloaded
 */
function build(bs, task, files) {
  exec('npm run ' + task, function(err) {
    if (err instanceof Error) {
      throw err;
    }

    bs.reload(files);
  });
}

module.exports = {
  files: [
    {
      options: {ignoreInitial: true},
      match: ['resources/**'],
      fn: function(event, file) {
        console.log("Event " + event + " happened to " + file);
        if (file.match(/\.scss/)) {
          build(this, 'build:css', 'styles/main.css');
        } else if (file.match(/\.js$/)) {
          build(this, 'build:js', 'scripts/main.js');
        } else if (file.match(/\.html$/)) {
          build(this, 'build:html', false);
        }
      }
    }
  ],
  server: {
    baseDir: 'public'
  },
  watchOptions: {},
  proxy: false,
  logLevel: 'debug',
  open: 'local',
  injectFileTypes: ['html', 'scss'],
  excludedFileTypes: [],
  plugins: [
    {
      module: "bs-html-injector",
      options: {
        files: "public/index.html"
      }
    }
  ],
  minify: true
};
