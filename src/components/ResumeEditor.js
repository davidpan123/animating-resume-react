import React, {Component} from 'react'
import marked from 'marked'
import '../assets/resumeEditor.css'
class resumeEditor extends Component {
    renderMarkdown () {
        if (this.props.enableHtml) {
            return <div dangerouslySetInnerHTML={{ __html: marked(this.props.markdown) }}></div> 
        } else {
            return <pre>{this.props.markdown}</pre>
        }
    }

    render () {
        return (
            <div className={this.props.enableHtml ? 'htmlMode' : null} ref="container">
                { this.renderMarkdown() }
            </div>
        )
    }

    goBottom () {
        this.refs.container.scrollTop = 100000
    }

    goTop () {
        this.refs.container.scrollTop = 0
    }
}

export default resumeEditor