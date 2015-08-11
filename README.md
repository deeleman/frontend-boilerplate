# Frontend Boilerplate

This boilerplate repo provides a simple nifty template to quickly kick start development on a new project requiring the following:

* SASS building and compiling into CSS in two flavors (normal and compressed) with auto-prefixing support
* Javascript concatenation and build in two flavors (normal and uglified)
* Built-in web server for debugging purposes (based on Connect)
* File change tracking (including adding or unlinking files on runtime) with browser LiveReload support

All the aforementioned features are configurable so any change in paths and filenames can be done effortlessly.

## Installing dependencies and building the project

Dependencies installation rely basically on the NPM CLI. For simplicity's sake tools such as Bower, Yeoman or Bundle have not been considered for this boilerplate. The only requirement prior to proceed with the dependencies installation is to have Gulp installed globally onto your system. Should it is not available already on your system, please execute the following:

```bash
$ sudo npm i -g gulp
```

 Once Gulp is available in your system, you can trigger the installation and kickstart development on your new project by cloning this repo and executing the following commands (please replace `[your project name]` with your folder name of choice):

```bash
$ git clone https://github.com/deeleman/frontend-boilerplate.git [your project name]
$ cd [your project name]
$ sudo npm install
$ gulp dev
```

What has just happened? After installing all third-party dependencies, the `gulp dev` task command packages whatever Javascript and SASS files might be found within the `/src` tree folder. A local server pointing to `/public` (which acts as the release folder - you will learn later on how to customize this if required) is then spawned in port 3000 (or any port of your choice - more info below) and from that point on all updated files are watched and thus compiled should any change is detected.

**Please note:** In order to leverage the browser auto-reload functionality you will need to install the associated [browser extension](http://livereload.com/extensions/) for your browser of choice.

### Where to store your files

This template takes separation of concerns quite seriously, so development and build files live in different workspaces in order to prevent errors and ease the development effort. Here you have a rundown of the different locations you have:

#### Source Javascript files
Please store all your Javascript files belonging to your project at `src/js`. Anything available there will be later on digested into a single application file and saved onto `public/assets/js` (the HTML shell already points out to the destination location) by tracking down all dependencies found from `src/js/index.js`and beyond. **Never save Javascript files in the the `public` root path**. The building configuration will do that for you and it is not a good practice to mix up build files with actual dev files. Same applies to third-party dependencies.

#### SCSS files
Please store your SASS files at `src/scss`. Gulp will watch such directory and will compile and export your SASS files into a single CSS file available for your page at `public/assets/css`. Same as we do for Javascript, you don't want to save under any circumstances any SASS/CSS file in any location other than `src/scss`.

#### Gulp tasks
Please store your Gulp tasks as standalone module files into `gulp/tasks`. A complete [IoC](https://en.wikipedia.org/wiki/Inversion_of_control) setup has been put in place to ensure that each one of those standalone tasks files are available throughout the application and across different modules and files. You can also create composite tasks wrapping several other tasks by means of "Gulp containers". Doing so prevents you from having to track down tasks shared across different files later on, easing project maintenance down the line. In order to do so, just use the following template for your task:

```javascript
'use strict';

module.exports = function (gulpContainer, settings, errorHandler) {
    var gulp = gulpContainer.gulp;
    // Your task dependencies and variables would go below this line
    // ...

    // Task implementation follows
    gulp.task('{ your task name }', function () {
        gulp.src('{ your stream source, if any }')
            .on('error', errorHandler)
            .pipe(/* Replace this comment with the proper stream commands */)
    });

    /*
        If you want the Gulp task(s) you have just created to be executed within
        other wrapping upper-level tasks, you can create named containers available different
        modules and 'aggregate' such tasks within those containers. Eg. The following
        example line adds the task { your task name } to the upper-level task 'dev',
        so it can be triggered when executing 'gulp dev'. The system is smart enough
        to create such upper-level tasks if they have not been created already
    */
    gulpContainer.getContainer('dev').addTask('{ your task name }');
};
```

There will be case scenarios where you will be wanting to access Gulp directly bypassing the container manager. No worries... This Gulp implementation have your back! Remember that the `gulp`object is always available as part of the container and any task created within the project is available throughout the application regardless what container groups it belongs to.

Let's figure out for argument's sake that you want to leverage plugins such as `gulp-sequence` (a *Javascript newbie* asked me this question once) to sort the order where each standalone task is executed. Then you can proceed like this:

```javascript
module.exports = function (gulpContainer, settings, errorHandler) {
    var gulp = gulpContainer.gulp;
    var gulpSequence = require('gulp-sequence');

    // You might define certain tasks
    gulp.task('a', function (cb) {
      //... cb()
    });

    gulp.task('b', function (cb) {
      //... cb()
    });

    gulp.task('c', function (cb) {
      //... cb()
    });
    // ...

    // Implementation example, where
    // 1. run 'a', 'b' in parallel;
    // 2. run 'c' after 'a' and 'b';
    // 3. run 'd' and 'e', which were created as standalone tasks elsewhere
    // 3. run 'f' after 'd' and 'e'.
    gulp.task('sequence-1', gulpSequence(['a', 'b'], 'c', ['d', 'e'], 'f'));

    // We could even subscribe this sequence task to another container group!!!
    gulpContainer.getContainer('batch-sequences').addTask('sequence-1');
};
```

#### How to customise and update the building settings
As you can see our Gulp tasks template includes a `settings` parameter in its payload. Its just a reference to the `gulp/gulp.settings.json` file where building parameters can be set by yourself. This is a convenience file which is meant to store all the settings that configure the building processes, so once you have properly coded a task module, you do not need to tweak its code to configure or update its settings later on.

The settings object comes in the form of a Javascript hash object representing the data scheme contained at `gulp/gulp.settings.json` so, for argument's sake, you can access properties like the file path for the concatenated CSS file with object references such as `settings.sass.dest`.

## ISC License

Copyright (c) 2015, Pablo Deeleman <deeleman@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
