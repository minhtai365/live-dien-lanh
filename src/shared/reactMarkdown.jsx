import MDEditor, { MDEditorProps } from '@uiw/react-md-editor';
import React, { Component } from "react";
import TextareaAutosize from 'react-autosize-textarea/lib';
import ReactHoverObserver from 'react-hover-observer';
class ReactMarkdown extends Component {
  constructor() {
    super();
    this.state = {
      value: "thisssads",
      preview: "edit",
      view: true
    };
  }
  onchange() {
    this.state.preview == 'edit' ? this.state.preview = 'preview' : this.state.preview = 'edit';
    this.setState({ preview: this.state.preview });
  }
  changeTextDescription = (event) => {
    this.setState({ value: event.target.value });
  }
  changeMarkdown() {
    this.state.view = !this.state.view;
    this.setState({ view: this.state.view });
  }
  openMarkdown() {
    this.state.view = false;
    this.setState({ view: this.state.view });
  }
  render() {
    const textareaStyle = {
      borderWidth: "0px",
      borderColor: "rgb(0, 170, 255)",
      borderStyle: "solid",
      color: "rgb(61, 71, 77)",
      borderRadius: "5px",
      padding: "5px 10px",
      fontSize: "15px",
      fontWeight: "400",
      lineHeight: "22px",
      letterSpacing: "normal",
      resize: "none",
      width: "100%",
      outline: "0px",
      overflowY: "hidden",
    };
    return (
      <ReactHoverObserver>
        {
          ({ isHovering }) => (
            <div className="kr-view" style={{ flexDirection: "column", padding: "5px 20px", marginBottom: "10px" }}>
                  <div className="kr-view" style={{ flexGrow: "1", flexShrink: "1", borderRadius: "5px", cursor: "text", backgroundColor: isHovering ? "rgb(247, 249, 250)" : ""}}>
                    {this.state.view ?
                      <div onClick={() => this.changeMarkdown()} style={{ position: "relative", width: "100%" }}>
                        <MDEditor.Markdown source={this.state.value} style={textareaStyle} />
                      </div> :
                      <div style={{ position: "relative", width: "100%" }}>
                        <TextareaAutosize onBlur={() => this.changeMarkdown()} onChange={this.changeTextDescription} style={textareaStyle} className="kr-view textarea-markdown" value={this.state.value}
                        />
                      </div>
                    }
                    {
                      this.state.value.length === 0 && this.state.view && <div onClick={() => this.openMarkdown()} style={{ fontSize: "15px", fontWeight: "400", lineHeight: "22px", letterSpacing: "normal", width: "100%", color: "rgb(138, 148, 153)" }}>This task has no notes.</div>
                    }
                  </div>
                </div>
          )}</ReactHoverObserver>

    );
  }
}
export default ReactMarkdown;