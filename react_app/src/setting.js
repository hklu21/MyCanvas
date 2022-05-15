import React from 'react';
import './setting.css';

class UserItem {
    constructor(name, email, status) {
        this.name = name 
        this.email = email
        this.status= status
    }
}

class Setting extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            allUsers: [
                new UserItem("fake-student1", "fake1@uchicago.edu", "active"),
                new UserItem("fake-student2", "fake2@uchicago.edu", "active"),
                new UserItem("fake-student3", "fake3@uchicago.edu", "inactive"),
            ],
            filteredUsers: [
                new UserItem("fake-student1", "fake1@uchicago.edu", "active"),
                new UserItem("fake-student2", "fake2@uchicago.edu", "active"),
                new UserItem("fake-student3", "fake3@uchicago.edu", "inactive"),
            ],
            searchQuery: "",
            show: false,
            editUser: new UserItem("fake-student1", "fake1@uchicago.edu", "active")
        }

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

        this.filterUser = this.filterUser.bind(this);
        this.searchUser = this.searchUser.bind(this);
    }

    showModal = user => () => {
        this.setState({ 
            show: true,
            editUser: user
        });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    saveModal = () => {
        this.setState({ show: false });
    };


    // Function to filter user when click buttons
    filterUser = status => (e) => {
        e.preventDefault();
        if (status == "all") {
            this.setState({filteredUsers: this.state.allUsers})
        } else {
            this.setState({filteredUsers: this.state.allUsers.filter(
                u => {
                    return u.status == status
                }
            )})
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
                return u.name == searchInput || u.email == searchInput
            }
        ), searchQuery : ""
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
                            {this.state.filteredUsers.map(( user, index )  => {
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
                    <p>Status: </p>
                    <select name="status" id="user-status">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
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

