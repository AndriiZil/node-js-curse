const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Request received');

  // 1. HTTP method
  // 2. path-params and query
  // 3 . request body
  // 4. header

  const method = req.method; // GET POST PUT ...
  const pathParamsAndQuery = req.url;
  const headers = req.headers;
  let body = '';

  req.on('data', (bodyChank) => {
    console.log('bodyChank', bodyChank);
    body += bodyChank.toString()
  })

  req.on('end', () => {
    // body received
    console.log('req', req);

    res.writeHead(200, {
      'Content-Type': 'text/plain'
    })
    res.end(body);
  })

})

server.listen(3000, () => {
  console.log('Server was started on port ', 3000);
})
