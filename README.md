# grunt-multi-stage-sourcemap

> Remap multi-level sourcemaps using the [multi-stage-sourcemap](https://github.com/azu/multi-stage-sourcemap) library.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-multi-stage-sourcemap --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-multi-stage-sourcemap');
```

## The "multi_stage_sourcemap" task

### Overview
In your project's Gruntfile, add a section named `multi_stage_sourcemap` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  multi_stage_sourcemap: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.map
Type: `function`

Default value:
```
function naiveMapping(pathMapFrom, pathMapTo) {

  function getFilename(path) {
    return path.split("/").pop();
  }

  if (getFilename(pathMapFrom) === getFilename(pathMapTo)) {
    return true;
  }
}
```

A function which decides which maps should be offset to each other. The function recieves the paths to both files and should return `true` if they match up otherwise it should return `false`.

By default the function will return `true` if both files have the same name.

### Usage Examples

#### Default Options
In this example, the default options are used to retrieve the `default_options.js.map` source map from directory `A` and remap it using `default_options.js.map` from directory `B`.

```js
grunt.initConfig({
  multi_stage_sourcemap: {
    filesFrom: 'test/fixtures/A/default_options.js.map',
    options: {},
    files: [{
      expand: true,
      cwd: 'test/fixtures/B/',
      src: ['default_options.js.map'],
      dest: 'tmp'
    }],
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
