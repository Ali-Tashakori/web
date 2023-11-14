let http= require ('http');
let port = (80);
let server = http.createServer(requestHandler);
server.listen(port);
console.log("server is running on port"+port);
let headers ={'Content-Type':'Text/plane'};
let headers_html ={'Content-Type':'Text/html'};
let obj={
x:function(response){
console.log('montazeri')


},
y:function(response){
    console.log('mamad')
    response.writeHead(200,headers_html);
    response.write(`
    <html>
    <head>
    <style>
div{
    background:green;
    color:black;
    width:200px;
    height:200px;
}
    </style>
    </head>
    <body>
    <div>
    good by  <strong> Anyone </strong>
    </div>
    </body>
</html>
    `);
    response.end();

}

}

function requestHandler(request,response){
//console.log('request url:',request.url);
//console.log('request method:',request.method);
let firstpart= request.url.split('/')[1];

obj [firstpart](response);



}