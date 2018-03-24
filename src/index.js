import './index.css';
import './statics/part3.png';

if (module.hot) {
  module.hot.accept('./index', function () {


  })
}


for (let i of [1, 2, 3, 9, 99]) {
  console.log(i);
}


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


require.ensure([], function(require) {
  let bundle = require("lodash");
  console.log(bundle);
}, 'bundle');



