import React from 'react';
import './setting.css';

class UserItem {
    constructor(name, email, status, rowid) {
        this.name = name 
        this.email = email
        if (status === 1){
            this.status= 'active'
        } else {
            this.status= 'inactive'
        }
        this.rowid = rowid
        
    }
}

class Setting extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedCourses: [],
            userAlreadyRegisteredCourses: [],
            courses: [],
            newCoursesToSelect: [],
            allUsers: [],
            filteredUsers: [],
            showUsers: [],
            filtering: false,
            searchQuery: "",
            show: false, // show the Modal
            editUserNewStatus: 1,
            editUser: new UserItem("", "", "", 1)
        }

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleCourseChange = this.handleCourseChange.bind(this);

        this.filterUser = this.filterUser.bind(this);
        this.searchUser = this.searchUser.bind(this);
    }

    componentDidMount() {
        // Fetch all Users
        // console.log("account type: ", this.props.accountType);
        // console.log("account id: ", this.props.accountID);
        fetch(`http://localhost:3000/users`) 
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result.data)
                    this.setState({
                        allUsers: result.data.map((item) => new UserItem(
                            item.name,
                            item.email,
                            item.activity,
                            item.rowid
                        )),
                        // filteredUsers: result.data.map((item) => new UserItem(
                        //     item.name,
                        //     item.email,
                        //     item.activity,
                        //     item.rowid
                        // ))
                    }, () => {
                        this.setState({filteredUsers: this.state.allUsers, showUsers: this.state.allUsers})
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

        fetch(`http://localhost:3000/courses`) 
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result.data)
                    this.setState({
                        courses: result.data.map((item) => item.course_id)
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    

    showModal = user => () => {
        this.setState({ 
            show: true,
            editUser: user,
            selectedCourses: [],
            newCoursesToSelect: []
        }, () => {
            fetch(`http://localhost:3000/users/${this.state.editUser.rowid}/courses`) 
                .then(res => res.json())
                .then(
                    (result) => {
                        // console.log(result.data)
                        this.setState({
                            userAlreadyRegisteredCourses: result.data.map((item) => item.course_id) // Courses that the edit user already taken
                        }, () => {
                            console.log("already taken courses:", this.state.userAlreadyRegisteredCourses)
                            var newCourses;
                            newCourses = this.state.courses.filter(course => !(this.state.userAlreadyRegisteredCourses.includes(course)))
                            this.setState({newCoursesToSelect: newCourses}, () => {
                                console.log("new courses to select:", this.state.newCoursesToSelect)
                            }) // New courses for edit user to select  (Courses - Already Taken Courses)
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    saveModal = () => {
        this.setState({ show: false});

        var newUserData = {
            'rowid': this.state.editUser.rowid,
            'status': this.state.editUserNewStatus
        }

        fetch(`http://localhost:3000/users/${this.state.editUser.rowid}`, {  
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUserData)  
        })
        // window.location.reload();

        // modify that user's data in state.allUsers and state.filteredUsers
        // https://levelup.gitconnected.com/using-the-map-function-in-javascript-react-b433736759d4
        let newAllUsers = this.state.allUsers.map(user => {
            if (user.rowid === this.state.editUser.rowid) {
                return {
                    ...user,
                    status: this.state.editUserNewStatus === 1 ? "active" : "inactive"
                }
            }
            return user
        })
        this.setState({allUsers: newAllUsers}, () => {
            if (this.state.filtering) {
                this.setState({showUsers: this.state.filteredUsers});
            }
        });

        let newFilteredUsers = this.state.filteredUsers.filter(user => !(user.rowid === this.state.editUser.rowid && user.status !== (this.state.editUserNewStatus === 1 ? "active": "inactive")))
        
        this.setState({filteredUsers: newFilteredUsers}, () => {
            if (!this.state.filtering) {
                this.setState({showUsers: this.state.allUsers});
            }         
        });


        // Add user to courses
        var newUserCoursesData = {
            'rowid': this.state.editUser.rowid,
            'selectedCourses': this.state.selectedCourses
        }

        fetch(`http://localhost:3000/users/${this.state.editUser.rowid}/courses/`, {  
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUserCoursesData)  
        })
    };

    handleCourseChange = (e) => {
        // e.preventDefault();

        var newSelectedCourses;
        if (e.target.checked) {
            // checked, add a new course
            newSelectedCourses = this.state.selectedCourses;
            newSelectedCourses.push(e.target.value);
            this.setState({selectedCourses: newSelectedCourses}, () => {console.log("selected", this.state.selectedCourses);});
        } else {

            // unchecked, delete a course
            newSelectedCourses = this.state.selectedCourses.filter((item) => item !== e.target.value);
            this.setState({selectedCourses: newSelectedCourses}, () => {console.log("selected", this.state.selectedCourses);});
        
        }
    
    }

    handleStatusChange = (e) => {
        e.preventDefault();
        if (e.target.value === 'active') {
            this.setState({editUserNewStatus: 1});
        } else if (e.target.value === 'inactive'){
            this.setState({editUserNewStatus: 0});
        }
        // e.reset();
    }

    // Function to filter user when click buttons
    filterUser = status => (e) => {
        e.preventDefault();
        if (status === "all") {
            this.setState({showUsers: this.state.allUsers, filtering: false})
        } else {
            this.setState({filteredUsers: this.state.allUsers.filter(
                u => {
                    return u.status === status
                }
            )}, () => { this.setState({showUsers: this.state.filteredUsers, filtering: true})})
           
        } 
    }

    handleInputChanged(event) {
        this.setState({
            searchQuery: event.target.value
        });
    }

    // Function to search user by name or email
    searchUser = searchInput => (e) => {
        e.preventDefault()
        this.setState({filteredUsers: this.state.allUsers.filter(
            u => {
                return u.name === searchInput || u.email === searchInput
            }
        ), searchQuery : ""
        }, () => {
            this.setState({showUsers: this.state.filteredUsers})
        })
        
    }


    render() {
        return <>
            <div className="setting_page">

                <div className="search-filter">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <div className="search">
                        <form action="#">
                            <input type="text" value={this.state.searchQuery} onChange={this.handleInputChanged.bind(this)}  name="search"/>
                            <button type="submit" onClick={this.searchUser(this.state.searchQuery)}><i className="fa fa-search"></i></button>
                        </form>
                    </div>

                    <div className="filter">
                        <button className="btn" onClick={this.filterUser('all')}> All</button>
                        <button className="btn" onClick={this.filterUser('active')}> Active</button>
                        <button className="btn" onClick={this.filterUser('inactive')}> Inactive </button>
                    </div>
                </div>

                <div className="setting_users">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Name
                                </td>
                                <td>Email
                                </td>
                                <td>Status
                                </td>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.showUsers.map(( user, index )  => {
                                return ( 
                                    <tr key={index}>
                                        <td>{user.name}
                                        </td>
                                        <td>{user.email}
                                        </td>
                                        <td>{user.status}
                                        </td>
                                        <td>
                                            <button onClick={this.showModal(user)}>Edit</button>
                                        </td>
                                    </tr>
                                );
                            })
                            }
                                
                        </tbody>
                    </table>
                </div>

                <Modal show={this.state.show} handleClose={this.hideModal} handleSave={this.saveModal}>
                    <p>Name: {this.state.editUser.name}</p>
                    <p>Email: {this.state.editUser.email}</p>
                    <br/>
                    <p>Status: </p>
                    
                    <select name="status" id="user-status" onChange={this.handleStatusChange}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <br/><br/>
                    <p>Add to Courses: </p>
                    
                    {this.state.newCoursesToSelect.map(( course, index )  => {
                        return ( 
                            <>
                                <input type="checkbox" value={course} id={course} name={course} key={index} onChange={this.handleCourseChange}/>
                                <label for={course}>{course}</label>
                                <br/>
                            </>
                        );
                    })
                    }
                                
                </Modal>
            </div>
        </>
    }

}


// https://www.digitalocean.com/community/tutorials/react-modal-component
const Modal = ({ handleClose, show, handleSave, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <div className="modal-main">
          <button type="button" onClick={handleClose}>
            Close
          </button>
          <button type="button" onClick={handleSave}>
            Save
          </button>
          {children}
        </div>
      </div>
    );
  };

export default Setting;

