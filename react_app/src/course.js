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
            courses: ["MPCS 52553", "MPCS 51222"],
            activeCourse: null,
            activeTab: 0
        };
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
                currentTab = <Grade activeCourse={this.state.activeCourse} accountType={this.props.accountType}/>
                break
            default:
                // currentTab = <>Coming soon!</>
                currentTab = <Assignment activeCourse={this.state.activeCourse} accountType={this.props.accountType}/>
        }

        return <section id="course">
            <h1>Courses</h1>
            <br/>
            <form onSubmit={(e) => {
                e.preventDefault()

                this.setState({
                    activeCourse: e.target.course.value
                })
            }}>
                <select name="course">
                    {this.state.courses.map((course) => {
                        return <option value={course}>{course}</option>
                    })})
                </select>
                <button type="submit">View</button>
            </form>

            {this.state.activeCourse &&
                <>
                    Current course: {this.state.activeCourse}
                    <br/>
                    {this.renderNavBar()}
                    <br/>
                    {currentTab}
                </>
            }
        </section>
    }

    render() {
        return this.renderBody()
    }
}

export default Course;
