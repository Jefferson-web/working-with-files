const fs = require('fs');

const path = 'archivo.txt';

fs.stat(path, function(err, stats){
    if(err)
        return err;
    console.log(stats);
});