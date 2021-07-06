// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import MWEditor from './MWEditor';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
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
        this.props.getDataEditor(this.props.data)
        this.setState({ dataCked: this.props.data });
    }

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
    handleChange = (e, editor) => {
        let data = editor.getData();
        this.setState({ dataCked: data });
        this.props.getDataEditor(data)
    }
    // upLoadFile=()=>{

    // }
    render() {

        // const { dataCked } = this.state
        const { data } = this.props;
        return (
            <div className="App"  >
                {/* <MWEditor/> */}
                <CKEditor
                  onReady={editor => {
                        console.log('Editor is ready to use!', editor);

                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );

                        this.editor = editor;
                    }}
                    editor={DecoupledEditor}
                    data={data}
                    onChange={this.handleChange}
                    config={
                        {
                            ckfinder: {
                                uploadUrl: API_URL + 'delete/upload-file?command=QuickUpload&type=Files&responseType=json'
                            }
                        }
                    }
                />
            
            </div>
        );
    }
}

export default Post;