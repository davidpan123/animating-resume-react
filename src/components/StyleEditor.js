import React, {Component} from 'react'
import Prism from 'prismjs'
class StyleEditor extends Component {
    render () {
        let codeInStyleTag = `<style>${this.props.code}</style>`
        let highlightedCode =  Prism.highlight(this.props.code, Prism.languages.css)
        return (
            <div className="styleEditor" ref="container">
                <div className="code" dangerouslySetInnerHTML={{ __html: codeInStyleTag }}></div>
                <pre dangerouslySetInnerHTML={{ __html: highlightedCode }}></pre>
            </div>
        )
    }

    goBottom () {
        this.refs.container.scrollTop = 100000
    }
}

export default StyleEditor