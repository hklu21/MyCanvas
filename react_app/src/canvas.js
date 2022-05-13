import React from 'react';
import LogInSystem from './login_system'
import MainPages from './main_pages';

class MyCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            accountType: '',
            email: '',
        };
        this.clickLogIn = this.clickLogIn.bind(this);
        this.clickLogOut = this.clickLogOut.bind(this);
    }

    clickLogIn(email, type) {
        this.setState({email: email});
        this.setState({accountType: type});
        this.setState({isLoggedIn: true});
    }

    clickLogOut() {
        this.setState({isLoggedIn: false});
    }

    render() {
        switch (this.state.isLoggedIn) {
            case false:
                return <LogInSystem clickLogIn={this.clickLogIn}/>;
            case true:
                return <MainPages email={this.state.email} clickLogOut={this.clickLogOut}/>;
            default:
                return null;
        }
    }
}

export default MyCanvas;