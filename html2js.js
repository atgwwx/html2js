#!/usr/bin/env node
var fs = require('fs');
var lineReader = require('line-reader');
var argv = require('optimist').argv;
var fileName = argv._[0];
var type = argv.t;
var realfileName;
fileName = fileName ? fileName :'test';
if (fileName.match(/\.html/)) {
	realfileName = __dirname + '/'+ fileName;
} else {
	realfileName = __dirname + '/'+ fileName + '.html';
}

var strBuffer = '';
if (type === 'arr') {
	lineReader.eachLine(realfileName, function (line, last) {
	if (/^\s*$/.test(line)) {
		return;
	}
	line = line.replace(/'/g, '\\\'');
	strBuffer += 'arr.push(' + '\'' + line + '\'' + ');\n';
	if (last) {
		strBuffer = 'var arr = [];\n' + strBuffer + 'var str = arr.join(\'\');'; 
		fs.writeFileSync(__dirname + '/' + fileName + '.js', strBuffer, {
    		encoding: 'utf8',
    		flag: 'w+'
		});
	}
});
} else {
	lineReader.eachLine(realfileName, function (line, last) {
	if (/^\s*$/.test(line)) {
		return;
	}
	line = line.replace(/'/g, '\\\'');
	if (last) {
		//\n添加换行符
		// strBuffer += '\'' + line + '\\n\'' + ';';
		strBuffer += '\'' + line + '\'' + ';';
		strBuffer = 'var html = ' + strBuffer;
		fs.writeFileSync(__dirname + '/' + fileName + '.js', strBuffer, {
    		encoding: 'utf8',
    		flag: 'w+'
		});
	} else {
		strBuffer += '\'' + line + '\'' + '+\n';
	}
});
}




