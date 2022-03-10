const express = require('express');

const fs = require('fs');
const path = require('path');
const Parent = require('./Parent');
const Child = require('./Child');

const app = express();

app.use(express.json());

function getFileStructure(parent, dir) {
    var currentParent = null;
    if (parent) {
        currentParent = parent;
    } else {
        currentParent = new Parent(dir);
    }
    var files = fs.readdirSync(dir);
    files.forEach(file => {
        var newPath = dir + "/" + file;
        var stats = fs.statSync(newPath);
        var filename = path.basename(file);
        if (stats.isDirectory()) {
            var child = new Parent(filename);
            var p = getFileStructure(child, newPath, null);
            currentParent.addChild(p);
        } else {
            var child = new Child(filename);
            currentParent.addChild(child);
        }
    });
    return currentParent;
}

app.get('/filesystem', function(req, res){
    const filesystem = getFileStructure(null, "root");
    return res.status(200).json(
        filesystem
    );
});

app.listen(3000, ()=> {
    console.log("Listening on port " + 3000);
});

