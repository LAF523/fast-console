# Fast-Console
一个通过快捷键快速插入打印语句的插件,目前只支持最常用的两种: `console.log`和`console.dir`

[github地址,有使用问题欢迎提issues](https://github.com/LAF523/fast-console.git)

语句插入位置根据使用方式不同而不同: 

- 复制打印: 插入位置为鼠标所在行的上一行或者下一行
- 选中打印: 插入位置为选中文本的上一行或者下一行





### 快捷键介绍

+ 选中要打印的变量 or 函数 or anything(未选中时插入空的打印语句)
+ 按中组合键:`alt+1`,表示在鼠标位置上一行插入打印语句`console.log("$1:",$1)`(Mac为`cmd+1`)
+ 按中组合键:`alt+2`,表示在鼠标位置下一行插入打印语句`console.log("$1:",$1)`(Mac为`cmd+2`)
+ 按中组合键: `alt+shift+1`,表示在鼠标位置上一行插入语句`console.dir("$1:",$1)`(Mac为`cmd+shift+1`)
+ 按中组合键: `alt+shift+2`,表示在鼠标位置下一行插入语句`console.dir("$1:",$1)`(Mac为`cmd+shift+2`)