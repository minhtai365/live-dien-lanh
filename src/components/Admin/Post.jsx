import React, { Component } from 'react';

import { ToastContainer, toast } from "react-toastify";
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { getServiceApi, setServiceApi, deleteApi,addFileApi } from '../../custom/repositories/api.repository';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import { API_URL } from '../../config/_index';
class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCked: '',
        }
    }
    async componentDidMount() {
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
    }
    // upLoadFile=()=>{

    // }
    render() {
        
        const { dataCked } = this.state
        const { data } = this.props;
        console.log(data);
        return (
            <div className="App"  >
                <CKEditor
                    // onReady={editor => {
                    //     console.log('Editor is ready to use!', editor);

                    // }}
                    editor={ClassicEditor}
                    data={data}
                    onChange={this.handleChange}
                    config={
                        {
                            ckfinder: {
                                uploadUrl: API_URL+'delete/upload-file?command=QuickUpload&type=Files&responseType=json'
                            }
                        }
                    }
                />
                <div className="text-center">
                    <div className="btn btn-primary " onClick={() => this.props.submit(dataCked)}>
                        Save
                </div>
                </div>

                {/* <div>
                    {dataCked ? ReactHtmlParser(dataCked) : ''}
                </div> */}

                {/* <div>
                    {this.state.service.map(po => {
                        return <div>
                            <h1>{po.name}</h1>
                            <div>
                                {ReactHtmlParser(po.post)}
                            </div>
                        </div>
                    })}
                </div> */}
                {/* <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                /> */}
            </div>
        );
    }
}

export default Post;