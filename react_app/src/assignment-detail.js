import React from 'react';
import './assignment-detail.css';

export class AssignmentItem {
    constructor(name, dueDate, maxPoint, details, rowid = null) {
        this.name = name
        this.dueDate = dueDate
        this.maxPoint = maxPoint
        this.details = details
        this.rowid = rowid
    }
}

class AssignmentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignment: null
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/courses/" + this.props.activeCourse +  "/assignments/" + this.props.assignmentID)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        assignment: new AssignmentItem(
                            result.data[0].name,
                            result.data[0].dueDate,
                            result.data[0].maxPoint,
                            result.data[0].details,
                            result.data[0].rowid
                        )
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

    render() {
        if (this.state.assignment) {
            return (
                <>
                <div className="assignment_detail_page">
                    <div className="assign_info">
                        <p id="assign_info_title">{this.state.assignment.name}</p>
                        <div id="assign_info_detail">
                            <p id="assign_info_date">Due: {this.state.assignment.dueDate}</p>
                            <p id="assign_info_points">{this.state.assignment.maxPoint} points</p>
                        </div>
                    </div>

                    <hr/>

                    <div className="assign_detail">
                        <p>Details</p>
                        <div id="assign_detail_description">
                            <p>
                                {this.state.assignment.details}
                            </p>
                            {/* <ul>
                                <li>
                                    Follow the instructions to get Angular OR React application set up on your machine. 
                                </li>
                                <li>
                                    Once your application is ready, submit a screenshot of the browser. The screenshot must show the browser URL, your name, and date/time.
                                </li>
                            
                            </ul> */}
                        </div>
                    </div>
                    
                    <hr/>

                    {this.props.accountType === "Student" && 
                    <>
                        <div className="assign_submit">
                        <p className="title">Submit</p>
                        <form onSubmit={(e) => {
                            e.preventDefault()

                            var assignmentAnswerData = {
                                'row_id': this.props.accountID,
                                'answer': e.target.assign_answer.value
                            }

                            fetch(`http://localhost:3000/courses/${this.props.activeCourse}/assignments/${this.props.assignmentID}`, {  // Enter your IP address here
                                method: 'POST', 
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(assignmentAnswerData) // body data type must match "Content-Type" header
                            })

                            e.target.reset()
                            
                        }}>
                            <textarea id="assign_answer" rows="10"></textarea><br/><br/>
                            <input type="submit" value="Submit Assignment"/>
                        </form>
                    </div>
                    </>
                    }
                    
                </div>

                <br/>
                
                </>
            );
        }
    }


}

export default AssignmentDetail;
