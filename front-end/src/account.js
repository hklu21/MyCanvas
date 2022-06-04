import React from 'react';
import './account.css';

class SecurityQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ans_1: '',
            ans_2: '',
            ans_3: '',
            pwd: '',
            alert: [''],
            alertShow: [false],
        };
        this.clickSave = this.clickSave.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.handleQuestion1 = this.handleQuestion1.bind(this);
        this.handleQuestion2 = this.handleQuestion2.bind(this);
        this.handleQuestion3 = this.handleQuestion3.bind(this);
    }

    handlePwdChange(event) {
        this.setState({pwd: event.target.value});
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

    clickSave(event) {
        if (this.state.pwd === "") {
            const newAlert = this.state.alert.slice();
            newAlert[0] = "Current password is required."
            this.setState({alert: newAlert});
            this.setState({alertShow: [true]});
        } else if (this.state.pwd !== this.props.pwd) {
            const newAlert = this.state.alert.slice();
            newAlert[0] = "Wrong password."
            this.setState({alert: newAlert});
            this.setState({alertShow: [true]});
        } else {
            this.props.handleQuestion1(this.state.ans_1);
            this.props.handleQuestion2(this.state.ans_2);
            this.props.handleQuestion3(this.state.ans_3);
            this.props.clickSave(this.state.ans_1, this.state.ans_2, this.state.ans_3);
        }
        event.preventDefault();
    }

    render() {
        return this.props.isChangingSQ? (
            <div className="security_questions">
                <br/>
                <h6>{this.state.alertShow[0]?this.state.alert[0]:""}</h6>
                <input type="password" name="curr_pwd" id="curr_pwd" placeholder="*Current Password"
                    onChange={this.handlePwdChange}
                />

                <h6>Security Question 1</h6>
                <input type="text" name="security_question_1" id="q1" placeholder="What's father's first name?"
                    onChange={this.handleQuestion1}
                />
                
                <h6>Security Question 2</h6>
                <input type="text" name="security_question_1" id="q2" placeholder="What is favorite sports?"
                    onChange={this.handleQuestion2}
                />
                
                <h6>Security Question 3</h6>
                <input type="text" name="security_question_1" id="q3" placeholder="What is your favorite city?"
                    onChange={this.handleQuestion3}
                />
                <div className="submit_buttons">
                    <div id="account_button">
                        <button id="edit_save" onClick={this.clickSave}>Save</button>
                    </div>
                </div>
            </div>
        ) : null;
    }
}

class ChangePwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pwd_1: '',
            pwd_2: '',
            pwd_3: '',
            alert: ['', '', ''],
            alertShow: [false, false, false],
        };
        this.handlePwdChange1 = this.handlePwdChange1.bind(this);
        this.handlePwdChange2 = this.handlePwdChange2.bind(this);
        this.handlePwdChange3 = this.handlePwdChange3.bind(this);
        this.clickConfirm = this.clickConfirm.bind(this);
    }

    handlePwdChange1(event) {
        this.setState({pwd_1: event.target.value});
    }

    handlePwdChange2(event) {
        this.setState({pwd_2: event.target.value});
    }

    handlePwdChange3(event) {
        this.setState({pwd_3: event.target.value});
    }

    clickConfirm(event) {
        if (this.state.pwd_1 === "") {
            const newAlert = this.state.alert.slice();
            newAlert[0] = "Current password is required."
            this.setState({alert: newAlert});
            this.setState({alertShow: [true, false, false]});
        } else if (this.state.pwd_1 !== this.props.pwd) {
            const newAlert = this.state.alert.slice();
            newAlert[0] = "Wrong password."
            this.setState({alert: newAlert});
            this.setState({alertShow: [true, false, false]});
        } else if (this.state.pwd_2 === "") 
        {
            const newAlert = this.state.alert.slice();
            newAlert[1] = "Input new password."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, true, false]});
        } else if (this.state.pwd_2.length !== 5 || !/\d/.test(this.state.pwd_2) || 
            !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.state.pwd_2)) 
        {
            /* password shoube 5 chars in length, at least 1 number and 1 symbol */ 
            const newAlert = this.state.alert.slice();
            newAlert[1] = "Invalid password."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, true, false]});
        } else if (this.state.pwd_3 !== this.state.pwd_2) {
            const newAlert = this.state.alert.slice();
            newAlert[2] = "Password not consistent."
            this.setState({alert: newAlert});
            this.setState({alertShow: [false, false, true]});
        } else {
            this.setState({alertShow: [false, false, false]});
            this.props.handlePwdChange(this.state.pwd_2);
            this.props.clickConfirm(this.state.pwd_2);
        }
        event.preventDefault();
    }

    render() {
        return this.props.isChangingPwd? (
            <div className="security_questions">
                <br/>
                <h6>{this.state.alertShow[0]?this.state.alert[0]:""}</h6>
                <input type="password" name="curr_pwd" id="curr_pwd" placeholder="*Current Password"
                    onChange={this.handlePwdChange1}
                />
                
                <h6>{this.state.alertShow[1]?this.state.alert[1]:""}</h6>
                <input type="password" name="new_pwd" id="new_pwd" placeholder="*New Password"
                    onChange={this.handlePwdChange2}
                />
                
                <h6>{this.state.alertShow[2]?this.state.alert[2]:""}</h6>
                <input type="password" name="confirm_new_pwd" id="confirm_new_pwd" placeholder="*Confirm Password"
                    onChange={this.handlePwdChange3}
                />
                <div className="submit_buttons">
                    <div id="account_button">
                        <button id="reset_pwd" onClick={this.clickConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        ) : null;
    }
}


