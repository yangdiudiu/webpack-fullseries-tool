import './index.css';
import './statics/part3.png';
if (module.hot) {
  module.hot.accept('./index', function () {

  })
}


for(let i of [1,2,3,9,99]){
  console.log(i)
}


// async function getComponent() {
//   const bundle = await import('./statics/part3.png');
//   return bundle;
// }
// getComponent().then(bundle => {
//   console.log(bundle.default)
// });
// require.ensure(["./statics/part3.png"], function(require) {
//   let img = require("./statics/part3.png");
//   console.log(img);
// }, 'img');



