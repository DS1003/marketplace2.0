const fs = require('fs');
const path = require('path');

// Mappings from Lucide to Reicon
const mapping = {
  LayoutDashboard: 'Category', // or Home
  Users: 'Users',
  ShoppingBag: 'ShoppingBag',
  Settings: 'Setting2',
  LogOut: 'Logout',
  Bell: 'Notification',
  Search: 'SearchNormal',
  ChevronRight: 'ArrowRight2',
  TrendingUp: 'TrendUp',
  Package: 'Box',
  Store: 'Shop',
  MessageCircle: 'Message',
  Filter: 'Filter',
  Trash2: 'Trash',
  Star: 'Star1',
  MoreVertical: 'More',
  Mail: 'Sms',
  CheckCircle2: 'TickCircle',
  Send: 'Send2',
  ExternalLink: 'Maximize4',
  Plus: 'Add',
  X: 'CloseSquare',
  Clock: 'Clock',
  User: 'User',
  Eye: 'Eye',
  CheckCircle: 'TickCircle',
  Truck: 'TruckFast',
  ShieldAlert: 'ShieldCross',
  Printer: 'Printer',
  Download: 'Import',
  AlertCircle: 'Danger',
  XCircle: 'CloseCircle',
  DollarSign: 'DollarCircle',
  ArrowRight: 'ArrowRight',
  SlidersHorizontal: 'SliderHorizontal',
  Edit: 'Edit2',
  Trash: 'Trash',
  Tag: 'Tag',
  MapPin: 'Location',
  Check: 'TickSquare',
  Globe: 'Global',
  ShieldCheck: 'ShieldTick',
  Calendar: 'Calendar',
  Info: 'InfoCircle',
  Loader2: 'Refresh',
  ChevronLeft: 'ArrowLeft2',
  Settings2: 'Setting3',
  EyeOff: 'EyeSlash',
  Shield: 'ShieldSearch',
  Database: 'Data',
  CreditCard: 'Card',
  Smartphone: 'Mobile',
  Save: 'Save2',
  Lock: 'Lock1',
  Palette: 'ColorSwatch',
  UserCheck: 'UserTick',
  UserX: 'UserMinus',
  Activity: 'Activity',
  ArrowUpRight: 'ArrowUp2',
  ArrowDownRight: 'ArrowDown2',
  BarChart3: 'Chart',
  PieChart: 'ChartPie',
  MousePointer2: 'Mouse',
  Zap: 'Flash',
  Target: 'Target',
  Sparkles: 'MagicStar',
  Wallet: 'Wallet',
  Phone: 'Call',
  MoreHorizontal: 'More',
  ArrowUpDown: 'ArrowSwapVertical',
  BadgeCheck: 'Verify',
  ArrowLeft: 'ArrowLeft',
  Award: 'Award',
  Building2: 'Building',
  Camera: 'Camera',
  History: 'Timer1',
  Command: 'Command',
  Image: 'Image',
  Leaf: 'Category',
  UploadCloud: 'CloudPlus'
};

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

// We must make sure Reicon actually has these mapped icons. I'll just use a fallback if they don't exist.
const reiconDir = path.resolve(__dirname, 'node_modules/reicon-react/icons');
let availableIcons = new Set();
if (fs.existsSync(reiconDir)) {
  fs.readdirSync(reiconDir).forEach(f => {
    if (f.endsWith('.js')) {
      availableIcons.add(f.replace('.js', ''));
    }
  });
}

function getBestMatch(lucideName) {
  if (mapping[lucideName] && availableIcons.has(mapping[lucideName])) {
    return mapping[lucideName];
  }
  if (availableIcons.has(lucideName)) {
    return lucideName;
  }
  // Try to find a partial match
  for (let icon of availableIcons) {
    if (icon.toLowerCase() === lucideName.toLowerCase()) return icon;
    if (icon.toLowerCase().includes(lucideName.toLowerCase().replace('circle', ''))) return icon;
  }
  return 'Box'; // fallback
}

allFiles.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Find all lucide-react imports
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/g;
  let hasChanges = false;
  
  content = content.replace(importRegex, (match, importsStr) => {
    hasChanges = true;
    const imports = importsStr.split(',').map(s => s.trim()).filter(s => s);
    const newImports = [];
    
    imports.forEach(imp => {
      const parts = imp.split(' as ');
      const originalName = parts[0].trim();
      const aliasName = parts.length > 1 ? parts[1].trim() : originalName;
      
      const newName = getBestMatch(originalName);
      
      // We also need to replace the component names in the JSX if they weren't aliased
      if (parts.length === 1 && newName !== originalName) {
        // Regex to replace <OriginalName ... or </OriginalName>
        const jsxRegex = new RegExp(`<(\/?)${originalName}(>|\\s)`, 'g');
        content = content.replace(jsxRegex, `<$1${newName}$2`);
        // Replace in object arrays like icon: OriginalName
        const objRegex = new RegExp(`icon:\\s*${originalName}\\b`, 'g');
        content = content.replace(objRegex, `icon: ${newName}`);
      }
      
      if (parts.length > 1 || newName === originalName) {
         newImports.push(imp); // Keep alias structure or exact name if it matched exactly
      } else {
         newImports.push(newName);
      }
    });
    
    // De-duplicate imports
    return `import { ${Array.from(new Set(newImports)).join(', ')} } from "reicon-react"`;
  });
  
  if (hasChanges) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated ${f}`);
  }
});