class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account_id: this.props.account_id,
            email: '',
            email_tmp: '',
            ID: '',
            ID_tmp: '',
            name: '',
            name_tmp: '',
            pwd: '',
            isEditing: false,
            isChangingPwd: false,
            isChangingSQ: false,
            ans_1: '',
            ans_2: '',
            ans_3: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleQuestion1 = this.handleQuestion1.bind(this);
        this.handleQuestion2 = this.handleQuestion2.bind(this);
        this.handleQuestion3 = this.handleQuestion3.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.clickEditSave = this.clickEditSave.bind(this);
        this.clickChangeSQ = this.clickChangeSQ.bind(this);
        this.clickSave = this.clickSave.bind(this);
        this.clickChangePwd = this.clickChangePwd.bind(this);
        this.clickConfirm = this.clickConfirm.bind(this);
    }

    loadData = () => {
        fetch('http://localhost:3000/account/rowid/' + String(this.state.account_id))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        name: result.data[0]['name'],
                        name_tmp: result.data[0]['name'],
                        ID: result.data[0]['student_id'],
                        ID_tmp: result.data[0]['student_id'],
                        email: result.data[0]['email'],
                        email_tmp: result.data[0]['email'],
                        ans_1: result.data[0]['security_question_answer_1'],
                        ans_2: result.data[0]['security_question_answer_2'],
                        ans_3: result.data[0]['security_question_answer_3'],
                        pwd: result.data[0]['password']
                    });
                }
            )
    }

    componentWillMount() {
        this.loadData()
    }


    handleNameChange(event) {
        this.setState({name_tmp: event.target.textContent});
    }

    handleEmailChange(event) {
        this.setState({email_tmp: event.target.textContent});
    }

    handleIDChange(event) {
        this.setState({ID_tmp: event.target.textContent});
    }

    handleQuestion1(ans) {
        this.setState({ans_1: ans});
    }

    handleQuestion2(ans) {
        this.setState({ans_2: ans});
    }

    handleQuestion3(ans) {
        this.setState({ans_3: ans});
    }

    handlePwdChange(pwd) {
        this.setState({pwd: pwd})
    }

    postProfile = () => {
        const data = {
            account_id: this.state.account_id,
            email: this.state.email_tmp,
            student_id: this.state.ID_tmp,
            name: this.state.name_tmp,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch('http://localhost:3000/profile/' + String(this.state.account_id), requestOptions)
            .then(res => res.json())
    }

    postQuestionAnswers = (ans_1, ans_2, ans_3) => {
        const data = {
            account_id: this.state.account_id,
            ans_1: ans_1,
            ans_2: ans_2,
            ans_3: ans_3,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch('http://localhost:3000/profile/security_questions/' + String(this.state.account_id), requestOptions)
            .then(res => res.json())
    }

    postPassword = (pwd) => {
        const data = {
            account_id: this.state.account_id,
            password: pwd,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch('http://localhost:3000/profile/password/' + String(this.state.account_id), requestOptions)
            .then(res => res.json())
    }


    clickEditSave(event) {
        if (this.state.isEditing){
            this.setState({name: this.state.name_tmp});
            this.setState({email: this.state.email_tmp});
            this.setState({ID: this.state.ID_tmp});
            this.postProfile();
        }
        this.setState({isEditing: !this.state.isEditing});
        event.preventDefault();
    }

    clickChangeSQ(event) {
        this.setState({isChangingSQ: true});
        event.preventDefault();
    }

    clickSave(ans_1, ans_2, ans_3) {
        this.setState({isChangingSQ: false});
        this.setState({ans_1: ans_1});
        this.setState({ans_2: ans_2});
        this.setState({ans_3: ans_3});
        this.postQuestionAnswers(ans_1, ans_2, ans_3);
    }

    clickChangePwd(event) {
        this.setState({isChangingPwd: true});
        event.preventDefault();
    }

    clickConfirm(pwd) {
        this.setState({isChangingPwd: false});
        this.setState({pwd: pwd});
        this.postPassword(pwd);
    }



    render() {
        return(
            <section id="account_box">
            <div id="accountPage">
                <h1>My Account Information</h1>
                
                    <form id="accout_form">
                        <h2>{this.state.isEditing? "Editing your profile" : ""}</h2> 
                        <div>
                            <h4>Name：</h4>
                            <p contentEditable={this.state.isEditing} suppressContentEditableWarning={true} className="edit"
                                onInput={this.handleNameChange}>{this.state.name}</p>
                        </div>
                        <div>
                            <h4>Email：</h4>
                            <p contentEditable={this.state.isEditing} suppressContentEditableWarning={true} className="edit"
                                onInput={this.handleEmailChange}>{this.state.email}</p>
                        </div>
                        <div>
                            <h4>Student ID：</h4>
                            <p contentEditable={this.state.isEditing} suppressContentEditableWarning={true} className="edit"
                                onInput={this.handleIDChange}>{this.state.ID}</p>
                        </div>
                        
                        <div className="submit_buttons">
                            <div id="account_button">
                                <button id="edit_save" onClick={this.clickEditSave} 
                                    disabled={this.state.isChangingPwd||this.state.isChangingSQ}>
                                    {this.state.isEditing? "SAVE" : "EDIT PROFILE"}
                                </button>
                            </div>
                        </div>
                        <button className="b1" onClick={this.clickChangePwd}
                            disabled={this.state.isEditing||this.state.isChangingSQ}>
                            Change Password
                        </button>
                        <button className="b1" onClick={this.clickChangeSQ}
                            disabled={this.state.isEditing||this.state.isChangingPwd}>
                            Change Security Questions
                        </button>
                        <SecurityQuestions isChangingSQ={this.state.isChangingSQ} clickSave={this.clickSave}
                            handleQuestion1={this.handleQuestion1} handleQuestion2={this.handleQuestion2}
                            handleQuestion3={this.handleQuestion3} pwd={this.state.pwd}
                        />
                        <ChangePwd isChangingPwd={this.state.isChangingPwd} clickConfirm={this.clickConfirm}
                            handlePwdChange={this.handlePwdChange} pwd={this.state.pwd}
                        />
                    </form>
                
            </div>
            </section>
        );
    }
}

export default Account;
