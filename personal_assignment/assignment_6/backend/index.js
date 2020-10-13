var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var qs = require("querystring");
var cur_path = path.resolve('fs');

var file_name = "";
var file_content = "";

function changeDateFormat(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        fs.readFile("frontend/template.html", function(err, tmpl) {
            fs.readdir(cur_path, function(err, data) {
                let lsinfo = "";
                //console.log(cur_path);

                data.forEach(function(element) {

                    let curStats = fs.statSync(cur_path + "/" + element);

                    let curIsFile = curStats.isFile();
                    let curSize = curStats.size;
                    let curMtime = curStats.mtime;
                    curMtime = changeDateFormat(curMtime);
                    if (curIsFile) {
                        lsinfo +=
                            "<tr style=\"background: #9a8cff;\">" +
                            "<td>" + element + "</td>" +
                            "<td><button id=\"delete\">delete</button></td>" +
                            "<td><button id=\"rename\">rename</button></td>" +
                            "<td>" + curSize + "</td>" +
                            "<td>" + curMtime + "</td>" +
                            "</tr>";
                    } else {
                        lsinfo +=
                            "<tr>" +
                            "<td>" + element + "</td>" +
                            "<td><button id=\"delete\">delete</button></td>" +
                            "<td><button id=\"rename\">rename</button></td>" +
                            "<td>-</td>" +
                            "<td>" + curMtime + "</td>" +
                            "</tr>";
                    }

                });

                // console.log(lsinfo);

                let html = tmpl.toString().replace('@', lsinfo);
                // html = html.replace('?', file_name);
                // html = html.replace('$', file_content);
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(html);
            });
        });
    } else if (pathname === '/readfile') {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            file_name = post.file_name;
            console.log(file_name);
            var file_path = path.join(cur_path, file_name);

            fs.readFile(file_path, 'utf8', function(err, data) {
                console.log(file_path);
                file_content = data;
                response.writeHead(302, { Location: `http://localhost:3000/` });
                response.end('success');
            });
        });
    } else if (pathname === '/writefile') {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            var file_path = path.join(cur_path, title);

            fs.writeFile(file_path, description, function(err, data) {
                response.writeHead(302, { Location: `http://localhost:3000/` });
                response.end('success');
            });
        });
    } else if (pathname === '/mkdir') {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var dirName = post.title;

            fs.mkdir(cur_path + "/" + dirName, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    response.writeHead(302, { Location: `http://localhost:3000/` });
                    response.end('success');
                }
            });
        });
    }
});

app.listen(3000);