import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            firstName : '',
            lastName : '',
            address : '',
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleParent()
    }

    handleInput = (event,id) => {
       let copyState = {...this.state}
       copyState[id] = event.target.value
              this.setState({
                ...copyState
       })
    }

    validateInput = () => {
        let isValid =true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for(let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
               isValid = false
               alert('Missing parameters')
               break
            }
            
        }
        return isValid
    }
    
    handleAddUser = () => {
        let check = this.validateInput()
        //call api create user
        if(check === true){
            this.props.createNewUser(this.state)
        }
        this.setState({
            email : '',
            password : '',
            firstName : '',
            lastName : '',
            address : '',
        })
    }


    render() {

        return (
            <Modal 
               isOpen={this.props.isOpen} 
               toggle={() => { this.toggle() }} 
               className={'modal-user-container mt-5'}
               size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create New User</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input 
                            type='text' 
                            onChange={(event) => {this.handleInput(event,'email')}}
                            value={this.state.email} ></input>
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input 
                            type='password' 
                            onChange={(event) => {this.handleInput(event,'password')}}
                            value={this.state.password} ></input>
                        </div>
                        <div className="input-container">
                            <label>FirstName</label>
                            <input 
                            type='text' 
                            onChange={(event) => {this.handleInput(event,'firstName')}}
                            value={this.state.firstName} ></input>
                        </div>
                        <div className="input-container">
                            <label>LastName</label>
                            <input 
                            type='text' 
                            onChange={(event) => {this.handleInput(event,'lastName')}}
                            value={this.state.lastName} ></input>
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input 
                            type='text' 
                            onChange={(event) => {this.handleInput(event,'address')}}
                            value={this.state.address} ></input>
                        </div>
                    </div>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="success" className="px-3" onClick={() => {this.handleAddUser()}}>Submit</Button>{' '}
                    <Button color="danger" className="px-3" onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
