import React from 'react';
import './login.css';


class AlertMsg extends React.Component {
    render() {
        if (this.props.alertShow) {
            return (
                <div id="alert" role="alert" className="active">
                    <p>{this.props.alert_msg}</p>
                </div>
            );
        } else {
            return null;
        }
    }
}

class LogInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountType: '',
            username: '',
            pwd: '',
            alert: ['', '', ''],
            alertShow: [false, false, false],
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.handleAccountType = this.handleAccountType.bind(this);
        this.clickLogIn = this.clickLogIn.bind(this);
        this.clickSignUp = this.clickSignUp.bind(this);
        this.clickForgetPwd = this.clickForgetPwd.bind(this);
    }

    handleUserNameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePwdChange(event) {
        this.setState({pwd: event.target.value});
    }

    handleAccountType(event) {
        this.setState({accountType: event.target.value});
    }

    clickSignUp(event) {
        this.props.toSignUp();
        event.preventDefault();
    }
    clickForgetPwd(event) {
        this.props.toResetPwd();
        event.preventDefault();
    }
    clickLogIn(event) {
        if (this.state.username === "") {
            const newAlert = this.state.alert.slice();
            newAlert[0] = "Username is required."
            this.setState({alert: newAlert});
            this.setState({alertShow: [true, false, false]});
        } else if (this.state.username !== "hengkuanlu@gmail.com") {
            // to do: username not exists
            const newAlert = this.state.alert.slice();
            newAlert[0] = "Username not exists."
            this.setState({alert: newAlert});
            this.setState({alertShow: [true, false, false]});
        } else if (this.state.pwd === "") {
            const newAlert = this.state.alert.slice();
            newAlert[1] = "Password is required."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, true, false]});
        } else if (this.state.pwd !== "asd1!") {
            // to do: wrong pwd
            const newAlert = this.state.alert.slice();
            newAlert[1] = "Password not correct."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, true, false]});
        } else if (this.state.accountType === "") {
            const newAlert = this.state.alert.slice();
            newAlert[2] = "Please select account type."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, true]});
        }
        /*
            else if (type not match) {
            const newAlert = this.state.alert.slice();
            newAlert[2] = "Accout type not match."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, true]});
        } else if (not admin and not active) {
            const newAlert = this.state.alert.slice();
            newAlert[0] = "Accout not active."
            this.setState({alert: newAlert});
            this.setState({alertShow: [true, false, false]});
        }
        */
        else {
            this.setState({alertShow: [false, false, false]});
            this.props.clickLogIn(this.state.username, this.state.accountType);
        }
        event.preventDefault();
    }

    render() {
        return (
            <form id="login_form">
                <AlertMsg alert_msg={this.state.alert[0]} alertShow={this.state.alertShow[0]}/>
                <div className="input-wrapper">
                    <input type="text" name="username" id="username" placeholder="*Username(email)" 
                        onChange={this.handleUserNameChange}
                    />
                </div>
                <AlertMsg alert_msg={this.state.alert[1]} alertShow={this.state.alertShow[1]}/>
                <div className="input-wrapper">
                    <input type="password" name="password" id="password" placeholder="*Password" 
                        onChange={this.handlePwdChange}
                    />
                </div>
                <AlertMsg alert_msg={this.state.alert[2]} alertShow={this.state.alertShow[2]}/>
                <select className="input-wrapper" name="type" id="type" onChange={this.handleAccountType} defaultValue="Account Type">
                    <option disabled>Account Type</option>
                    <option>User</option>
                    <option>Admin</option>
                </select>
                <div className="submit_buttons">
                    <button type="submit" className="login_b1" onClick={this.clickSignUp}>Sign Up</button>
                    <button type="submit" className="login_b1" onClick={this.clickForgetPwd}>Forget Password</button>
                    <div id="login_button">
                        <button type="submit" id="login_submit" onClick={this.clickLogIn}>LOG IN</button>
                    </div>
                </div>
    
            </form>
        );
    }
}


class LogIn extends React.Component {
    render() {
        return (
            <div id="wrapper">
                <section id="loginbox">
                    <p id="login_msg">{this.props.login_msg}</p>
                    <h2>Log in with username</h2>
                    <LogInForm toSignUp={this.props.toSignUp} toResetPwd={this.props.toResetPwd} clickLogIn={this.props.clickLogIn}/>
                </section>
            </div>
        );
    }
}

export default LogIn;