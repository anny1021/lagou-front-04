// Node CLI 应用入口文件必须要有这样的文件头

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer'); // 命令行交互插件
const ejs = require('ejs'); // 模板引擎

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'please enter your project name?',
      default: 'custom-project',
    },
    {
      type: 'input',
      name: 'desc',
      message: 'please enter your project description?',
      default: 'custom-project-desc',
    },
  ])
  .then((answers) => {
    // 根据用户回答的结果生成文件

    // 获取模板文件
    const tmplDir = path.join(__dirname, 'templates');
    // 目标目录
    const destDir = process.cwd();

    // 根据模板下的文件 重新创建
    fs.readdir(tmplDir, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        // file => 文件相对于 templates 目录的相对路径
        // 通过模板引擎渲染文件
        ejs.renderFile(path.join(tmplDir, file), answers, (err, result) => {
          if (err) throw err;
          // 将结果写入目标文件
          fs.writeFileSync(path.join(destDir, file), result);
        });
      });
    });
  });
