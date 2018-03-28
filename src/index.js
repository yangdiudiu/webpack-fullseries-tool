import 'styles/index.css';
import a from 'static/part3.png';
import config from 'tools/config';
/**
 * 热刷新
 */
if (module.hot) {
  module.hot.accept('./index', function () {
  })
}
/**
 * 请求静态文件列表 可做进度条
 */
console.log(config);
axios.get(config.staticlist)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });



