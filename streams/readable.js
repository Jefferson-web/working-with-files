const stream = require('stream');

var Feed = function (channel) {
    var readble = new stream.Readable({
        encoding: 'utf8',
        highWaterMark: 20000,
        objectMode: true
    });
    var news = [
        "New 1",
        "New 2",
        "New 3",
        "New 4",
        "New 5"
    ];
    var prices = [
        { price: 1 },
        { price: 2 },
        { price: 3 },
        { price: 4 },
        { price: 5 }
    ];
    readble._read = function(){
        if(prices.length){
            let obj = prices.shift();
            return readble.push(obj + "\n");
        }
        readble.push(null);
    }
    return readble;
}

var feed = new Feed();

feed.on('readable', function(){
    var data = feed.read();
    data && process.stdout.write(data);
});

feed.on("close", function(){
    console.log("no more news");
});




