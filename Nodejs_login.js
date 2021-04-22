var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templete_html(flag){
    return `
    <!doctype html>
            <html>
            <head>
              <title>WEB1 - Login</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1>Login</h1>
            <form action="/login" method="post">
              <p><input type="text" name="id" placeholder="ID"></p>
              <p><input type="password" name="password" placeholder="PASSWORD"></p>
              <input type="submit">
            </form>
            ${flag}
            </body>
            </html>`;
}

function chk_login(id, password){
    let i = 0;
    let flag = 0;
    fs.readdir('./data', function (err, filelist) {
                fs.readFile(`./data/${filelist[0]}`, 'utf8', function (err, data) {
                        if (password === data && id === filelist[0])
                            return ('성공');
                })
            })
}

let app = http.createServer(function(request,response){
    let url_name = request.url;
    if (url_name == '/'){
        let temp = templete_html("");
        response.writeHead(200);
        response.end(temp);
    } //홈 에서 그냥 html불러오는 코드
    else if(url_name == '/login'){
        let temp = templete_html("<h2>성공!!</h2>");
        let body = '';
        request.on('data',function(data){
            body = body + data;
        })
        request.on('end',function(){// async await부분
            let post = qs.parse(body);
            let id = post.id;
            let password = post.password;
            let flag = chk_login(id,password);
            console.log(flag);
        })
        response.writeHead(200);
        response.end(temp);
    } // submit버튼 누를 시 /login페이지로 넘어가서 맞는지 안 맞는지 비교하는 코드 
    else{
        response.writeHead(404);
        response.end("Fail");
    }
})
app.listen(3000);