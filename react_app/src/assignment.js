import React from 'react';
import './assignment.css';
import AssignmentDetail from "./assignment-detail";

export class AssignmentItem {
    constructor(name, dueDate, maxPoint, details, rowid = null) {
        this.name = name
        this.dueDate = dueDate
        this.maxPoint = maxPoint
        this.details = details
        this.rowid = rowid
    }
}

class Assignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [],
            newAssignment: null,
            showAssignmentDetail: false,
            assignmentDetailId: null
        }
    }

    componentDidMount() {
        // fetch all assignments for activeCourse for student
        console.log("account type: ", this.props.accountType);
        console.log("account id: ", this.props.accountID);
        fetch(`http://localhost:3000/courses/${this.props.activeCourse}/assignments?rowid=${this.props.accountID}`) 
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result.data)
                    this.setState({
                        assignments: result.data.map((item) => new AssignmentItem(
                            item.name,
                            item.dueDate,
                            item.maxPoint,
                            item.details,
                            item.rowid
                        ))
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

    renderAddAssignment = () => {
        return (
            <>
            <div className="create_assignment_page">
                <h1> Create Assignment</h1>
                <form onSubmit={(e) => {
                    e.preventDefault()

                    let item = new AssignmentItem(e.target.assign_name.value, e.target.assign_due.value, e.target.assign_point.value, e.target.assign_detail.value, null)
                    this.setState((state) => {
                        state.newAssignment = item
                        return item
                    })

                    var newAssignemntData = {
                        'name': this.state.newAssignment.name,
                        'dueDate': this.state.newAssignment.dueDate,
                        'maxPoint': this.state.newAssignment.maxPoint,
                        'details': this.state.newAssignment.details,
                        // 'course_id': this.props.activeCourse
                    }

                    // console.log(newAssignemntData['name']);

                    fetch(`http://localhost:3000/courses/${this.props.activeCourse}/assignments`, {  // Enter your IP address here
                        method: 'POST', 
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newAssignemntData) // body data type must match "Content-Type" header
                    })

                    e.target.reset()
                }}>
                    <label htmlFor="assign_name">Assignment Title:</label>
                    <input type="text" id="assign_name" name="assign_name" size="50"/><br/><br/>


                    <label htmlFor="assign_point">Maximum Points:</label>
                    <input type="number" id="assign_point" name="assign_point" min="1" max="200"/><br/><br/>


                    <label htmlFor="assign_due">Due Date:</label>
                    <input type="text" id="assign_due" name="assign_due" size="50"/><br/><br/>


                    <label htmlFor="assign_detail">Details:</label><br/>
                    <textarea id="assign_detail" rows="10" cols="100%"></textarea> <br/><br/>
                    <input type="submit" value="Create Assignment"/>
                </form>
            </div>
            </>
        );
    }

    render() {
        if (this.state.showAssignmentDetail) {
            return (
                <>
                    <AssignmentDetail accountID={this.props.accountID} activeCourse={this.props.activeCourse} assignmentID={this.state.assignmentDetailId}/>
                </>
            )
        }
        else {
            return (
                <>
                <div className="assignment_page">
                    <h1>Assignments</h1>
                    <div className="all-assignments">
                        {this.state.assignments.map(( assignment, index )  => {
                            return (
                                <div className="assign-row-layout" key={index}>
                                    <a href={`#Assignment/${this.state.assignmentDetailId}`} className="assign-name-link" onClick={() => { this.setState({showAssignmentDetail: true, assignmentDetailId: assignment.rowid});}}>{assignment.name}</a>
                                    <div className="assign-row-detail">
                                        <p className="assign-row-detail-date">{assignment.dueDate}</p>
                                        <p className="assign-row-detail-point">{assignment.maxPoint}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
    
                <br/>
                {this.props.accountType === "Teacher" &&
                    this.renderAddAssignment()
                }
                {/* {this.renderAddAssignment()} */}
                </>
            );
        }
        
    }


}

export default Assignment;
