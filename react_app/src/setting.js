import React from 'react';
import './setting.css';

class Setting extends React.Component {
    
    render() {
        return <>
            <div class="setting_page">

                <div class="search-filter">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <div class="search">
                        <form action="#">
                            <input type="text" placeholder="Search.." name="search"/>
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </form>
                    </div>

                    <div class="filter">
                        <button class="btn active" onclick="filterSelection('all')"> Active</button>
                        <button class="btn" onclick="filterSelection('cars')"> Inactive </button>
                    </div>
                </div>

                <div class="setting_users">
                    <table class="table">
                        <thead>
                            <th>Name
                            </th>
                            <th>Email
                            </th>
                            <th>Status
                            </th>
                        </thead>

                        <tr>
                            <td>fake-student
                            </td>
                            <td>fake@uchicago.edu
                            </td>
                            <td>active
                            </td>
                        </tr>

                        <tr>
                            <td>fake-student2
                            </td>
                            <td>fake2@uchicago.edu
                            </td>
                            <td>active
                            </td>
                        </tr>

                        <tr>
                            <td>fake-student3
                            </td>
                            <td>fake3@uchicago.edu
                            </td>
                            <td>inactive
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    }

}

export default Setting;

