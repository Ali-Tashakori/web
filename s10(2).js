const http = require("http");
const fs = require("fs");
const PORT = 8080;
const server = http.createServer(requestHandler);

server.listen(PORT);


console.log(`server listen in Port ${PORT}`);
let headers = {
  text: { "Content-Type": "Text/Plain" },
  html: { "Content-Type": "Text/Html" },
};


const routes = {
  page: pageHandler,
  method: methodController,
  db: getUserData,
  insert: updateDB,
  404: pageNotFound,
};
function write(res, statusCode, headerType, body) {
  res.writeHead(statusCode, headers[headerType]);
  res.write(body);
  res.end();
}
function getUserData() {
  fs.readFile('userdata.json' , function (err , fileData) {
    fileData = JSON.parse(fileData);
    console.log(fileData);
  })
}

function updateDB(req, res) {
  insertData(req , res ,'phonenumber' , '09386230777')
  insertData(req , res ,'age' , '20')
}

function insertData(req, res , index , value) {
  fs.readFile('userdata.json' , function (err , fileData) {

    fileData = JSON.parse(fileData);
    fileData[index] = value;

    fs.writeFile('userdata.json' , JSON.stringify(fileData) , 'utf8' , function ( err ) {
      if (err) {
        console.log('data failed');
        write(res , 200 , headers.text , 'data failed');
      } else {
        console.log('data created');
        write(res , 200 , headers.text , 'data created');
  
  
      }
    })
  


    console.log(fileData);
  })
}


function methodController(req, res, data) {
  console.log('boop boop', data);
  fs.writeFile('userdata.json' , data , 'utf8' , function ( err ) {
    if (err) {
      console.log('data failed');
      write(res , 200 , headers.text , 'data failed');
    } else {
      console.log('data created');
      write(res , 200 , headers.text , 'data created');


    }
  })
}

function pageHandler(req, res) {
  let fileName = req.url.split("/")[2];
  fs.readFile(fileName, (err, data) => {
    if (err) {
      pageNotFound(req, res);
    } else {
      write(res, 200, "html", data);
    }
  });
}

function pageNotFound(req, res) {
  fs.readFile("./404.html",  (err, data) => {
    write(res, 404, "html", data);
  });
}

function requestHandler(req, res) {
  let route = req.url.split("/")[1];

  if (route != "favicon.ico") {

    try {


      let body = '';
      req.on("data", function (chunck) {
        body += chunck;
      })
      req.on("end", function () {
        routes[route](req, res, body);
        console.log('Final data is ', body);
      })



    } catch (err) {
      routes["404"](req, res);
    }

  }


}