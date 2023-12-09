const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;

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
    fn: () => addConsole('log', 0),
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

/**
 * @message: 插入console字符串
 * @param {'log'|'dir'} type console类型
 * @param {*} line 插入位置偏移量
 * @since: 2023-08-01 18:29:32
 */
async function addConsole(type = 'log', line) {
  const nextPos = getInsterPos(line);
  const indent = getIndents();
  const snippet = await getText(type, indent);

  insertText(snippet, nextPos);
}

/**
 * @message: 获取打印位置
 * @param {Number} line 0 上一行 1下一行
 * @return {object} 打印位置对象,包含位置信息
 * @since: 2023-08-14 02:05:45
 */
const getInsterPos = (line = 1) => {
  const prevPos = editor.selection.active;
  return new vscode.Position(prevPos.line + line, 0);
};

/**
 * @message: 获取缩进
 * @return {String} 匹配到的缩进
 * @since: 2023-12-09 12:26:24
 */
function getIndents() {
  const prevPos = editor.selection.active;
  const document = editor.document;
  const lineText = document.lineAt(prevPos.line);
  const indent = new Array(lineText.firstNonWhitespaceCharacterIndex)
    .fill(' ')
    .join('');
  return indent;
}

/**
 * @message: 生成打印语句,优先使用选中的值,选中的值为空,使用copy的值,copy的值为空,使用空
 * @param {'log'|'dir'} type 打印类型
 * @param {String} indent 表示需要缩进的长度
 * @return {Promise}
 * @since: 2023-08-14 01:52:37
 */
const getText = async (type, indent) => {
  if (!editor) return '';
  let targetText;
  let snippet;
  const selection = editor.selection;
  targetText = editor.document.getText(selection);
  if (targetText === '') {
    targetText = await vscode.env.clipboard.readText();
  }
  if (targetText === '') {
    snippet = `${indent}console.${type}();`;
  } else {
    snippet = `${indent}console.${type}("${targetText}:",${targetText});`;
  }
  return new vscode.SnippetString(snippet);
};

/**
 * @message: 插入打印语句
 * @param {*} snippet 打印语句
 * @param {*} nextPos 插入位置
 * @since: 2023-08-14 02:05:08
 */
const insertText = (snippet, nextPos) => {
  editor.insertSnippet(snippet, nextPos).then(() => {
    vscode.commands.executeCommand('type', {
      text: '\n',
    });
    cursorMove('left', 3);
  });
};
/**
 * @message: 移动光标
 * @param {*} direction 方向
 * @param {*} distance 步长
 * @since: 2023-08-01 18:23:36
 */
function cursorMove(direction, distance = 1) {
  for (let i = 0; i < distance; i++) {
    vscode.commands.executeCommand('cursorMove', {
      to: direction, // 向右移动一个位置
      by: 'character', // 移动的单位为字符
      value: 1, // 移动的数量为1个字符
      select: false, // 不选中文本
    });
  }
}

module.exports = {
  activate,
  deactivate,
};
