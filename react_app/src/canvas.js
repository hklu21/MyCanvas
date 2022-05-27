import React from 'react';
import LogInSystem from './login_system'
import MainPages from './main_pages';

class MyCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            accountType: '',
            account_id: '',
        };
        this.clickLogIn = this.clickLogIn.bind(this);
        this.clickLogOut = this.clickLogOut.bind(this);
    }

    clickLogIn(account_id, type) {
        this.setState({
            account_id: account_id,
            accountType: type,
            isLoggedIn: true
        });
    }

    clickLogOut() {
        this.setState({isLoggedIn: false});
    }

    render() {
        switch (this.state.isLoggedIn) {
            case false:
                return <LogInSystem clickLogIn={this.clickLogIn}/>;
            case true:
                return <MainPages account_id={this.state.account_id} accountType={this.state.accountType} clickLogOut={this.clickLogOut}/>;
            default:
                return null;
        }
    }
}

export default MyCanvas;