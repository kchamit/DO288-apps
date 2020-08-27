var express = require('express');
var yaml = require('js-yaml');
var fs = require('fs')
app = express();

// read in the APP_MSG env var
var msg = process.env.APP_MSG;

var response;

app.get('/', function (req, res) {

    response = 'Value in the APP_MSG env var is => ' + msg + '\n';
    // read config
    const config = yaml.safeLoad(fs.readFileSync('/opt/app-root/config/config.yaml', 'utf8'));
    response += 'The config file is => ' + JSON.stringify(config) + '\n';

    // Read in the secret file
    fs.readFile('/opt/app-root/secure/myapp.sec', 'utf8', function (secerr,secdata) {
        if (secerr) {
            console.log(secerr + '\n');
            response += secerr + '\n';
        }
        else {
            response += 'The secret is => ' + secdata + '\n';
        }

        //send the response to the client
        res.send(response);
    });

});

app.listen(8080, function () {
  console.log('Server listening on port 8080...');
});
