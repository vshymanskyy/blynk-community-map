// Requirements
var http = require('http');
var connect = require('connect');
var pathUtil = require('path');
var moment = require('moment');

var port = 6342;
var publicPath = pathUtil.resolve('.')

// Create Server
var app = connect()

var counter = 0;
// Log requests
app.use((req, res, next) => {
  if (req["originalUrl"] == "/") {
    counter++;
    console.log(moment().format(), "Total requests", counter);
  }
  next();
});

// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());

var serveStatic = require('serve-static');
app.use(serveStatic(publicPath, {'index': ['index.html', 'index.htm']}));

// Listen
var server = http.createServer(app).listen(port);

// Log
var address = server.address();
var serverHostname = 'localhost';
if (address.address !== '0.0.0.0') {
  serverHostname = address.address;
}
var serverPort = address.port;
var serverLocation = "http://"+serverHostname+":"+serverPort+"/";
console.log("Server listening to ", serverLocation);
