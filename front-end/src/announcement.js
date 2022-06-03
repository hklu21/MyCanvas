import React from 'react';
import './course.css';
import Assignment, {AssignmentItem} from "./assignment";
import Grade from "./grade";


class AnnouncementItem {
    constructor(content, postedOn) {
        this.content = content
        this.postedOn = postedOn
    }
}

class Announcement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            announcements: [
                new AnnouncementItem("Course Cancelling", "May 4, 2022 at 4:42pm"),
                new AnnouncementItem("Recorded Lecture", "Apr 27, 2022 at 8:02pm"),
            ]
        };
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = async () => {
        await fetch('http://localhost:3000/announcement/' + this.props.activeCourse)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        announcements: result.data.map(announcement => new AnnouncementItem(announcement.content, announcement.postedOn))
                    });
                }
            )
    }

    renderAddForm = () => {
        return <form onSubmit={(e) => {
            e.preventDefault()

            let item = new AnnouncementItem(e.target.content.value, new Date().toLocaleString())

            var data = {
                content: item.content,
                postedOn: item.postedOn,
            }
            fetch(`http://localhost:3000/announcement/` + this.props.activeCourse, {  // Enter your IP address here
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
                .then(async () => {
                    await this.loadData()

                    e.target.content.value = ""
                })

        }}>
            Add announcement: <br/>
            Content:<textarea name="content"/><br/>
            <button type="submit">Submit</button>
        </form>
    }

    render() {
        return <>
            <h2> Recent Announcement</h2>
            <table>
                <tr>
                    <th>Announcement</th>
                    <th>Posted on:</th>

                </tr>
                {this.state.announcements.map(announcement =>
                    <tr>
                        <td><a href="#">{announcement.content}</a></td>
                        <td>{announcement.postedOn}</td>
                    </tr>
                )}
            </table>
            <br/>
            {this.props.accountType === "Teacher" &&
                this.renderAddForm()
            }
        </>
    }
}

export default Announcement;
