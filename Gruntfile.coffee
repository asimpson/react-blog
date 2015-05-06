module.exports = (grunt) ->

  grunt.initConfig
    pkg: require("./package.json")

    scssFiles:
      files: [
        expand: true # Enable dynamic expansion.
        cwd: "scss/" # Src matches are relative to this path.
        src: ["**/*.scss"] # Actual pattern(s) to match.
        dest: "public/css/" # Destination path prefix.
        ext: ".css" # Dest filepaths will have this extension.
        extDot: "first" # Extensions in filenames begin after the first dot
      ]

    watch:
      browserify:
        files: "components/**/*"
        tasks: "shell:browserify_dev"
        options:
          livereload: true

      stylesheets:
        files: "scss/**/*"
        tasks: "sass:dev"
        options:
          livereload: true

    shell:
      browserify_dev:
        command: "./node_modules/.bin/browserify -t reactify components/clientRouter.jsx -o public/js/browser.js"
      browserify_prod:
        command: "browserify -t reactify components/clientRouter.jsx | uglifyjs -c > public/js/browser.js"
      options:
        stdout: false
        stderr: false

    sass:
      prod:
        options:
          sourceMap: false
          outputStyle: 'compressed'
        files: '<%= scssFiles.files %>'
      dev:
        options:
          sourceMap: true
        files: '<%= scssFiles.files %>'


  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-sass"
  grunt.loadNpmTasks "grunt-shell"
  
  # Default task
  grunt.registerTask "prod", ["sass:prod", "shell:browserify_prod"]
  grunt.registerTask "dev", ["sass:dev", "shell:browserify_dev"]
  grunt.registerTask "default", "dev"

