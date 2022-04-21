const express = require('express')
const app = express();
const port = 3200;

const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

// this example reads the file synchronously
// you can read it asynchronously also
let xml_string = fs.readFileSync("flux.xml", "utf8");
//var parser = new xml2json.Parser();
var i = 0;

app.get('/flux', function(req, res) {
    fs.readFile('flux.xml', function(err,data){
        parser.parseString(data, function(err, result){  
            res.send(result);
        });
    });
    
    
  });

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
