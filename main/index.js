const vscode = require("vscode");
const os = require("os");

/**
 * @message: 插入console字符串
 * @param {'log'|'dir'} type console类型
 * @param {*} line 插入位置偏移量
 * @since: 2023-08-01 18:29:32
 */
async function addConsole(type = "log", line) {
  const nextPos = getInsterPos(line);
  const indent = getIndents();
  const snippet = await getText(type, indent);
  await insertText(snippet, nextPos);
  cursorMove("left", 3);
}

/**
 * @message: 获取打印位置
 * @param {Number} line 0 上一行 1下一行
 * @return {object} 打印位置对象,包含位置信息
 * @since: 2023-08-14 02:05:45
 */
function getInsterPos(line = 1) {
  const prevPos = vscode.window.activeTextEditor.selection.active;
  return new vscode.Position(prevPos.line + line, 0);
}

/**
 * @message: 获取缩进
 * @return {String} 匹配到的缩进
 * @since: 2023-12-09 12:26:24
 */
function getIndents() {
  const editor = vscode.window.activeTextEditor;
  const prevPos = editor.selection.active;
  const document = editor.document;
  const lineText = document.lineAt(prevPos.line);
  const indent = new Array(lineText.firstNonWhitespaceCharacterIndex)
    .fill(" ")
    .join("");
  return indent;
}

/**
 * @message: 生成打印语句,优先使用选中的值,选中的值为空,使用copy的值,copy的值为空,使用空
 * @param {'log'|'dir'} type 打印类型
 * @param {String} indent 表示需要缩进的长度
 * @return {Promise}
 * @since: 2023-08-14 01:52:37
 */
async function getText(type, indent) {
  const editor = vscode.window.activeTextEditor;
  let targetText;
  let snippet;
  const selection = editor.selection;
  targetText = editor.document.getText(selection);
  if (targetText === "") {
    targetText = await vscode.env.clipboard.readText();
  }
  if (targetText === "") {
    // os.EOL 使用系统的换行符,抹平不同系统换行符的差异
    snippet = `${indent}console.${type}();${os.EOL}`;
  } else {
    snippet = `${indent}console.${type}("${targetText}:",${targetText});${os.EOL}`;
  }
  return new vscode.SnippetString(snippet);
}

/**
 * @message: 插入打印语句
 * @param {*} snippet 打印语句
 * @param {*} nextPos 插入位置
 * @since: 2023-08-14 02:05:08
 */
async function insertText(snippet, nextPos) {
  const editor = vscode.window.activeTextEditor;
  await editor.insertSnippet(snippet, nextPos);
}
/**
 * @message: 移动光标
 * @param {*} direction 方向
 * @param {*} distance 步长
 * @since: 2023-08-01 18:23:36
 */
function cursorMove(direction, distance = 1) {
  for (let i = 0; i < distance; i++) {
    vscode.commands.executeCommand("cursorMove", {
      to: direction, // 向右移动一个位置
      by: "character", // 移动的单位为字符
      value: 1, // 移动的数量为1个字符
      select: false, // 不选中文本
    });
  }
}

module.exports = {
  addConsole,
};
