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
                            "<td><button class=\"readFile\">" + element + "</button></td>" +
                            "<td><button class=\"delete\">delete</button></td>" +
                            "<td><button class=\"rename\">rename</button></td>" +
                            "<td>" + curSize + " B</td>" +
                            "<td>" + curMtime + "</td>" +
                            "</tr>";
                    } else {
                        lsinfo +=
                            "<tr>" +
                            "<td><button class=\"cdTo\">" + "/" + element + "</button></td>" +
                            "<td><button class=\"delete\">delete</button></td>" +
                            "<td><button class=\"rename\">rename</button></td>" +
                            "<td>-</td>" +
                            "<td>" + curMtime + "</td>" +
                            "</tr>";
                    }

                });

                // console.log(lsinfo);

                let html = tmpl.toString().replace('@', lsinfo);
                html = html.replace('?', file_name);
                html = html.replace('$', file_content);
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(html);
            });
        });
    } else if (pathname === '/rename') {
        var body = '';
        console.log("rename called");
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            // console.log(post);

            let oldDirName = cur_path + "/" + post.old_title;
            let newDirName = cur_path + "/" + post.title;

            fs.rename(oldDirName, newDirName, (err) => {
                if (err) throw err;
                response.writeHead(302, { Location: `http://localhost:3000/` });
                response.end('success');
            });


        });
    } else if (pathname === '/editfile') {
        // 내 파일의 이름와 파일의 내용을 읽기
        // 새로운 파일을 읽거나 기존 파일을 수정한다.
        var body = '';
        console.log("editfile called");

        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            let title = post.title;
            let writingDescription = post.description;

            let file_path = path.join(cur_path, title);

            fs.writeFile(file_path, writingDescription, function(err, data) {
                // file_content = data;
                response.writeHead(302, { Location: `http://localhost:3000/` });
                response.end('success');
            });
        });
    } else if (pathname === '/rmfile') {
        // 내 파일의 이름와 파일의 내용을 읽기
        // 새로운 파일을 읽거나 기존 파일을 수정한다.
        var body = '';
        console.log("rmfile called");
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            // console.log(post.file_name);
            let removingFileName = post.file_name;

            let file_path = path.join(cur_path, removingFileName);

            fs.unlink(file_path, function(err, data) {

                response.writeHead(302, { Location: `http://localhost:3000/` });
                response.end('success');
            });

        });
    } else if (pathname === '/rmdir') {
        var body = '';
        console.log("rmdir called");

        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            let removingDirName = post.dir_name;

            let dir_path = path.join(cur_path, removingDirName);

            fs.rmdir(dir_path, function(err, data) {

                response.writeHead(302, { Location: `http://localhost:3000/` });
                response.end('success');
            });

        });
    } else if (pathname === '/readfile') {
        var body = '';
        console.log("readfile called");
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            file_name = post.file_name;
            //console.log(file_name);
            var file_path = path.join(cur_path, file_name);

            fs.readFile(file_path, 'utf8', function(err, data) {
                file_content = data;
                //console.log(file_content);
                response.writeHead(302, { Location: `http://localhost:3000/` });
                response.end("success");
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
    } else if (pathname === '/upto') {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            // cur_path = cur_path + "/" + destDir;
            let pathArray = cur_path.split("\\");
            temp_cur_path = "";
            for (let i = 0; i < pathArray.length - 2; i++) {
                temp_cur_path += pathArray[i] + "\\";
            }
            temp_cur_path += pathArray[pathArray.length - 2];

            //console.log(pathArray);
            //console.log(temp_cur_path);
            cur_path = temp_cur_path;
            response.writeHead(302, { Location: `http://localhost:3000/` });
            response.end('success');
        });
    } else if (pathname === '/cd') {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            let destDir = post.destDirName.split("/");
            console.log(destDir[1]);
            cur_path = cur_path + "\\" + destDir[1];
            console.log(cur_path);
            response.writeHead(302, { Location: `http://localhost:3000/` });
            response.end('success');
        });
    }
});

app.listen(3000);


function countdown(seconds) {
    return new Promise(function(resolve, reject) {
        for (let i = seconds; i >= 0; i--) {
            setTimeout(function() {
                if (i === 13) return reject(new Error("DEFINITELY NOT COUNTING THAT"));
                if (i > 0) console.log(i + '...');
                else resolve(console.log("GO!"));
            }, (seconds - i) * 1000);
        }
    });
}