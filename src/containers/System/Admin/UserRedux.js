import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'
import * as actions from '../../../store/actions';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils  } from '../../../utils'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImg: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            action: '',
            userEditId: ''
        }
    }


    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }


    componentDidUpdate(prevProbs, prevState, snapshot) {
        if (prevProbs.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
            })
        }

        if (prevProbs.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }

        if (prevProbs.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }

        if (prevProbs.listUSer !== this.props.listUSer){
            let arrGender = this.props.genderRedux
            let arrPosition = this.props.positionRedux
            let arrRole = this.props.roleRedux

           this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
            position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
            role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
            avatar: '',
            previewImg: '',
            action: CRUD_ACTIONS.CREATE,
           })
        }
        
    }

    handleOnChangeImg = async (event) => {
        let files = event.target.files
        let myFile = files[0]
        if (myFile) {
            let base64 = await CommonUtils.getBase64(myFile)
            // console.log(base64);
            let objectURL = URL.createObjectURL(myFile)
            this.setState({
                previewImg: objectURL,
                avatar: base64
            })
        }

    }

    openImg = () => {
        if (!this.state.previewImg) return;

        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
            
            let {action} = this.state

            if(action === CRUD_ACTIONS.CREATE){
                //fire action create
                this.props.createNewUserRedux({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phone,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
            }

            if(action === CRUD_ACTIONS.EDIT){
                //fire action edit
                this.props.editUserRedux({
                    id: this.state.userEditId,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phone,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    avatar: this.state.avatar

                })

            }
            
        }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phone', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrCheck[i]);
                break;
            }

        }
        return isValid;
    }



    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
         
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    

    }

    handleEditUser = (user) => {
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }

        
        this.setState({
            email: user.email,
            password: 'HARDCODE123456',
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImg: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }



    render() {
        let listUSer = this.props.listUSer
        console.log("Check list: ", listUSer);
        // console.log("check: ", this.state);
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        let language = this.props.language
        // let isGetGender = this.props.isLoadGender

        let { email, password, firstName, lastName,
            phone, address, gender, position, role, avatar
        } = this.state;

        return (
            <div className='user-redux-container'>
                <div className="title" ><FormattedMessage id='manage-user.title' /></div>
                <div className="user-redux-body" >

                    <div className='container'>
                        <div className='row'>

                        

                                <div className="row" style={{ paddingBottom: '10px' }}>
                                    <div className='col-md-12' style={{ fontSize: '19px', paddingBottom: '10px', }}>Thêm mới người dùng</div>


                                    <div className="form-group col-md-6">
                                        <label><FormattedMessage id="manage-user.email" /></label>
                                        <input type="email" className="form-control"
                                            value={email}
                                            onChange={(event) => { this.onChangeInput(event, 'email') }}
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label><FormattedMessage id="manage-user.password" /></label>
                                        <input type="password" className="form-control"
                                            value={password}
                                            onChange={(event) => { this.onChangeInput(event, 'password') }}
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                                        />
                                    </div>
                                </div>
                                <div className="row" style={{ paddingBottom: '10px' }}>
                                    <div className="form-group col-md-6">
                                        <label ><FormattedMessage id="manage-user.firstname" /></label>
                                        <input type="text" className="form-control"
                                            value={firstName}
                                            onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label><FormattedMessage id="manage-user.lastname" /></label>
                                        <input type="text" className="form-control"
                                            value={lastName}
                                            onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                        />
                                    </div>
                                </div>
                                <div className="row" style={{ paddingBottom: '10px' }}>
                                    <div className="form-group col-md-3">
                                        <label><FormattedMessage id="manage-user.phonenumber" /></label>
                                        <input type="text" className="form-control"
                                            value={phone}
                                            onChange={(event) => { this.onChangeInput(event, 'phone') }}
                                        />
                                    </div>
                                    <div className="form-group col-md-9">
                                        <label><FormattedMessage id="manage-user.address" /></label>
                                        <input type="text" className="form-control"
                                            value={address}
                                            onChange={(event) => { this.onChangeInput(event, 'address') }}
                                        />
                                    </div>
                                </div>
                                <div className="row" style={{ paddingBottom: '10px' }}>
                                    <div className="form-group col-md-3">
                                        <label><FormattedMessage id="manage-user.gender" /></label>
                                        <select className="form-control"
                                        value={gender}
                                            onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                        >
                                            {genders && genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}

                                                        </option>

                                                    )
                                                })
                                            }

                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label><FormattedMessage id="manage-user.position" /></label>
                                        <select className="form-control"
                                        value={position}
                                            onChange={(event) => { this.onChangeInput(event, 'position') }}
                                        >
                                            {positions && positions.length > 0 &&
                                                positions.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index} value={item.keyMap}>
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}

                                                        </option>

                                                    )
                                                })

                                            }

                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label><FormattedMessage id="manage-user.role" /></label>
                                        <select className="form-control"
                                        value={role}
                                            onChange={(event) => { this.onChangeInput(event, 'role') }}
                                        >
                                            {roles && roles.length > 0 &&
                                                roles.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index} value={item.keyMap}>
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}

                                                        </option>

                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label><FormattedMessage id="manage-user.image" /></label>
                                        <div className='preview-img-container'>
                                            <div>
                                                <input type="file" className="form-control" id="preview-img" hidden
                                                    onChange={(event) => this.handleOnChangeImg(event)}
                                                />
                                                <label className='upload' htmlFor='preview-img'><FormattedMessage id="manage-user.upload-img" /> <i className='fas fa-upload'></i></label>
                                                <div className='preview-img'
                                                    style={{ backgroundImage: `url(${this.state.previewImg})` }}
                                                    onClick={() => this.openImg()}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                         className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                         onClick={() => this.handleSaveUser()}> 
                                {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" />: <FormattedMessage id="manage-user.save" />}
                                </button>
                                <br />
                              

                            

                            <div className='col-12 mt-3 mb-5'>
                                <TableManageUser 
                                handleEditUserProps={this.handleEditUser}
                                action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>



                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImg}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadGender: state.admin.isLoadGender,
        listUSer: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {

    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUserRedux: (data) => dispatch(actions.createNewUserStart(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
