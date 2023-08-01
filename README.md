# Fast-Console
一个通过快捷键快速插入打印语句的插件,目前只支持最常用的两种: `console.log`和`console.dir`,
使用时会在指定位置的上一行或下一行插入:`console.log/dir("$1:",$1)`,
## 使用步骤
+ 选中要打印的变量 or 函数 or anything(未选中时插入空的打印语句)
+ 按中组合键:`alt+1`,表示在选中位置上一行插入打印语句`console.log("$1:",$1)`(Mac为`cmd+1`)
+ 按中组合键:`alt+2`,表示在选中位置下一行插入打印语句`console.log("$1:",$1)`(Mac为`cmd+2`)
+ 按中组合键: `alt+shift+1`,表示在选中位置上一行插入语句`console.dir("$1:",$1)`(Mac为`cmd+shift+1`)
+ 按中组合键: `alt+shift+2`,表示在选中位置下一行插入语句`console.dir("$1:",$1)`(Mac为`cmd+shift+2`)