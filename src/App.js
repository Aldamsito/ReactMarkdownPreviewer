import logo from './logo.svg';
import './App.css';

import { marked } from 'marked';
import Prism from "prism-react-renderer/prism";
import React from 'react';

const projectName = "markdown-previewer";

const authorName = "aldams";

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  }
});

const renderer = new marked.Renderer();

renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

//Classes
const Toolbar = (props) => {
  const btnID = props.text+"Btn";
  return (
    <div className="toolbar">
      {props.text}
      <i id={btnID} className={props.icon} onClick={props.onClick} />
    </div>
  );
};

const Editor = (props) => {
  return (
    <textarea
      id="editor"
      onChange={props.onChange}
      type="text"
      value={props.markdown}
      spellCheck="false"
    />
  );
};

const Preview = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked.parse(props.markdown, { renderer: renderer })
      }}
      id="preview"
    />
  );
};

//App
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMax: false,
      previewMax: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMaximize = this.handleMaximize.bind(this);
    //this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }

  handleChange(event) {
    this.setState({
      markdown: event.target.value
    });
  }

  handleMaximize(event) {
    let editor, preview;
    const id = event.target.id;
    console.log(id);
    editor = id == "EditorBtn" ? !this.state.editorMaximized : false;
    preview = id == "PreviewBtn" ? !this.state.previewMaximized : false;
    this.setState({
      editorMaximized: editor,
      previewMaximized: preview
    });
  }

  render() {
    const classes = this.state.editorMaximized
      ? ["editorWrap", "previewWrap hide", "fas fa-compress"]
      : this.state.previewMaximized
      ? ["editorWrap hide", "previewWrap", "fas fa-compress"]
      : ["editorWrap", "previewWrap", "fas fa-expand"];
    return (
      <div>
        <div id="title">
          <i className="fa-brands fa-free-code-camp fa-2x"></i>
          <h1>
            {projectName.toUpperCase()} by {authorName}
          </h1>
        </div>
        <div id="appWrap">
          <div className={classes[0]}>
            <Toolbar
              icon={classes[2]}
              onClick={this.handleMaximize}
              text="Editor"
            />
            <Editor
              markdown={this.state.markdown}
              onChange={this.handleChange}
            />
          </div>
          <div className={classes[1]}>
            <Toolbar
              icon={classes[2]}
              onClick={this.handleMaximize}
              text="Preview"
            />
            <Preview markdown={this.state.markdown} />
          </div>
        </div>
      </div>
    );
  }
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export default App;
