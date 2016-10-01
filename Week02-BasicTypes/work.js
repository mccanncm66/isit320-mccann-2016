var fs = require('fs');

var foo = fs.readFileSync('index.json');

//Asynch
fs.readFile('./index.json', 'utf8', function(err, rawJson) {
    'use strict';
    if (err) {

        throw err;
    }

    var json = JSON.parse(rawJson);
    console.log(json);
    console.log('----Loop------');
    for (var aProperty in json) {
        console.log(aProperty, typeof json[aProperty]);
    }
});
