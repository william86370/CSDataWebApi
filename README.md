# CSDataWebApi Development Guide () {

*Developed For CS-452 Database System*


## Usage

<a name="API-Usage"></a><a name="1.0"></a>
 - [1.0](#API-Usage) **Usage**: How to Access the Web Based API

   - `/api/v1/Auth`

   ```javascript
var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'GET',
  'hostname': '10.1.120.77',
  'port': 3000,
  'path': '/api/v1/Auth',
  'headers': {
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();
   ```

}
