const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const res = path.resolve(dir, file);
    if (fs.statSync(res).isDirectory()) {
      getFiles(res, files);
    } else if (res.endsWith('.ts') || res.endsWith('.tsx')) {
      files.push(res);
    }
  }
  return files;
}

const dirs = ['app/admin', 'app/seller', 'components/admin', 'components/seller'];
const allFiles = [];
dirs.forEach(d => getFiles(path.resolve(__dirname, d), allFiles));

const icons = new Set();
allFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const match = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
  if (match) {
    match[1].split(',').map(s => s.trim()).filter(s => s).forEach(i => {
      // Handle aliased imports like Search as CommandIcon
      const baseIcon = i.split(' as ')[0].trim();
      icons.add(baseIcon);
    });
  }
});

console.log(Array.from(icons).join(', '));
