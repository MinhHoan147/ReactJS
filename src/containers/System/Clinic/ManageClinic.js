import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {CommonUtils} from '../../../utils';
import {createNewClinic} from '../../../services/userService';
import {toast} from 'react-toastify';

const mdParser = new MarkdownIt(/*Markdown-it options*/);

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            address: '',
            descriptionHTML: '',
            descriptionMarkDown: '',
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, precState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    handleOnChangeInput = (event, id) => {
       let stateCopy = {...this.state}
       stateCopy[id] =  event.target.value
       this.setState({
           ...stateCopy
       }) 
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkDown: text,
            descriptionHTML: html,

        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if(file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }
     }

     handleSaveNewClinic = async () => {
         let res = await createNewClinic(this.state)
         if(res && res.code === 0){
           toast.success('Add new Clinic success !')
           this.setState({
               name: '',
               imageBase64: '',
               address: '',
               descriptionHTML: '',
               descriptionMarkDown: '',
           })
         }else{
            toast.error('Error !!!')
            console.log(res);
         }
     }


    render() {
    
        return (
           <div className='manage-specialty-container'>
              <div className='ms-title'> Quản lý phòng khám </div>

              <div className='add-new-specialty row'>
                  <div className='col-6 form-group'>
                      <label>Tên phòng khám</label>
                      <input className='form-control' type='text' value={this.state.name}
                       onChange={(event) => this.handleOnChangeInput(event,'name')}
                      />
                  </div>

                  <div className='col-6 form-group'>
                      <label>Ảnh phòng khám</label> <br></br>
                      <input className='form-control-file' type='file'
                       onChange={(event) => this.handleOnChangeImage(event)}
                      />
                  </div>

                  <div className='col-6 form-group'>
                      <label>Địa chỉ phòng khám</label> 
                      <input className='form-control' type='text' value={this.state.address}
                       onChange={(event) => this.handleOnChangeInput(event, 'address')}
                      />
                  </div>

                  <div className='col-12'>
                     <MdEditor
                      style={{height: '500px'}}
                      renderHTML={text => mdParser.render(text)}
                      onChange={this.handleEditorChange}
                      value={this.state.descriptionMarkDown}
                     />
                  </div>

                  <div className='col-12'>
                      <button className='btn-save-specialty' onClick={() => this.handleSaveNewClinic()}>
                          Save
                      </button>
                  </div>
              </div>
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);