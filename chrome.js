// 参考资料：
// https://docs.microsoft.com/en-us/previous-versions/9bbdkx3k(v=vs.85)
// https://docs.microsoft.com/en-us/previous-versions/aew9yb99(v=vs.85)
// https://docs.microsoft.com/en-us/troubleshoot/windows-client/admin-development/create-desktop-shortcut-with-wsh
// https://devblogs.microsoft.com/scripting/how-can-i-add-a-shortcut-to-the-quick-launch-tray/
// https://chromium.googlesource.com/chromium/src/+/HEAD/docs/windows_shortcut_and_taskbar_handling.md

var shell = WScript.CreateObject('WScript.Shell');

// var folders = [
//   'AllUsersDesktop',
//   'AllUsersStartMenu',
//   'AllUsersStartup',
//   'Desktop',
//   'StartMenu',
//   'Startup',
// ];
// for (var i = 0; i < folders.length; i++) {
//   WScript.Echo(shell.SpecialFolders(folders[i]));
// }

var allFolders = [
  shell.SpecialFolders('AllUsersDesktop'),
  shell.SpecialFolders('Desktop'),
  shell.Environment('Volatile')('APPDATA') + '\\Microsoft\\Internet Explorer\\Quick Launch',
  shell.Environment('Volatile')('APPDATA') + '\\Microsoft\\Internet Explorer\\Quick Launch\\User Pinned\\TaskBar',
];

// 检查 ImplicitAppShortcuts 下面的子目录是否包含 Google Chrome 快捷方式
var fso = WScript.CreateObject('Scripting.FileSystemObject');
var implicitAppShortcuts = fso.GetFolder(shell.Environment('Volatile')('APPDATA') + '\\Microsoft\\Internet Explorer\\Quick Launch\\User Pinned\\ImplicitAppShortcuts');
var fc = new Enumerator(implicitAppShortcuts.SubFolders);
while (!fc.atEnd()) {
  allFolders.push(fc.item());
  fc.moveNext();
}

foldersContainingGoogleChromeShortcut = [];
for (var i = 0; i < allFolders.length; i++) {
  if (fso.FileExists(allFolders[i] + '\\Google Chrome.lnk')) {
    foldersContainingGoogleChromeShortcut.push(allFolders[i]);
  }
}

if (foldersContainingGoogleChromeShortcut.length === 0) {
  WScript.Echo('未在系统中未发现任何 Google Chrome 快捷方式！请确保正常安装了 Google Chrome！');
  WScript.Quit();
}

var commandLineArgument = '--js-flags="--max-old-space-size=2048 --expose-gc"';
var button = shell.Popup(
  '在以下目录发现 Google Chrome 快捷方式，是否把它们的命令行参数都修改为 ' + commandLineArgument + '？\n\n' + foldersContainingGoogleChromeShortcut.join('\n\n'),
  0,
  '修改 Google Chrome 命令行参数',
  0x24
);
// 6 - Yes, 7 - No
if (button === 7) {
  WScript.Quit();
}
for (var i = 0; i < foldersContainingGoogleChromeShortcut.length; i++) {
  var shortcut = shell.CreateShortcut(foldersContainingGoogleChromeShortcut[i] + '\\Google Chrome.lnk');
  shortcut.Arguments = commandLineArgument;
  shortcut.Save();
}
shell.Popup('已成功修改 Google Chrome 命令行参数！');
