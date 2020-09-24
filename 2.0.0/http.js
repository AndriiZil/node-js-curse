const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Request received');

  // 1. HTTP Method
  // 2. path-params and query
  // 3. request body
  // 4. header

  const method = req.method; // GET, POST, PUT ...
  const pathParamsAndQuery = req.url;
  const headers = req.headers;

  console.log('method', method);
  console.log('pathParamsAndQuery', pathParamsAndQuery);
  console.log('headers', headers);

  let body = '';

  req.on('data', (chunk) => {
    console.log('chunk', chunk);
    body += chunk.toString();
  });

  req.on('end', () => {
    // body received

    console.log('req', req);
  });

  res.writeHead(201, {
    'Content-Type': 'text/plain'
  });
  // res.statusCode = 201;
  res.end('End');

});

server.listen(3000, () => console.log('Server started on port 3000'));
