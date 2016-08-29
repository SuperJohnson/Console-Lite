const os = require('os');
const { Menu, app, shell } = require('electron');

function supportsTitlebarStyle() {
  if(os.platform() !== 'darwin') return false;
  const mainVer = parseInt(os.release().split('.')[0], 10);
  return Number.isInteger(mainVer) && mainVer >= 14; // 14 -> Yosemite
}

function isWindows() {
  return os.platform() === 'win32';
}

function getControllerMenu() {
  const tmpl = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectall' },
      ],
    },

    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click(item, focusedWindow) {
            if(focusedWindow) focusedWindow.reload();
          },
        },
        {
          label: 'I am a developer',
          accelerator: os.platform() === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if(focusedWindow) focusedWindow.webContents.toggleDevTools();
          },
        },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },

    {
      role: 'window',
      submenu: [
        {
          role: 'minimize',
        },
        {
          role: 'close',
        },
      ],
    },

    {
      role: 'help',
      submenu: [
        {
          label: 'Guide',
          click() { shell.openExternal('http://kb.bjmun.org/console-lite'); },
        },
        {
          label: 'Shortcut Cheatsheet',
          click() { shell.openExternal('http://kb.bjmun.org/console-lite/cheatsheet.html'); },
        },
        { type: 'separator' },
        {
          label: 'About Electron',
          click() { shell.openExternal('http://electron.atom.io'); },
        },
      ],
    },
  ];

  if(os.platform() === 'darwin') {
    tmpl.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        {
          role: 'services',
          submenu: [],
        },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });

    tmpl[1].submenu.push(
      { type: 'separator' },
      {
        label: '语音',
        submenu: [
          {
            role: 'startspeaking',
          },
          {
            role: 'stopspeaking',
          },
        ],
      }
    );

    tmpl[3].submenu = [
      {
        accelerator: 'CmdOrCtrl+W',
        role: 'close',
      },
      {
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
      {
        role: 'zoom',
      },
      {
        type: 'separator',
      },
      {
        role: 'front',
      },
    ];
  } else tmpl[0].submenu.push({ role: 'quit' });

  return Menu.buildFromTemplate(tmpl);
}

function applyControllerMenu(win) {
  const menu = getControllerMenu();
  if(os.platform() === 'darwin')
    Menu.setApplicationMenu(menu);
  else
    win.setMenu(menu);
}

function getProjectorMenu() {
  const tmpl = [
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click(item, focusedWindow) {
            if(focusedWindow) focusedWindow.reload();
          },
        },
        {
          label: 'I am a developer',
          accelerator: os.platform() === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if(focusedWindow) focusedWindow.webContents.toggleDevTools();
          },
        },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },

    {
      role: 'window',
      submenu: [
        {
          role: 'minimize',
        },
        {
          role: 'close',
        },
      ],
    },
  ];

  return Menu.buildFromTemplate(tmpl);
}

function applyProjectorMenu(win) {
  if(os.platform() === 'darwin') return;
  win.setMenu(getProjectorMenu());
}

module.exports = {
  supportsTitlebarStyle,
  isWindows,
  getControllerMenu,
  applyControllerMenu,
  getProjectorMenu,
  applyProjectorMenu,
};
