import 'styles/index.css';
import a from 'static/part3.png';
import config from 'tools/config';
import 'styles/test.scss';
/**
 * 热刷新
 */
if (module.hot) {
  module.hot.accept('./index', function () {
  })
}
/**
 * 请求静态文件列表
 */
console.log(config);
axios.get(config.staticlist)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });



