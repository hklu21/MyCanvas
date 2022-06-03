import React from 'react';
import ForgetPwd from './forget_psd';
import './login.css';
import LogIn from './log_in';
import SignUp from './sign_up';

class LogInSystem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "LogIn",
            login_msg: '',
        };
        this.toSignUp = this.toSignUp.bind(this);
        this.toResetPwd = this.toResetPwd.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);
        this.submitResetPwd = this.submitResetPwd.bind(this);
    }

    toSignUp() {
        this.setState({page: "SignUp"});
    }

    toResetPwd() {
        this.setState({page: "ForgetPwd"});
    }

    submitSignUp() {
        this.setState({page: "LogIn", login_msg: "Registration request sent, please log in."});

    }

    submitResetPwd() {
        this.setState({page: "LogIn", login_msg: "Password reset, please log in."});

    }


    render() {
        switch (this.state.page) {
            case "LogIn":
                return <LogIn toSignUp={this.toSignUp} toResetPwd={this.toResetPwd} login_msg={this.state.login_msg} clickLogIn={this.props.clickLogIn}/>;
            case "SignUp":
                return <SignUp submitSignUp={this.submitSignUp}/>;
            case "ForgetPwd":
                return <ForgetPwd submitResetPwd={this.submitResetPwd}/>;
            default:
                return null;
        }
    }
}

export default LogInSystem;