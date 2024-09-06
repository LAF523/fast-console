# Fast-Console

一个通过快捷键快速插入打印语句的插件

[github 地址,有使用问题欢迎提 issues](https://github.com/LAF523/fast-console.git)

### 在任意位置打印:

1. **复制**想要打印的内容`targetText`
2. 移动鼠标至**任意行**
3. 按下组合键`alt+1`,将在光标的下一行插入代码: `console.log('targetText:',targetText);`

###  在选中位置打印:

1. **选中**想要打印的内容`targetText`
2. 按下组合键`alt+1`,**将在`targetText`下一行**插入代码`console.log('targetText:',targetText);`

### 插入空打印语句:

1. 未选中/复制任何内容
2. 按下组合键`alt+1`,将在鼠标所在的下一行插入代码`console.log()`

### 快捷键详情

- 选中要打印的变量 or 函数 or anything(未选中时插入空的打印语句)
- 按中组合键:`alt+1`,表示在鼠标位置上一行插入打印语句`console.log("$1:",$1)`(Mac 为`cmd+1`)
- 按中组合键:`alt+2`,表示在鼠标位置下一行插入打印语句`console.log("$1:",$1)`(Mac 为`cmd+2`)
- 按中组合键: `alt+shift+1`,表示在鼠标位置上一行插入语句`console.dir("$1:",$1)`(Mac 为`cmd+shift+1`)
- 按中组合键: `alt+shift+2`,表示在鼠标位置下一行插入语句`console.dir("$1:",$1)`(Mac 为`cmd+shift+2`)
