import React from 'react';
import './account.css';
import './setting.css';

class AssignmentItem {
    constructor(name, dueDate, maxPoint, details, course_id) {
        this.name = name 
        this.dueDate = dueDate
        this.maxPoint = maxPoint
        this.details = details
        this.course_id = course_id
    }
}

class StudentDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account_id: this.props.account_id,
            assignments_to_do: [],
            assignments_upcoming: [],
            assignments_past: [],
        };
    }

    loadData = () => {
        fetch('http://localhost:3000/assignments_to_do/' + String(this.state.account_id))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        assignments_to_do: result.data.map((item) => new AssignmentItem(
                            item.name,
                            item.dueDate,
                            item.maxPoint,
                            item.details,
                            item.course_id,
                        ))
                    });
                }
            )

        fetch('http://localhost:3000/assignments_past/' + String(this.state.account_id))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        assignments_past: result.data.map((item) => new AssignmentItem(
                            item.name,
                            item.dueDate,
                            item.maxPoint,
                            item.details,
                            item.course_id,
                        ))
                    });
                }
            )

        fetch('http://localhost:3000/assignments_upcoming/' + String(this.state.account_id))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        assignments_upcoming: result.data.map((item) => new AssignmentItem(
                            item.name,
                            item.dueDate,
                            item.maxPoint,
                            item.details,
                            item.course_id,
                        ))
                    });
                }
            )
    }

    componentWillMount() {
        this.loadData()
    }


    render() {
        if (this.props.account_type !== 'Student') {
            return null;
        } else {
            return(
                <div className="dashboardPage">
                    <br/>
                    <br/>
                    <br/>
                    <h3>Assignments To do:</h3>
                    <div className="assignments_to_do">
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>Assignment
                                    </td>
                                    <td>Due Date
                                    </td>
                                    <td>Max Point
                                    </td>
                                    <td>Detail
                                    </td>
                                    <td>Course
                                    </td>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.assignments_to_do.map(( assignment, index )  => {
                                    return ( 
                                        <tr key={index}>
                                            <td>{assignment.name}
                                            </td>
                                            <td>{assignment.dueDate}
                                            </td>
                                            <td>{assignment.maxPoint}
                                            </td>
                                            <td>{assignment.details}
                                            </td>
                                            <td>{assignment.course_id}
                                            </td>
                                        </tr>
                                    );
                                })
                                } 
                            </tbody>
                        </table>
                    </div>

                    <h3>Assignments Past:</h3>
                    <div className="assignments_past">
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>Assignment
                                    </td>
                                    <td>Due Date
                                    </td>
                                    <td>Max Point
                                    </td>
                                    <td>Detail
                                    </td>
                                    <td>Course
                                    </td>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.assignments_past.map(( assignment, index )  => {
                                    return ( 
                                        <tr key={index}>
                                            <td>{assignment.name}
                                            </td>
                                            <td>{assignment.dueDate}
                                            </td>
                                            <td>{assignment.maxPoint}
                                            </td>
                                            <td>{assignment.details}
                                            </td>
                                            <td>{assignment.course_id}
                                            </td>
                                        </tr>
                                    );
                                })
                                } 
                            </tbody>
                        </table>
                    </div>

                    <h3>Assignments Upcoming:</h3>
                    <div className="assignments_upcoming">
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>Assignment
                                    </td>
                                    <td>Due Date
                                    </td>
                                    <td>Max Point
                                    </td>
                                    <td>Detail
                                    </td>
                                    <td>Course
                                    </td>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.assignments_upcoming.map(( assignment, index )  => {
                                    return ( 
                                        <tr key={index}>
                                            <td>{assignment.name}
                                            </td>
                                            <td>{assignment.dueDate}
                                            </td>
                                            <td>{assignment.maxPoint}
                                            </td>
                                            <td>{assignment.details}
                                            </td>
                                            <td>{assignment.course_id}
                                            </td>
                                        </tr>
                                    );
                                })
                                } 
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

class TeacherDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account_id: this.props.account_id,
            assignments_past: [],
        };
    }

    loadData = () => {

        fetch('http://localhost:3000/assignments_past/' + String(this.state.account_id))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        assignments_past: result.data.map((item) => new AssignmentItem(
                            item.name,
                            item.dueDate,
                            item.maxPoint,
                            item.details,
                            item.course_id,
                        ))
                    });
                }
            )
    }

    componentWillMount() {
        this.loadData()
    }


    render() {
        if (this.props.account_type !== 'Teacher') {
            return null;
        } else {
            return(
                <div className="dashboardPage">
                    <br/>
                    <br/>
                    <br/>
                    <h3>Assignments Need Grading:</h3>
                    <div className="assignments_past">
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>Assignment
                                    </td>
                                    <td>Due Date
                                    </td>
                                    <td>Max Point
                                    </td>
                                    <td>Detail
                                    </td>
                                    <td>Course
                                    </td>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.assignments_past.map(( assignment, index )  => {
                                    return ( 
                                        <tr key={index}>
                                            <td>{assignment.name}
                                            </td>
                                            <td>{assignment.dueDate}
                                            </td>
                                            <td>{assignment.maxPoint}
                                            </td>
                                            <td>{assignment.details}
                                            </td>
                                            <td>{assignment.course_id}
                                            </td>
                                        </tr>
                                    );
                                })
                                } 
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account_id: this.props.account_id,
            num_active_students: 0,
            num_active_teachers: 0,
            num_courses: 0,
        };
    }

    loadData = () => {

        fetch('http://localhost:3000/num_students')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        num_active_students: result.data[0]['number_of_students'],
                    });
                }
            )

        fetch('http://localhost:3000/num_teachers')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        num_active_teachers: result.data[0]['number_of_teachers'],
                    });
                }
            )

        fetch('http://localhost:3000/num_courses')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        num_courses: result.data[0]['number_of_courses'],
                    });
                }
            )
    }

    componentWillMount() {
        this.loadData()
    }


    render() {
        if (this.props.account_type !== 'Admin') {
            return null;
        } else {
            return(
                <div className="dashboardPage">
                    <br/>
                    <br/>
                    <br/>
                    <div className="assignments_past">
                        <br/>
                        <span><h3>Number of Active Students: {this.state.num_active_students}</h3></span>
                        <br/>
                        <br/>
                        <span><h3>Number of Courses: {this.state.num_courses}</h3></span>
                        <br/>
                        <br/>
                        <span><h3>Number of Active Teachers: {this.state.num_active_teachers}</h3></span>
                        <br/>
                        <br/>
                    </div>
                </div>
            );
        }
    }
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account_id: this.props.account_id,
            student_id: '',
            account_type: '',
        };

    }

    loadData = () => {
        fetch('http://localhost:3000/account/rowid/' + String(this.state.account_id))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        account_type: result.data[0]['account_type'],
                        student_id: result.data[0]['student_id']
                    });
                }
            )
    }

    componentDidMount() {
        this.loadData()
    }


    render() {
        return(
            <section>
                <div id="dashboardPage">
                    <h1>Dashboard</h1>
                    <StudentDashboard account_type={this.state.account_type} account_id={this.props.account_id}/>
                    <TeacherDashboard account_type={this.state.account_type} account_id={this.props.account_id}/>
                    <AdminDashboard account_type={this.state.account_type} account_id={this.props.account_id}/>
                </div>
            </section>
        );
    }
}

export default Dashboard;