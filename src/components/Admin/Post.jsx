// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import MWEditor from './MWEditor';
// import ClassicEditor from "custom-ckeditor5-reactjs";
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

// import ClassicEditor from "ckeditor5-custom-build";
// import { CKEditor } from '@ckeditor/ckeditor5-react';

import { CKEditor } from 'ckeditor4-react';
import React, { Component } from 'react';
import { API_URL } from '../../config/_index';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCked: '',
        }
    }
    async componentDidMount() {
        
        // document.getElementById("cke_dialog_title_409").style.zIndex = "1044";
        document.querySelector('.setdata-editor>div').innerHTML = this.props.data;

        this.props.getDataEditor(this.props.data)
        this.setState({ dataCked: this.props.data });
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.info !== prevState.info)
    //         document.querySelector('.form-group.col-lg-12.col-12>div').innerHTML = this.state.info.introduce;
    // }
    // getPaging = async (search) => {
    //     let response = await getServiceApi().getAll();
    //     if (response) {
    //         this.setState({ service: response })
    //         return toast.success("Thành công", { autoClose: 1000 });
    //     }
    //     else {
    //         return toast.success("Thành công")
    //     }

    // }
    // submitSave = async () => {
    //     // let dataA = ReactHtmlParser(this.state.dataCked);
    //     let obj = {};
    //     obj.posts = this.state.dataCked;
    //     obj.name = 'Bài viết'
    //     let response = await setServiceApi().set(obj);
    //     if (response) {
    //         let isOpen = false;
    //         this.setState({
    //             isOpen,
    //             isSubmit: false
    //         })

    //         this.getPaging();
    //         toast(response.mess, { autoClose: 1000 });
    //     } else {
    //         toast(response.mess, { autoClose: 5000 });
    //     }
    // }
    // handleChange = (e, editor) => {
    //     let data = editor.getData();
    //     this.setState({ dataCked: data });
    //     this.props.getDataEditor(data)
    // }
    handleChange = (e) => {
        let data = e.editor.getData();
        this.setState({ dataCked: data });
        this.props.getDataEditor(data)
    }
    // upLoadFile=()=>{

    // }
    render() {

        // const { dataCked } = this.state
        // const { data } = this.props;
        return (
            <div className="setdata-editor"  >
                {/* <CKEditor
                    onReady={editor => {
                        // console.log('Editor is ready to use!', editor);
                        // console.log(Array.from(editor.ui.componentFactory.names()));
                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );

                        this.editor = editor;
                    }}
                    editor={ClassicEditor}
                    data={data}
                    onChange={this.handleChange}
                    config={
                        {
                            ckfinder: {
                                uploadUrl: API_URL + 'delete/upload-file?command=QuickUpload&type=Files&responseType=json'
                            }
                        }
                    }
                /> */}

                <CKEditor
                    onChange={this.handleChange}
                    style={{
                        'border': '1px solid #0e7fe1'
                    }}
                    type="inline"
                    config={{
                        extraPlugins: 'image2',
                        filebrowserImageUploadUrl: (API_URL + 'delete/upload-file'),
                        uiColor: "#0e7fe1",
                        filebrowserUploadMethod: 'type',
                    }}
                />
            </div>
        );
    }
}

export default Post;