import React from 'react';
import './course.css';


class GradeItem {
    constructor(student_name, name, dueDate, grade, maxPoint, details, rowid = null) {
        this.student_name = student_name
        this.name = name
        this.dueDate = dueDate
        this.grade = grade
        this.maxPoint = maxPoint
        this.details = details
        this.rowid = rowid
    }
}

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
        fetch(`http://localhost:3000/courses/${this.props.activeCourse}/grades?user_rowid=${(this.props.accountType === "Teacher") ? "" : this.props.accountID}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        assignments: result.data.map((item) => new GradeItem(
                            item.user_name,
                            item.assignment_name,
                            item.dueDate,
                            item.grade,
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
            await fetch('http://localhost:3000/assignment/' + String(assignment.rowid) + "/grade", requestOptions)
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
                    <th>Student Name</th>
                    <th>Assignment Name</th>
                    <th>Due</th>
                    <th>Grade</th>
                    <th>Out of</th>
                    <th>Action</th>
                </tr>

                {this.state.assignments.map(assignment =>
                    <tr>
                        <td>{assignment.student_name}</td>
                        <td><a href="#">{assignment.name}</a></td>
                        <td>{assignment.dueDate}</td>
                        <td>{assignment.grade}</td>
                        <td>{assignment.maxPoint}</td>
                        <td>
                            {this.props.accountType === "Teacher" &&
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
