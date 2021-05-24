const {createProxyMiddleware} = require("http-proxy-middleware");
 
// console.log(1);
module.exports = function(app) {
      app.use(
            createProxyMiddleware ("/api", {
                 target: "http://localhost:3000",
                 changeOrigin: true
           })
      );
      // app.use(
         // proxy("/fans/**", {
                 // target: "https://easy-mock.com/mock/5c0f31837214cf627b8d43f0/",
                 // changeOrigin: true
         // })
     // );
};  