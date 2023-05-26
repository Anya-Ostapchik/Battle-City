const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "127.0.0.1";
const port = 4000;

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
    
    switch (req.url) {
        case "/":
            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end("<h1>This is the main page of our server</h1>");

            break;
        case "/users":
            const buffers = [];
 
            for (const chunk of req) {
                buffers.push(chunk);
            }
    
            // const user = JSON.parse(Buffer.concat(buffers).toString());
            // console.log(user);
            res.end("Данные успешно получены");
            break;
        default:
            res.writeHead(404, {
                "Content-Type": "text/html"
            });

            res.end("<h1>404 Error</h1><p>Content not found</p>");

            break;
    }
});

server.listen(port, host, () => {
    console.log('Srever is running');
})