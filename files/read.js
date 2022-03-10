const fs = require('fs');

const content = fs.readFileSync('archivo.txt', {
    encoding: 'utf8'
});

console.log(content);