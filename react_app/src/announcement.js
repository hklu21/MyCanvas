import React from 'react';
import './course.css';


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

    }

    renderAddForm = () => {
        return <form onSubmit={(e) => {
            e.preventDefault()

            let item = new AnnouncementItem(e.target.content.value, new Date().toLocaleString())
            this.setState((state) => {
                let items = state.announcements
                items.push(item)
                return items
            })

            e.target.content.value = ""
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
            {this.props.accountType === "Admin" &&
                this.renderAddForm()
            }
        </>
    }
}

export default Announcement;
