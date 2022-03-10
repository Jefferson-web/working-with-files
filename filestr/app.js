const fs = require('fs');
const path = require('path');
const Parent = require('./Parent');
const Child = require('./Child');

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

function print(o){
    if(o instanceof Child){
        console.log(o);
    } else if(o instanceof Parent){
        console.log(o);
        o.children.forEach(c => print(c));
    }
}

const filesystem = getFileStructure(null, "root");
print(filesystem);