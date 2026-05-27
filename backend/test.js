const http = require('http');

const data = JSON.stringify({
  title: 'Test',
  dueDate: '2025-01-01',
  questionTypes: [
    { type: 'Multiple Choice Questions', count: 5, marks: 1 }
  ]
});

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/assignment',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Response:', res.statusCode, body));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
