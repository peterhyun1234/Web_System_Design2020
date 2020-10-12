var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var qs = require("querystring");
var cur_path = path.resolve('fs');

var file_name = "";
var file_content = "";

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        fs.readFile("frontend/template.html", function(err, tmpl) {
            fs.readdir(cur_path, function(err, data) {
                lsinfo = "";
                console.log(cur_path);

                data.forEach(function(element) {

                    fs.stat(cur_path + "/" + element, function(error, stats) {
                        console.log(stats.isFile());
                        console.log(stats.size);
                        console.log(stats.mtime);
                    });

                    lsinfo += "<li onclick='readfile(this);'>" + element + "</li>";
                });
                //console.log(tmpl.toString());

                let html = tmpl.toString().replace('%', lsinfo);
                //console.log(html);
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
    }
});

app.listen(3000);