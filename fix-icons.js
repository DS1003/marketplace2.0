const fs = require('fs');
const path = require('path');

const mapping = {
  LayoutDashboard: 'Category',
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
  for (let icon of availableIcons) {
    if (icon.toLowerCase() === lucideName.toLowerCase()) return icon;
    if (icon.toLowerCase().includes(lucideName.toLowerCase().replace('circle', ''))) return icon;
  }
  return 'Box'; 
}

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

allFiles.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let hasChanges = false;
  
  for (const [lucideName, mappedName] of Object.entries(mapping)) {
      const newName = getBestMatch(lucideName);
      if (newName !== lucideName) {
          // Replace JSX tags: <LucideName or </LucideName
          const jsxRegex = new RegExp(`<(\\\/?)` + lucideName + `(>|\\s)`, 'g');
          if (jsxRegex.test(content)) {
             content = content.replace(jsxRegex, `<$1${newName}$2`);
             hasChanges = true;
          }
          // Replace object props: icon: LucideName
          const objRegex = new RegExp(`icon:\\s*${lucideName}\\b`, 'g');
          if (objRegex.test(content)) {
             content = content.replace(objRegex, `icon: ${newName}`);
             hasChanges = true;
          }
          // Also if they were passed as components: icon={LucideName}
          const propRegex = new RegExp(`=\\{${lucideName}\\b`, 'g');
          if (propRegex.test(content)) {
             content = content.replace(propRegex, `={${newName}`);
             hasChanges = true;
          }
      }
  }
  
  // also fix duplicate `Card` imports from lucide-react if they exist, wait Card is not in the list
  if (hasChanges) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Fixed ${f}`);
  }
});
