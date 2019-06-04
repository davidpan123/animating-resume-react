import React, { Component } from 'react';
import StyleEditor from './components/StyleEditor'
import ResumeEditor from './components/ResumeEditor'
import './assets/app.css'

class App extends Component {
    constructor() {
        super()
        this.state = {
            interval: 40,
            currentStyle: '',
            enableHtml: false,
            currentMarkdown: '',
            fullStyle: [
            `/*
* 大家好，我是davidpan
* 用code书写我的简历！
*/

/* 首先给所有元素加上过渡效果 */
* {
    transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
html {
    color: rgb(222,222,222); background: rgb(0,43,54);
}
/* 文字离边框太近了 */
.styleEditor {
    padding: .5em;
    border: 1px solid;
    margin: .5em;
    overflow: auto;
    width: 45vw; height: 90vh;
}
/* 代码高亮 */
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }

/* 加点 3D 效果呗 */
html{
    perspective: 1000px;
}
.styleEditor {
    position: fixed; left: 0; top: 0;
    -webkit-transition: none;
    transition: none;
    -webkit-transform: rotateY(10deg) translateZ(-100px) ;
            transform: rotateY(10deg) translateZ(-100px) ;
}

/* 接下来我给自己准备一个编辑器 */
.resumeEditor{
    position: fixed; right: 0; top: 0;
    padding: .5em;  margin: .5em;
    width: 48vw; height: 90vh;
    border: 1px solid;
    background: white; color: #222;
    overflow: auto;
}
/* 好了，我开始写简历了 */


`,
            `
/* 这个简历好像差点什么
* 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
* 简单，用开源工具翻译成 HTML 就行了
*/
`
            ,
            `
/* 再对 HTML 加点样式 */
.resumeEditor{
    padding: 2em;
}
.resumeEditor h2{
    display: inline-block;
    border-bottom: 1px solid;
    margin: 1em 0 .5em;
}
.resumeEditor ul,.resumeEditor ol{
    list-style: none;
}
.resumeEditor ul> li::before{
    content: '•';
    margin-right: .5em;
}
.resumeEditor ol {
    counter-reset: section;
}
.resumeEditor ol li::before {
    counter-increment: section;
    content: counters(section, ".") " ";
    margin-right: .5em;
}
.resumeEditor blockquote {
    margin: 1em;
    padding: .5em;
    background: #ddd;
}
`],
            fullMarkdown: `潘世良
----

前端工程师，目前就职于上海云首科技有限公司。

技能
----

* 前端开发
* Node.js 开发

工作经历
----

1. 上海云首科技有限公司-前端工程师
2. 西安海平方-前端工程师
3. Inetsoft-开发工程师

链接
----

* [GitHub](https://github.com/davidpan123)
* [我的文章](https://blog.csdn.net/davidPan1234)
`
        }
    }

    render() {
        return (
            <div id="App">
                <StyleEditor ref="styleEditor" code={this.state.currentStyle}></StyleEditor>
                <div className="resumeEditor">
                    <ResumeEditor ref="resumeEditor" markdown={this.state.currentMarkdown} enableHtml={this.state.enableHtml}></ResumeEditor>
                </div>
            </div>
        );
    }

    makeResume = async () => {
        await this.progressivelyShowStyle(0)
        await this.progressivelyShowResume()
        await this.progressivelyShowStyle(1)
        await this.showHtml()
        await this.progressivelyShowStyle(2)
    }

    showHtml () {
        return new Promise((resolve, reject) => {
            this.setState({enableHtml: true})
            resolve()
        })
    }

    progressivelyShowStyle (n) {
        return new Promise((resolve, reject) => {
            let interval = this.state.interval
            let showStyle = ( async () => {
                let style = this.state.fullStyle[n]
                if (!style) { return }
                // 计算前 n 个 style 的字符总数
                let length = this.state.fullStyle.filter((_, index) => index <= n).map(item => item.length).reduce((p, c) => p + c, 0)
                let prefixLength = length - style.length
                if (this.state.currentStyle.length < length) {
                    let l = this.state.currentStyle.length - prefixLength
                    let char = style.substring(l, l + 1) || ' '
                    this.setState({currentStyle: this.state.currentStyle + char})
                    if (style.substring(l - 1, l) === '\n' && this.refs.styleEditor) {
                        this.refs.styleEditor.goBottom()
                    }
                    setTimeout(showStyle, interval)
                } else {
                    resolve()
                }
            })
            showStyle()
        })
    }

    progressivelyShowResume () {
        return new Promise((resolve, reject) => {
            let length = this.state.fullMarkdown.length
            let interval = this.state.interval
            let showResume = () => {
                if (this.state.currentMarkdown.length < length) {
                    this.setState({currentMarkdown: this.state.fullMarkdown.substring(0, this.state.currentMarkdown.length + 1)})
                    let prevChar = this.state.currentMarkdown[this.state.currentMarkdown.length - 2]
                    if (prevChar === '\n' && this.refs.resumeEditor) {
                        this.refs.resumeEditor.goBottom()
                    }
                    setTimeout(showResume, interval)
                } else {
                    resolve()
                }
            }
            showResume()
        })
    }

    componentDidMount () {
        this.makeResume()
    }
}

export default App;
