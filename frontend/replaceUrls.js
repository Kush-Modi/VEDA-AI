const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('e:/VEDA AI/vedaai-assignment/frontend');
files.forEach(fullPath => {
  let content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes('http://localhost:5000')) {
    content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, '`${process.env.NEXT_PUBLIC_API_URL || \'http://localhost:5000\'}$1`');
    content = content.replace(/"http:\/\/localhost:5000([^"]*)"/g, '`${process.env.NEXT_PUBLIC_API_URL || \'http://localhost:5000\'}$1`');
    content = content.replace(/`http:\/\/localhost:5000([^`]*)`/g, '`${process.env.NEXT_PUBLIC_API_URL || \'http://localhost:5000\'}$1`');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated ' + fullPath);
  }
});
