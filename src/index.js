import './styles/index.css';
import './styles/test.scss';
import './assets/part3.png';
import test from './test';
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

for(let i of [1,2,3,4,5]){
  console.log(i)
}
console.log(test);
// function getComponent() {
//   return import('lodash').then(_ => {
//     var element = document.createElement('div');
//     return element;
//   }).catch(error => console.log(error));
// }
// getComponent().then(component => {
//   console.log(component);
// });


// async function getComponent() {
//   const bundle = await import('lodash');
//   return bundle;
// }
// getComponent().then(bundle => {
//   console.log(bundle.default)
// });


// require.ensure([], function(require) {
//   let bundle = require("lodash");
//   console.log(bundle);
// }, 'bundle');


