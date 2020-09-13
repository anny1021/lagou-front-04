// 实现这个项目的构建任务
const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks');

module.exports = (grunt) => {
  // 配置
  const configs = {
    app: './',
    dist: 'dist',
  };
  // 用于为任务添加一些配置选项
  grunt.initConfig({
    config: configs,
    pkg: grunt.file.readJSON('package.json'), //   获取解析package.json将内容保存在pkg中
    // 清空
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: ['.tmp', '<%= config.dist %>/*'],
          },
        ],
      },
    },
    // 拷贝 不需要压缩，fonts 图片 html
    copy: {
      dist: {
        expand: true,
        cwd: '<%= config.app %>/',
        dest: '<%= config.dist %>/',
        src: [
          'src/assets/fonts/*.*',
          'src/assets/images/*.*',
          'src/{,*/}*.html',
          'public/{,*/}*',
        ],
      },
    },
    //  html swigs
    cptpl: {
      options: {},
      files: {
        expand: true,
        cwd: '<%= config.app %>/',
        dest: '<%= config.dist %>/',
        src: ['src/{,*/}*.html'],
      },
    },
    // babel
    babel: {
      options: {
        sourceMap: false,
        presets: ['@babel/preset-env'],
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>/',
            dest: '<%= config.dist %>/',
            src: ['src/assets/scripts/*.*'], //所有js文件
          },
        ],
      },
    },
    lint: {
      options: {
        expand: true,
        presets: ['grunt-contrib-jshint'],
      },
      files: [
        {
          expand: true,
          cwd: '<%= config.app %>/',
          dest: '<%= config.dist %>/',
          src: ['src/assets/scripts/*.js'], //所有js文件
        },
      ],
    },
    // css
    sass: {
      options: {
        sourceMap: true,
        implementation: sass,
      },
      files: {
        expand: true,
        cwd: '<%= config.app %>/',
        dest: '<%= config.dist %>/',
        src: ['src/assets/styles/*.scss'],
      },
    },
    cssmin: {
      options: {
        expand: true,
        presets: ['grunt-contrib-cssmin'],
      },
      files: {
        expand: true,
        cwd: '<%= config.dist %>/',
        dest: '<%= config.dist %>/',
        src: ['**/*.css'],
      },
    },
    // 丑化 + 混淆
    uglify: {
      options: {
        mangle: true,
        comments: 'false',
        stripBanners: true,
        banner: '/* !版权所有 @ xinxin */\n',
        presets: ['grunt-contrib-uglify'],
      },
      files: {
        expand: true,
        cwd: '<%= config.dist %>/',
        dest: '<%= config.dist %>/',
        // src: ['**/*.js', '**/*.html', '**/*.css'],
        src: ['**/*.js', '**/*.css'],
      },
    },
  });

  loadGruntTasks(grunt); // 自动加载所有的 grunt 插件中的任务

  // cptpl
  grunt.registerTask('clean', ['clean']);
  grunt.registerTask('lint', ['lint']);
  grunt.registerTask('build', [
    'clean',
    'babel',
    'sass',
    'copy',
    'cssmin',
    'uglify',
  ]);
  grunt.registerTask('default', ['clean', 'sass', 'cssmin']);
};
