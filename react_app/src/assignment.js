import React from 'react';
import './assignment.css';

class AssignmentItem {
    constructor(name, dueDate, maxPoint, detail) {
        this.name = name
        this.dueDate = dueDate
        this.maxPoint = maxPoint
        this.detail = detail
    }
}

class Assignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [
                new AssignmentItem("Assignment 1", "Due on May 8th", "3 points", "Details of Assignment 1"),
                new AssignmentItem("Assignment 2", "Due on May 8th", "3 points", "Details of Assignment 2"),
                new AssignmentItem("Assignment 3", "Due on May 8th", "3 points", "Details of Assignment 3"),
            ]
        }
    }

    renderAddAssignment = () => {
        return (
            <>
            <div class="create_assignment_page">
                <h1> Create Assignment</h1>
                <form onSubmit={(e) => {
                    e.preventDefault()

                    let item = new AssignmentItem(e.target.assign_title.value, "Due on " + e.target.assign_due.value, e.target.assign_point.value + " points", e.target.assign_detail.value)
                    this.setState((state) => {
                        let items = state.assignments
                        items.push(item)
                        return items
                    })

                    e.target.reset()
                }}>
                    <label for="assign_title">Assignment Title:</label>
                    <input type="text" id="assign_title" name="assign_title" size="50"/><br/><br/>


                    <label for="assign_point">Maximum Points:</label>
                    <input type="number" id="assign_point" name="assign_point" min="1" max="200"/><br/><br/>


                    <label for="assign_due">Due Date:</label>
                    <input type="text" id="assign_due" name="assign_due" size="50"/><br/><br/>


                    <label for="assign_detail">Details:</label><br/>
                    <textarea id="assign_detail" rows="10" cols="100%"></textarea> <br/><br/>
                    <input type="submit" value="Create Assignment"/>
                </form>
            </div>
            </>
        );
    }

    render() {
        return (
            <>
            <div class="assignment_page">
                <h1>Assignments</h1>
                <div class="all-assignments">
                    {this.state.assignments.map(assignment => <>
                        <div class="assign-row-layout">
                            <a href="#" class="assign-name-link">{assignment.name}</a>
                            <div class="assign-row-detail">
                                <p class="assign-row-detail-date">{assignment.dueDate}</p>
                                <p class="assign-row-detail-point">{assignment.maxPoint}</p>
                            </div>
                        </div>
                        </>
                    )}
                </div>
            </div>

            <br/>
            {this.props.accountType === "Admin" &&
                this.renderAddAssignment()
            }
            </>
        );
    }


}

export default Assignment;