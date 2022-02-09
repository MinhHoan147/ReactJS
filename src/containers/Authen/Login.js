import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userService'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
      this.setState({
          username: event.target.value
      })

    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
       this.setState({
          errMessage: ''
       })
       try {
           let data = await handleLoginApi(this.state.username, this.state.password);
           console.log(data);
           if(data && data.code !== 0){
            this.setState({
                errMessage: data.message
             })
           }
           if(data && data.code === 0){
               this.props.userLoginSuccess(data.user)
              
           }
       } catch (error) {
           if(error.response){
               if(error.response.data){
                this.setState({
                    errMessage: error.response.data.message
                 })
               }
           }
       }
       
    }

    isShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13){
            this.handleLogin();
        }
    }

    
      render(){
       return(
           <div className="login-background">
              <div className="login-container">
                 <div className="login-content">
                     <div className="col-12 text-center text-login">LOGIN</div>
                     <div className="col-12 form-group">
                         <label>Username</label>
                         <input 
                         type="text" 
                         className="form-control" 
                         placeholder="Enter your username"
                         value= {this.state.username}
                         onChange={(event) => { this.handleOnChangeUsername(event)}}
                         />
                     </div>
                     <div className="col-12 form-group">
                         <label>Password</label>
                        <div className="custom-input">
                        <input 
                         type={this.state.isShowPassword ? "text" : "password"}
                         className="form-control" 
                         placeholder="Enter your password"
                         onChange={(event) => {this.handleOnChangePassword(event)}}
                         value= {this.state.password}
                         onKeyDown={(event) => this.handleKeyDown(event)}
                         />
                         
                         <span onClick={() => this.isShowPassword()}> <i className={this.state.isShowPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i> </span> 
                          
                        </div>
                        
                     </div>
                     <div className="col-12" style={{color: 'red'}}> 
                        {this.state.errMessage}
                     </div>
                     <div className="col-12 ">
                         <button onClick={() => this.handleLogin()} className ="btn-login" >Login</button>
                     </div>
                     <div className="col-12 forgot-pass">
                         <span>Forgot your password ?</span>
                     </div>
                     <div className="col-12 text-center mt-5">
                        <span>Or Login With</span>
                     </div>
                     <div className="col-12 social-login">
                     <i className="fab fa-google-plus-square google"></i>
                     <i className="fab fa-facebook-square facebook"></i>
                     </div>
                 </div>
              </div>
           </div>
       )

      }
}    
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
