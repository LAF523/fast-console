const vscode = require('vscode');

/**
 * @message: 插件激活时触发
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
function addConsole(type = "log",line = 1){
  const editor = vscode.window.activeTextEditor;
  if(!editor) return
  const selection = editor.selection;
  const document = editor.document
  const selectionText = editor.document.getText(selection);

  // 创建代码片段
  let str
  if(selectionText === ""){
    str = `console.${type}();`
  }else {
    str = `console.${type}("${selectionText}:",${selectionText});`
  }
  const snippet = new vscode.SnippetString(str);

  // 设置插入片段的位置
  const prevPos = editor.selection.active;
  const lineText = document.lineAt(prevPos.line).b
  const lineTextLen = lineText.length
  let colum = 0
  for(let i = 0; i < lineTextLen; i++){
    if(lineText[i] !== " "){
      colum = i
      break;
    }
  }
  const nextPos = new vscode.Position(prevPos.line+line, colum)

  // 插入代码片段
  editor.insertSnippet(snippet,nextPos).then(() => {
    vscode.commands.executeCommand('type', {
        text: '\n',
    });
    cursorMove("left",3)
  });
}

/**
 * @message: 将光标移动
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


module.exports = {
	activate,
	deactivate
}
