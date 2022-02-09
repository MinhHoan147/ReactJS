import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { handleGetAllUser, handleCreateNewUser, handleDeleteUser, handleEditUser } from '../../services/userService';
import './UserManage.scss';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            editUser: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact()
    }

    getAllUserFromReact = async () => {
        let response = await handleGetAllUser('ALL')
        if (response && response.code === 0) {
            this.setState({
                arrUsers: response.Users
            })
        }
    }

    handleAddNew = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    handleEdit = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            editUser: user
        })
    }

    handleToggleModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    handleToggleModalEdit = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await handleCreateNewUser(data)
            if (response && response.code !== 0) {
                alert(response.message)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteUser = async (user) => {
        try {
            if(window.confirm('Are you sure ? ') === true){
            let res = await handleDeleteUser(user.id)

                if (res && res.code === 0) {

                    await this.getAllUserFromReact();
                }else{
                    alert(res.message)
                }
            }
           
        } catch (error) {
            console.log(error);
        }
    }

   
   editUser = async (user) => {
       try {
           let response = await handleEditUser(user)
           if(response && response.code ===0){
               this.setState({
                isOpenModalEditUser: false,
               })

             await  this.getAllUserFromReact()
           }else{
               alert(response.message)
           }
       } catch (error) {
           console.log(error);
       }
    
    
   }



    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleParent={this.handleToggleModal}
                    createNewUser={this.createNewUser}

                />
                {this.state.isOpenModalEditUser &&
                <ModalEditUser
                isOpen={this.state.isOpenModalEditUser}
                toggleParentEdit={this.handleToggleModalEdit}
                currentUser = {this.state.editUser}
                editUser = {this.editUser}
                />
                }
                <div className="title text-center" style={{ fontSize: '28px' }}>Manage users</div>
                <button type="button"
                    className="btn btn-info px-3 mx-1"
                    style={{ color: 'white', fontSize: '15px' }}
                    onClick={() => this.handleAddNew()}
                ><i className="fas fa-plus"></i> Add new</button>
                <div className="users-table mt-4 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {arrUsers && arrUsers.map((items, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{items.email}</td>
                                        <td>{items.firstName}</td>
                                        <td>{items.lastName}</td>
                                        <td>{items.address}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary mx-2" onClick={() => this.handleEdit(items)} style={{ width: '40px' }}><i className="fas fa-edit"></i></button>

                                            <button type="button" className="btn btn-danger" onClick={() => this.deleteUser(items)} style={{ width: '40px' }}><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )

                            })
                            }

                        </tbody>
                    </table>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
