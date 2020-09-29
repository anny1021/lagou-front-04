const fs = require('fs');

function fromJSONFile(filename) {
  return (req, res) => {
    // 读取mock数据json文件
    const data = fs.readFileSync(`data/json/${filename}.json`).toString();
    // 解析json文件
    const json = JSON.parse(data);
    return res.json(json);
  };
}

const proxy = {
  // 格式：'请求头 请求路径'
  'GET /api/pictureList': fromJSONFile('pictureList')
};

module.exports = proxy;
