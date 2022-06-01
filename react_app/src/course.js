import React from 'react';
import './course.css';
import Announcement from "./announcement";
import Grade from "./grade";
import Assignment from "./assignment";


const TABS = [
    "Announcements",
    "Grades",
    "Assignments"
]

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            activeCourse: null,
            activeTab: 0,
            displayCreateForm: false,
            teachers: []
        };
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = async () => {
        await fetch('http://localhost:3000/courses')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        courses: result.data
                    });
                }
            )
    }

    renderNavBar = () => {
        return <div className="innernav">
            {TABS.map((tab, index) => {
                return <a
                    className={index === this.state.activeTab ? "active": ""}
                    href={`#` + tab}
                    onClick={() => {
                        this.setState({
                            activeTab: index
                        })
                    }}
                >
                    {tab}
                </a>
            })}
        </div>
    }

    renderBody = () => {
        let currentTab = null
        switch (this.state.activeTab) {
            case 0:
                currentTab = <Announcement activeCourse={this.state.activeCourse} accountType={this.props.accountType}/>
                break
            case 1:
                currentTab = <Grade accountID={this.props.accountID} activeCourse={this.state.activeCourse} accountType={this.props.accountType}/>
                break
            default:
                // currentTab = <>Coming soon!</>
                currentTab = <Assignment accountID={this.props.accountID} activeCourse={this.state.activeCourse} accountType={this.props.accountType}/>
        }

        return <section id="course">
            <h1>Courses</h1>
            <br/>
            <form onSubmit={(e) => {
                e.preventDefault()

                this.setState({
                    displayCreateForm: false,
                    activeCourse: e.target.course.value
                })
            }}>
                <select name="course">
                    {this.state.courses.map((course) => {
                        return <option value={course.course_id}>{course.course_id}</option>
                    })})
                </select>
                <button type="submit">View</button>
                <button type="button" onClick={this.loadData}>Refresh</button>
                {this.props.accountType === "Admin" &&
                    <button type="button" onClick={() => {
                        fetch('http://localhost:3000/account/teachers')
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    console.log(result)
                                    this.setState({
                                        displayCreateForm: true,
                                        activeCourse: null,
                                        teachers: result.data
                                    })
                                }
                            )

                    }
                    }>Create</button>
                }
            </form>

            {this.state.activeCourse &&
                <div key={this.state.activeCourse}>
                    Current course: {this.state.activeCourse}
                    <br/>
                    {this.renderNavBar()}
                    <br/>
                    {currentTab}
                </div>
            }

            {this.state.displayCreateForm &&
                <form onSubmit={(e) => {
                    e.preventDefault()

                    var createCourseData = {
                        'course_name': e.target.course_name.value,
                        'description': e.target.description.value,
                        'capacity':e.target.capacity.value,
                        'teacher': e.target.teacher.value

                    }

                    fetch(`http://localhost:3000/courses/`, {  // Enter your IP address here
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(createCourseData) // body data type must match "Content-Type" header
                    })
                        .then(async () => {
                            await this.setState({
                                displayCreateForm: false
                            })

                            this.loadData()
                        })
                }}>
                    Course Name: <input name="course_name" rows="10"></input><br/><br/>
                    Description: <textarea name="description" rows="10"></textarea><br/><br/>
                    Capacity: <input name="capacity" rows="10"></input><br/><br/>
                    <select name="teacher">
                        {this.state.teachers.map((teacher) => {
                            return <option value={teacher.email}>{teacher.name}</option>
                        })})
                    </select>
                    <input type="submit" value="Create Course"/>
                </form>
            }
        </section>
    }

    render() {
        return this.renderBody()
    }
}

export default Course;
