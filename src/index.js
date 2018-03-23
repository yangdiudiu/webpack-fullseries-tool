// import "babel-polyfill";
import './index.css';


// async function getComponent() {
//   const bundle = await import('./statics/part3.png');
//   return bundle;
// }
// getComponent().then(bundle => {
//   console.log(bundle.default)
// });
let obj = {
  a:1,
  b:2
}
for (i of obj){
  console.log(i)
}

// require.ensure(["./statics/part3.png"], function(require) {
//   let img = require("./statics/part3.png");
//   console.log(img);
// }, 'img');



