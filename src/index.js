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
 * 注册离线应用
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
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



