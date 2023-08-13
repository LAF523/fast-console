const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;

/**
 * @message: 插件激活时触发,注册命令
 * @param {vscode.ExtensionContext} context
 * @since: 2023-08-01 16:16:33
 */
function activate(context) {
	context.subscriptions.push(
    vscode.commands.registerCommand('fast-console.log.nextline',()=> addConsole()),
    vscode.commands.registerCommand('fast-console.log.prevline',()=>addConsole("log",0)),
    vscode.commands.registerCommand('fast-console.dir.nextline',()=> addConsole("dir")),
    vscode.commands.registerCommand('fast-console.dir.prevline',()=> addConsole("dir",0))
  );
}

function deactivate() {}

/**
 * @message: 插入console字符串
 * @param {*} type console类型
 * @param {*} line 插入位置偏移量
 * @since: 2023-08-01 18:29:32
 */
async function addConsole(type = "log",line){
  const nextPos = getInsterPos(line)
  const snippet = await getText(type)
  insertText(snippet,nextPos)
}

/**
 * @message: 移动光标
 * @param {*} direction 方向
 * @param {*} distance 步长
 * @since: 2023-08-01 18:23:36
 */
function cursorMove(direction,distance = 1){
  for(let i = 0; i < distance; i++){
    vscode.commands.executeCommand('cursorMove', {
      to: direction, // 向右移动一个位置
      by: 'character', // 移动的单位为字符
      value: 1, // 移动的数量为1个字符
      select: false, // 不选中文本
    });
  }
}

/**
 * @message: 生成打印语句,优先使用选中的值,选中的值为空,使用copy的值,copy的值为空,使用空
 * @param {*} type 打印类型
 * @return {Promise}
 * @since: 2023-08-14 01:52:37
 */
const getText = async (type) => {
  if(!editor) return
  let targetText;
  let snippet;
  const selection = editor.selection;
  targetText = editor.document.getText(selection);
  if(targetText === ""){
    targetText = await vscode.env.clipboard.readText()
  }
  if(targetText === ""){
    snippet = new vscode.SnippetString(`console.${type}();`);
  }else {
    snippet = new vscode.SnippetString(`console.${type}("${targetText}:",${targetText});`);
  }
  return snippet
}
/**
 * @message: 获取打印位置
 * @param {Number} line 当前位置偏移量
 * @return {object} 打印位置对象,包含位置信息
 * @since: 2023-08-14 02:05:45
 */
const getInsterPos = (line = 1) => {
    const prevPos = editor.selection.active;
    const document = editor.document
    const lineText = document.lineAt(prevPos.line).b
    const lineTextLen = lineText.length
    let colum = 0
    for(let i = 0; i < lineTextLen; i++){
      if(lineText[i] !== " "){
        colum = i
        break;
      }
    }
    return new vscode.Position(prevPos.line+line, colum)
}
/**
 * @message: 插入打印语句
 * @param {*} snippet 打印语句
 * @param {*} nextPos 插入位置
 * @since: 2023-08-14 02:05:08
 */
const insertText = (snippet,nextPos) => {
  editor.insertSnippet(snippet,nextPos).then(() => {
    vscode.commands.executeCommand('type', {
        text: '\n',
    });
    cursorMove("left",3)
  });
}


module.exports = {
	activate,
	deactivate
}
