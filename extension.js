const vscode = require('vscode');
const {addConsole} = require('./main/index.js')

const commandMap = [
  {
    name: 'fast-console.log.nextline',
    fn: () => addConsole('log'),
  },
  {
    name: 'fast-console.log.prevline',
    fn: () => addConsole('log', 0),
  },
  {
    name: 'fast-console.dir.nextline',
    fn: () => addConsole('log'),
  },
  {
    name: 'fast-console.dir.prevline',
    fn: () => addConsole('log', 0),
  },
];

/**
 * @message: 插件激活时触发,注册命令
 * @param {vscode.ExtensionContext} context
 * @since: 2023-08-01 16:16:33
 */
function activate(context) {
  commandMap.map(({ name, fn }) =>
    context.subscriptions.push(vscode.commands.registerCommand(name, fn))
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
