import React from 'react';
import Account from './account';
import logo from './logo.png'
import './account.css';
import Course from "./course";
import Setting from "./setting";
import Dashboard from './dashboard';

class SettingsButton extends React.Component {
    render() {
        if (this.props.accountType !== 'Admin') {
            return null;
        } else {
            return <a className={this.props.pageShow[3]? "active":""} href="#Setting" 
                    onClick={this.props.clickSetting}>Setting</a>
        }
    }
}
class NavBar extends React.Component {
    render() {
        return(
            <nav>
                <img src={logo} alt=""/>
                <div className="topnav">
                    <a className={this.props.pageShow[0]? "active":""} href="#Dashboard"
                        onClick={this.props.clickDashBoard}>Dashboard</a>
                    <a className={this.props.pageShow[1]? "active":""} href="#Course"
                        onClick={this.props.clickCourse}>Course</a>
                    <a className={this.props.pageShow[2]? "active":""} href="#Account"
                        onClick={this.props.clickAccount}>Account</a>
                    <SettingsButton accountType={this.props.accountType} pageShow={this.props.pageShow}
                            clickSetting={this.props.clickSetting}/>
                    <a href="#LogOut" onClick={this.props.clickLogOut}>Log Out</a>
                </div>
            </nav>
        );
    }
}

class MainPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account_id: this.props.account_id,
            page: "DashBoard",
            pageShow: [true, false, false, false],
            name: 'Name',
            email: '',
            ID: 'Student ID',
            accountType: this.props.accountType,
            userType: '',
            pwd: 'asd1!',
            ans_1: 'ans1',
            ans_2: 'ans2',
            ans_3: 'asn3',
        };
        this.clickDashBoard = this.clickDashBoard.bind(this);
        this.clickCourse = this.clickCourse.bind(this);
        this.clickAccount = this.clickAccount.bind(this);
        this.clickSetting = this.clickSetting.bind(this);
        this.clickLogOut = this.clickLogOut.bind(this);
        this.loadInfo = this.loadInfo.bind(this);
    }

    clickDashBoard(){
        // alert("DashBoard");
        this.setState({page: "DashBoard"});
        this.setState({pageShow: [true, false, false, false]});
    }

    clickCourse(){
        // alert("Course");
        this.setState({page: "Course"});
        this.setState({pageShow: [false, true, false, false]});
    }

    clickAccount(){
        this.setState({page: "Account"});
        this.setState({pageShow: [false, false, true, false]});
    }

    clickSetting(){
        // alert("Setting");
        this.setState({page: "Setting"});
        this.setState({pageShow: [false, false, false, true]});
    }

    clickLogOut(){
        this.setState({pageShow: [false, false, false, false]});
        this.props.clickLogOut();
    }

    /* query account information when page loaded */
    loadInfo() {
        /*
        this.setState({name: });
        this.setState({ID: });
        this.setState({pwd: });
        this.setState({accountType: });
        this.setState({userType: });
        this.setState({ans_1: });
        this.setState({ans_2: });
        this.setState({ans_3: });
        */
    }

    render() {
        this.loadInfo();
        switch (this.state.page) {
            case "Account":
                return (
                    <div id="accountPage">
                        <NavBar pageShow={this.state.pageShow} clickAccount={this.clickAccount} 
                            clickCourse={this.clickCourse} clickDashBoard={this.clickDashBoard}
                            clickSetting={this.clickSetting} clickLogOut={this.clickLogOut}
                            accountType={this.props.accountType}
                        />
                        <Account account_id={this.props.account_id}/>
                    </div>
                );
            case "DashBoard":
                return (
                    <div id="dashboardPage">
                        <NavBar pageShow={this.state.pageShow} clickAccount={this.clickAccount} 
                            clickCourse={this.clickCourse} clickDashBoard={this.clickDashBoard}
                            clickSetting={this.clickSetting} clickLogOut={this.clickLogOut}
                            accountType={this.props.accountType}
                        />
                        <Dashboard account_id={this.props.account_id}/>
                    </div>
                );
            case "Course":
                return (
                    <div id="coursePage">
                        <NavBar pageShow={this.state.pageShow} clickAccount={this.clickAccount} 
                            clickCourse={this.clickCourse} clickDashBoard={this.clickDashBoard}
                            clickSetting={this.clickSetting} clickLogOut={this.clickLogOut}
                            accountType={this.props.accountType}
                        />
                        <Course accountID={this.props.account_id} accountType={this.state.accountType}/>
                    </div>
                );
            case "Setting":
                return (
                    <div id="settingPage">
                        <NavBar pageShow={this.state.pageShow} clickAccount={this.clickAccount} 
                            clickCourse={this.clickCourse} clickDashBoard={this.clickDashBoard}
                            clickSetting={this.clickSetting} clickLogOut={this.clickLogOut}
                            accountType={this.props.accountType}
                        />
                        <Setting />
                    </div>
                );
            default:
                return null;
        }
    }
}

export default MainPages;
