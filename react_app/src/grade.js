import React from 'react';
import './course.css';


class AssignmentItem {
    constructor(name, due, grade, outOf) {
        this.name = name
        this.due = due
        this.grade = grade
        this.outOf = outOf
    }
}

class Grade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: []
        };
    }

    componentDidMount() {
        //  fetch here
        // this.setState({

        // })
    }

    renderAddForm = () => {
        return <form onSubmit={(e) => {
            e.preventDefault()

            let item = new AssignmentItem(
                e.target.name.value,
                e.target.due.value,
                e.target.grade.value,
                e.target.outOf.value,
            )
            this.setState((state) => {
                let items = state.assignments
                items.push(item)
                return items
            })

            e.target.name.value = ""
            e.target.due.value = ""
            e.target.grade.value = ""
            e.target.outOf.value = ""
        }}>
            Name:<input type="text" name="name"/><br/>
            Due:<input type="text" name="due"/><br/>
            Grade:<input type="text" name="grade"/><br/>
            Out Of:<input type="text" name="outOf"/><br/>
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

                </tr>

                {this.state.assignments.map(assignment =>
                    <tr>
                        <td><a href="#">{assignment.name}</a></td>
                        <td>{assignment.due}</td>
                        <td>{assignment.grade}</td>
                        <td>{assignment.outOf}</td>
                    </tr>
                )}
            </table>
            <br/>
            {this.props.accountType === "Admin" &&
                this.renderAddForm()
            }
        </section>
    }
}

export default Grade;
