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

class ForgetPwdForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pwd_1: '',
            pwd_2: '',
            ans_1: '',
            ans_2: '',
            ans_3: '',
            alert: ['', '', '', '', '', ''],
            alertShow: [false, false, false, false, false, false],
            account_info: [],
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePwdChange1 = this.handlePwdChange1.bind(this);
        this.handlePwdChange2 = this.handlePwdChange2.bind(this);
        this.handleQuestion1 = this.handleQuestion1.bind(this);
        this.handleQuestion2 = this.handleQuestion2.bind(this);
        this.handleQuestion3 = this.handleQuestion3.bind(this);
        this.clickConfirm = this.clickConfirm.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
        this.loadData(event.target.value)
    }

    handlePwdChange1(event) {
        this.setState({pwd_1: event.target.value});
    }

    handlePwdChange2(event) {
        this.setState({pwd_2: event.target.value});
    }

    handleQuestion1(event) {
        this.setState({ans_1: event.target.value});
    }

    handleQuestion2(event) {
        this.setState({ans_2: event.target.value});
    }

    handleQuestion3(event) {
        this.setState({ans_3: event.target.value});
    }

    loadData = (id) => {
        fetch('http://localhost:3000/account/' + String(id))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        account_info: result.data
                    });
                }
            )
    }

    postData = () => {
        const data = {
            email: this.state.email, 
            password: this.state.pwd_1,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch('http://localhost:3000/change_pwd/' + String(this.state.email), requestOptions)
            .then(res => res.json())
    }

    clickConfirm(event) {
        if (this.state.email === "") {
            const newAlert = this.state.alert.slice();
            newAlert[0] = "Email is required."
            this.setState({alert: newAlert});
            this.setState({alertShow: [true, false, false, false, false, false]});
        } else if (this.state.account_info.length === 0) {
            const newAlert = this.state.alert.slice();
            newAlert[0] = "Email not registered."
            this.setState({alert: newAlert});
            this.setState({alertShow: [true, false, false, false, false, false]});
        } else if (this.state.ans_1 !== this.state.account_info[0]['security_question_answer_1']) {
            const newAlert = this.state.alert.slice();
            newAlert[1] = "Wrong answer."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, true, false, false, false, false]});
        } else if (this.state.ans_2 !== this.state.account_info[0]['security_question_answer_2']) {
            const newAlert = this.state.alert.slice();
            newAlert[2] = "Wrong answer."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, true, false, false, false]});
        } else if (this.state.ans_3 !== this.state.account_info[0]['security_question_answer_3']) {
            const newAlert = this.state.alert.slice();
            newAlert[3] = "Wrong answer."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, false, true, false, false]});
        } else if (this.state.pwd_1 === "") {
            const newAlert = this.state.alert.slice();
            newAlert[4] = "Password is required."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, false, false, true, false]});
        } else if (this.state.pwd_1.length != 5 || !/\d/.test(this.state.pwd_1) || 
            !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.state.pwd_1)) 
        {
            /* password shoube 5 chars in length, at least 1 number and 1 symbol */ 
            const newAlert = this.state.alert.slice();
            newAlert[4] = "Invalid password."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, false, false, true, false]});
        } else if (this.state.pwd_2 !== this.state.pwd_1) {
            const newAlert = this.state.alert.slice();
            newAlert[5] = "Password not consistent."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, false, false, false, true]});
        } else {
            this.postData();
            this.setState({alertShow: [false, false, false, false, false, false]});
            this.props.submitResetPwd();
        }
        event.preventDefault();
    }

    render() {
        return (
            <form id="fgpwd_form">
                <AlertMsg alert_msg={this.state.alert[0]} alertShow={this.state.alertShow[0]}/>
                <div className="input-wrapper">
                    <input type="text" name="email" id="email" placeholder="*Email" 
                        onChange={this.handleEmailChange}
                    />
                </div>

                <div className="input-wrapper">
                    <h4>Please answer the security questions</h4>
                    <AlertMsg alert_msg={this.state.alert[1]} alertShow={this.state.alertShow[1]}/>
                    <div className="input-wrapper">
                        <input type="text" name="security_question_1" id="q1" placeholder="What's father's first name?" 
                            onChange={this.handleQuestion1}
                        />
                    </div>
                    <AlertMsg alert_msg={this.state.alert[2]} alertShow={this.state.alertShow[2]}/>
                    <div className="input-wrapper">
                        <input type="text" name="security_question_2" id="q2" placeholder="What is favorite sports?" 
                            onChange={this.handleQuestion2}
                        />
                    </div>
                    <AlertMsg alert_msg={this.state.alert[3]} alertShow={this.state.alertShow[3]}/>
                    <div className="input-wrapper">
                        <input type="text" name="security_question_3" id="q3" placeholder="What is your favorite city?" 
                            onChange={this.handleQuestion3}
                        />
                    </div>
                </div>

                <div>
                    <h4>Please set your new password.</h4>
                    <AlertMsg alert_msg={this.state.alert[4]} alertShow={this.state.alertShow[4]}/>
                    <div className="input-wrapper">
                        <input type="password" name="password" id="password" 
                            placeholder="*Password(5 chars in length, at least 1 number and 1 symbol)"
                            onChange={this.handlePwdChange1}
                        />
                    </div>

                    <AlertMsg alert_msg={this.state.alert[5]} alertShow={this.state.alertShow[5]}/>
                    <div className="input-wrapper">
                        <input type="password" name="confirm_password" id="confirm_password" 
                            placeholder="*Confirm Password(must be same with password)"
                            onChange={this.handlePwdChange2}
                        />
                    </div>
                </div>



                <div className="submit_buttons">
                    <div id="fgpwd_button">
                        <button type="submit" id="fgpwd_submit" onClick={this.clickConfirm}>CONFIRM</button>
                    </div>
                </div>
            </form>
        );
    }
}


class ForgetPwd extends React.Component {
    render() {
        return (
            <div id="wrapper">
                <section id="fgpwd_box">
                    <h2>Reset Password</h2>
                    <ForgetPwdForm submitResetPwd={this.props.submitResetPwd}/>
                </section>
            </div>
        );
    }
}

export default ForgetPwd;