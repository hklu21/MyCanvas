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

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountType: '',
            name: '',
            email: '',
            ID: '',
            pwd_1: '',
            pwd_2: '',
            ans_1: '',
            ans_2: '',
            ans_3: '',
            alert: ['', '', '', '', '', '', '' ,''],
            alertShow: [false, false, false, false, false, false, false, false],
            account_info: [],
            id_info: [],
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handlePwdChange1 = this.handlePwdChange1.bind(this);
        this.handlePwdChange2 = this.handlePwdChange2.bind(this);
        this.handleAccountType = this.handleAccountType.bind(this);
        this.handleQuestion1 = this.handleQuestion1.bind(this);
        this.handleQuestion2 = this.handleQuestion2.bind(this);
        this.handleQuestion3 = this.handleQuestion3.bind(this);
        this.clickSignUp = this.clickSignUp.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
        this.loadDataEmial(event.target.value)
    }

    handleIDChange(event) {
        this.setState({ID: event.target.value});
        this.loadDataID(event.target.value)
    }

    handlePwdChange1(event) {
        this.setState({pwd_1: event.target.value});
    }

    handlePwdChange2(event) {
        this.setState({pwd_2: event.target.value});
    }

    handleAccountType(event) {
        this.setState({accountType: event.target.value});
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

    loadDataEmial = (email) => {
        fetch('http://localhost:3000/account/' + String(email))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        account_info: result.data
                    });
                }
            )
    }

    loadDataID = (id) => {
        fetch('http://localhost:3000/account/id/' + String(id))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        id_info: result.data
                    });
                }
            )
    }

    postData = () => {
        const data = {
            email: this.state.email,
            student_id: this.state.ID,
            password: this.state.pwd_1,
            ans_1: this.state.ans_1,
            ans_2: this.state.ans_2,
            ans_3: this.state.ans_3,
            activity: "0",
            account_type: this.state.accountType,
        };
        if (this.state.name !== "") {
            data['name'] = this.state.name;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch('http://localhost:3000/account/created', requestOptions)
            .then(res => res.json())
    }

    /* check whether the input email is in valid form */
    validateEmail(email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    clickSignUp(event) {
        if (this.state.email === "") {
            const newAlert = this.state.alert.slice();
            newAlert[0] = "Email is required."
            this.setState({alert: newAlert});
            this.setState({alertShow: [true, false, false, false, false, false, false, false]});
        } else if (!this.validateEmail(this.state.email)) {
            const newAlert = this.state.alert.slice();
            newAlert[0] = "Invalid email."
            this.setState({alert: newAlert});
            this.setState({alertShow: [true, false, false, false, false, false, false, false]});
        } else if (this.state.account_info.length !== 0) {
            const newAlert = this.state.alert.slice();
            newAlert[0] = "Email already registered."
            this.setState({alert: newAlert});
            this.setState({alertShow: [true, false, false, false, false, false, false, false]});
        } else if (this.state.ID === "") {
            const newAlert = this.state.alert.slice();
            newAlert[1] = "Student ID is required."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, true, false, false, false, false, false, false]});
        } else if (this.state.id_info.length !== 0) {
            const newAlert = this.state.alert.slice();
            newAlert[1] = "Student ID already registered."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, true, false, false, false, false, false, false]});
        } else if (this.state.pwd_1 === "") {
            const newAlert = this.state.alert.slice();
            newAlert[2] = "Password is required."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, true, false, false, false, false, false]});
        } else if (this.state.pwd_1.length !== 5 || !/\d/.test(this.state.pwd_1) || 
            !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.state.pwd_1)) 
        {
            /* password shoube 5 chars in length, at least 1 number and 1 symbol */ 
            const newAlert = this.state.alert.slice();
            newAlert[2] = "Invalid password."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, true, false, false, false, false, false]});
        } else if (this.state.pwd_2 !== this.state.pwd_1) {
            const newAlert = this.state.alert.slice();
            newAlert[3] = "Password not consistent."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, false, true, false, false, false, false]});
        } else if (this.state.accountType === "") {
            const newAlert = this.state.alert.slice();
            newAlert[4] = "Please select accout type."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, false, false, true, false, false, false]});
        } else if (this.state.ans_1 === "") {
            const newAlert = this.state.alert.slice();
            newAlert[5] = "Please answer the question."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, false, false, false, true, false, false]});
        } else if (this.state.ans_2 === "") {
            const newAlert = this.state.alert.slice();
            newAlert[6] = "Please answer the question."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, false, false, false, false, true, false]});
        } else if (this.state.ans_3 === "") {
            const newAlert = this.state.alert.slice();
            newAlert[7] = "Please answer the question."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, false, false, false, false, false, true]});
        } else {
            this.postData();
            this.setState({alertShow: [false, false, false, false, false, false, false, false]});
            this.props.submitSignUp();
        }
        event.preventDefault();
    }

    render() {
        return (
            <form id="login_form">
                <div className="input-wrapper">
                    <input type="text" name="name" id="name" placeholder="Name" 
                        onChange={this.handleNameChange}
                    />
                </div>

                <AlertMsg alert_msg={this.state.alert[0]} alertShow={this.state.alertShow[0]}/>
                <div className="input-wrapper">
                    <input type="text" name="email" id="email" placeholder="*Email"
                        onChange={this.handleEmailChange}
                    />
                </div>

                <AlertMsg alert_msg={this.state.alert[1]} alertShow={this.state.alertShow[1]}/>
                <div className="input-wrapper">
                    <input type="text" name="id" id="id" placeholder="*ID"
                        onChange={this.handleIDChange}
                    />
                </div>

                <AlertMsg alert_msg={this.state.alert[2]} alertShow={this.state.alertShow[2]}/>
                <div className="input-wrapper">
                    <input type="password" name="password" id="password" 
                        placeholder="*Password(5 chars, at least 1 number and 1 symbol)"
                        onChange={this.handlePwdChange1}
                    />
                </div>

                <AlertMsg alert_msg={this.state.alert[3]} alertShow={this.state.alertShow[3]}/>
                <div className="input-wrapper">
                    <input type="password" name="confirm_password" id="confirm_password" 
                        placeholder="*Confirm Password(must be same with password)"
                        onChange={this.handlePwdChange2}
                    />
                </div>

                <AlertMsg alert_msg={this.state.alert[4]} alertShow={this.state.alertShow[4]}/>
                <select className="input-wrapper" name="type" id="type" onChange={this.handleAccountType} defaultValue="Accout Type">
                    <option disabled>Accout Type</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                </select>
                
                <div className="input-wrapper">
                    <h4>Three security questions</h4>
                    <AlertMsg alert_msg={this.state.alert[5]} alertShow={this.state.alertShow[5]}/>
                    <div className="input-wrapper">
                        <input type="text" name="security_question_1" id="q1" placeholder="What's father's first name?" 
                            onChange={this.handleQuestion1}
                        />
                    </div>
                    <AlertMsg alert_msg={this.state.alert[6]} alertShow={this.state.alertShow[6]}/>
                    <div className="input-wrapper">
                        <input type="text" name="security_question_2" id="q2" placeholder="What is favorite sports?" 
                            onChange={this.handleQuestion2}
                        />
                    </div>
                    <AlertMsg alert_msg={this.state.alert[7]} alertShow={this.state.alertShow[7]}/>
                    <div className="input-wrapper">
                        <input type="text" name="security_question_3" id="q3" placeholder="What is your favorite city?" 
                            onChange={this.handleQuestion3}
                        />
                    </div>
                </div>

                <div className="submit_buttons">
                    <div id="signup_button">
                        <button type="submit" id="signup_submit" onClick={this.clickSignUp}>SIGN UP</button>
                    </div>
                </div>
            </form>
        );
    }
}


class SignUp extends React.Component {
    render() {
        return (
            <div id="wrapper">
                <section id="signupbox">
                    <h2>Sign Up</h2>
                    <SignUpForm submitSignUp={this.props.submitSignUp}/>
                </section>
            </div>
        );
    }
}

export default SignUp;