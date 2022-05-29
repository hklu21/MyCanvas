import React from 'react';
import './course.css';
import {AssignmentItem} from "./assignment";

//
// class AssignmentItem {
//     constructor(name, due, grade, outOf) {
//         this.name = name
//         this.due = due
//         this.grade = grade
//         this.outOf = outOf
//     }
// }

class Grade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [],
            updatingAssignmentItem: null  // an instance of AssignmentItem or null
        };
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        // fetch("http://localhost:3000/assignment")
        fetch(`http://localhost:3000/courses/${this.props.activeCourse}/assignments?rowid=${this.props.accountID}`) 
            .then(res => res.json())
            .then(
                (result) => {
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
                // (error) => {
                //     this.setState({
                //         isLoaded: true,
                //         error
                //     });
                // }
            )
    }

    renderUpdateGradeForm = () => {
        let assignment = this.state.updatingAssignmentItem

        return <form onSubmit={async (e) => {
            e.preventDefault()


            // http put assignment

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ grade: e.target.grade.value })
            };
            await fetch('http://localhost:3000/assignment/' + String(assignment.id) + "/grade", requestOptions)
                .then(response => response.json())

            this.loadData()
        }}>
            Assignment Name: {assignment.name}<br/>
            Grade: <input type="text" name="grade"/><br/>
            Maximum Points: {assignment.maxPoint}<br/>
            <button type="submit">Submit</button>
        </form>
    }

    render() {
        return <section id="grades">
            <h1>Grades for {this.props.activeCourse}</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Due</th>
                    <th>Grade</th>
                    <th>Out of</th>
                    <th>Action</th>
                </tr>

                {this.state.assignments.map(assignment =>
                    <tr>
                        <td><a href="#">{assignment.name}</a></td>
                        <td>{assignment.dueDate}</td>
                        <td>{assignment.grade}</td>
                        <td>{assignment.maxPoint}</td>
                        <td>
                            {this.props.accountType === "Admin" &&
                                <button onClick={() => {
                                    this.setState({
                                        updatingAssignmentItem: assignment
                                    })
                                }}>Update Grade</button>
                            }
                        </td>
                    </tr>
                )}
            </table>
            <br/>
            {this.state.updatingAssignmentItem != null &&
                this.renderUpdateGradeForm()
            }
        </section>
    }
}

export default Grade;
