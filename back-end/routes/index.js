var express = require('express');
var app = express();
var cors = require('cors')

app.use(cors())

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('MyCanvas.sqlite')

/* GET home page. */
app.get('/', function (req, res, next) {
    res.json({title: 'Express'});
});

app.get('/announcement/:courseId', function (req, res, next) {
    var sql = "select rowid, * from Announcements where courseId = ?"
    var params = [req.params.courseId]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.post('/announcement/:courseId', function (req, res, next) {
    var errors = []
    if (!req.body.content) {
        errors.push("Content is empty. ");
    }
    if (!req.body.postedOn) {
        errors.push("No posted date");
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }
    var data = {
        content: req.body.content,
        postedOn: req.body.postedOn,
        courseId: req.params.courseId
    }
    var sql = 'INSERT INTO Announcements (content, postedOn, courseId) VALUES (?,?,?)'
    var params = [data.content, data.postedOn,data.courseId]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
});

// ------- APIs for Courses ------- 
app.get('/courses', function (req, res, next) {
    var sql = "select * from course"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.post('/courses', function (req, res, next) {
    var errors = []
    if (!req.body.description) {
        errors.push("Description is empty. ");
    }
    if (!req.body.capacity) {
        errors.push("Capacity is empty");
    }
    if (!req.body.teacher) {
        errors.push("Teacher is empty");
    }
    if (!req.body.course_name) {
        errors.push("Course name is empty");
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }
    var data = {
        description: req.body.description,
        capacity: req.body.capacity,
        teacher: req.body.teacher,
        course_name:req.body.course_name
    }
    var sql = 'INSERT INTO COURSE (description, capacity, course_teacher,course_id) VALUES (?,?,?,?)'
    var params = [data.description, data.capacity,data.teacher,data.course_name]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
});


// Get courses users already taking
app.get('/users/:rowid/courses', function (req, res, next) {

    // Get courses user taking given user_id (student_id in user_infos)
    function myCallback5(id) {
        var user_id = id;
       
        var sql = 'Select course_id from user_course where user_id = ?;'
        var params = [user_id]
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({'error': err.message});
                console.log(err.message);
                // return;
            }
            // console.log(rows);
            res.json({
                'message': 'success',
                'data': rows
            })
        })
        
    }

    // Get student_id from user_infos given rowid, then insert to user_course in callback function
    var sql = "select student_id from user_infos where rowid = ?;"
    var params = [req.params.rowid]
    function GetUserCourse (sql, params, callback) {
        // First get student_id given row_id
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({'error': err.message});
                console.log(err.message)
                return;
            }
            // console.log(row);
            // Use callback function to get user course
            callback(row['student_id']);
        })
    }

    GetUserCourse(sql, params, myCallback5); 
});


// ------- APIs for Setting ------- 

app.post('/users/:rowid/courses', function (req, res, next) {
    var errors = []
    if (!req.body.rowid) {
        errors.push("User rowid required. ");
    }
    if (!req.body.selectedCourses) {
        errors.push("No selected Courses provided.");
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }
    var data = {
        rowid: req.body.rowid,
        selectedCourses: req.body.selectedCourses
    }

    
    // Insert to user_course table
    function myCallback4(id) {
        var student_id = id;

        data.selectedCourses.map((newcourse) => {
            var sql = 'INSERT INTO user_course (user_id, course_id) VALUES (?, ?);'
            var params = [student_id, newcourse]
            try {
                db.all(sql, params)
            } catch (e) {
            }

            // db.all(sql, params, (err, rows) => {
            //     if (err) {
            //         res.status(400).json({'error': err.message});
            //         console.log(err.message);
            //         // return;
            //     }
            //     // console.log(rows);
            //     // res.json({
            //     //     'message': 'success',
            //     //     'data': rows
            //     // })
            // })
            
        })
        
    }

    // Get student_id from user_infos given rowid, then insert to user_course in callback function
    var sql = "select student_id from user_infos where rowid = ?;"
    var params = [data.rowid]
    function InsertUserCourse (sql, params, callback) {
        // First get student_id given row_id
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({'error': err.message});
                console.log(err.message)
                return;
            }
            // console.log(row);
            // Use callback function to update student answer
            callback(row['student_id']);
        })
    }

    InsertUserCourse(sql, params, myCallback4);

});


app.get('/users', function (req, res, next) {
    var sql = "select rowid, * from user_infos where account_type = 'Teacher' or account_type = 'Student'"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.post('/users/:rowid', function (req, res, next) {
    var sql = 'UPDATE user_infos SET activity = ? WHERE rowid = ?'
    var params = [req.body.status, req.params.rowid]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            console.log("post err message", err.message);
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

// ------- APIs for Assignments 

// This endpoint serves to let teacher know the rowid of the new assignment they are creating
// We are not having an assignment ID and so need this so that when teacher click submit assignment, 
// the new assignment will be shown in the assignments table, and teacher can click to see details.
// Otherwise if we do not have the rowid, we can't check the details of the newly created assignment.
app.get('/assignments', function (req, res, next) {
    var sql = "select * from assignment"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.get('/courses', function (req, res, next) {
    var sql = "select * from course"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.get('/courses/:course_id/grades', function (req, res, next) {
    var errors = []

    var user_rowid = req.query.user_rowid

    if (user_rowid) {
        var sql = "select student_assignment.rowid, assignment.name as assignment_name, user_infos.name as user_name, * from student_assignment join user_infos on user_infos.student_id = student_assignment.student_id join assignment on assignment.rowid = student_assignment.assignment_id where student_assignment.course_id = ? and user_infos.rowid = ? and user_infos.account_type = 'Student'"
        var params = [req.params.course_id, user_rowid]

        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({'error': err.message});
                console.log(err.message)
                return;
            }
            res.json({
                'message': 'success',
                'data': rows
            })
        })
    }
    else {
        var sql = "select student_assignment.rowid, assignment.name as assignment_name, user_infos.name as user_name, * from student_assignment join user_infos on user_infos.student_id = student_assignment.student_id join assignment on assignment.rowid = student_assignment.assignment_id where student_assignment.course_id = ? and user_infos.account_type = 'Student'"
        var params = [req.params.course_id]

        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({'error': err.message});
                console.log(err.message)
                return;
            }
            res.json({
                'message': 'success',
                'data': rows
            })
        })
    }
});


app.get('/courses/:course_id/assignments', function (req, res, next) {
    var errors = []
    if (!req.query.rowid) {
        errors.push("User row ID required in query.");
    }

    // Get student's assignment given student's id and course_id
    function myCallback3(id) {
        var student_id = id;
        
        // Select rowid, * from assignment where rowid in (select assignment_id from student_assignment where student_id = 't10002' and course_id = 'MPCS 52553');
        var sql = 'Select rowid, * from assignment where rowid in (select assignment_id from student_assignment where student_id = ? and course_id = ?);'
        var params = [student_id, req.params.course_id]
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({'error': err.message});
                // console.log(err.message)
                return;
            }
            // console.log(rows);
            res.json({
                'message': 'success',
                'data': rows
            })
        })
    }

    // Get student_id given row_id, then get student's assignment in callback function
    var sql = "select student_id from user_infos where rowid = ?;"
    var params = [req.query.rowid]
    function getStudentAssignment (sql, params, callback) {
        // First get student_id given row_id
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({'error': err.message});
                console.log(err.message)
                return;
            }
            // console.log(row);
            // Use callback function to update student answer
            callback(row['student_id']);
        })
    }

    getStudentAssignment(sql, params, myCallback3);

});

app.post('/courses/:course_id/assignments', function (req, res, next) {
    var errors = []
    if (!req.body.name) {
        errors.push("Assignment name required. ");
    }
    if (!req.body.dueDate) {
        errors.push("Assignment dueDate required.");
    }
    if (!req.body.maxPoint) {
        errors.push("Assignment maxPoint required.");
    }
    if (!req.body.details) {
        errors.push("Assignment detail required.");
    }

    // console.log(errors);
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }

    var data = {
        name: req.body.name,
        dueDate: req.body.dueDate,
        maxPoint: req.body.maxPoint,
        details: req.body.details,
        course_id: req.params.course_id
    }

    console.log(data.course_id);

    // Insert a new assignment
    var sql = 'INSERT INTO assignment (name, dueDate, maxPoint, details, course_id) VALUES (?,?,?,?,?)'
    var params = [data.name, data.dueDate, data.maxPoint, data.details, data.course_id]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            // console.log(err.message)
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });


    // After successfully insert a new assignment, find the students who are taking the course, and add tuples to student_assignment table.
    // https://www.w3schools.com/js/js_callback.asp
    function myCallback (id) {
        var assignment_rowid = id;
        
        // Find the students who are taking the course, and add tuples to student_assignment table
        // var sql = "INSERT INTO student_assignment (student_id, assignment_id, course_id, answer, grade) select user_id as student_id, ? as assignment_id, ? as course_id, null as answer, null as grade from user_course join user_infos on user_course.user_id = user_infos.student_id where course_id = ? and account_type = 'Student';"    // https://stackoverflow.com/questions/16838896/sqlite-insert-into-table-select-from

        // Find students taking the course, teacher teaching the course, and all admins  
        // (when admin created, should add admin to all courses in user_course table)
        var sql = "INSERT INTO student_assignment (student_id, assignment_id, course_id, answer, grade) select user_id as student_id, ? as assignment_id, ? as course_id, null as answer, null as grade from user_course join user_infos on user_course.user_id = user_infos.student_id where course_id = ?;"    // https://stackoverflow.com/questions/16838896/sqlite-insert-into-table-select-from

        var params = [assignment_rowid, data.course_id, data.course_id]
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({'error': err.message});
                // console.log(err.message)
                return;
            }
        })

    }

    // https://stackoverflow.com/questions/49285938/how-to-get-the-result-of-a-node-sqlite3-query-outside-of-db-get
    function InsertStudentAssignment (sql, params, callback) {  
        // Retrieve the last row id after we insert a new assignment
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({'error': err.message});
                return;
            }

            // Then use callback function to insert to student_assignment table
            callback(row['last_insert_rowid()']);
        })
    }

    // Retrieve the last row id after we insert a new assignment (This is our assignment ID, we didn't create a uuid as assignment ID)
    var sql = "select last_insert_rowid();"
    var params = []
    InsertStudentAssignment(sql, params, myCallback);    

    
    // "INSERT INTO student_assignment (student_id, assignment_id, answer, grade) select user_id as student_id, 3 as assignment_id, null as answer, null as grade from user_course join user_infos on user_course.user_id = user_infos.student_id where course_id = 'MPCS 52553' and account_type = 'Student';"
});


app.get('/courses/:course_id/assignments/:assignment_id', function (req, res, next) {
    var sql = "select rowid, * from assignment where rowid = ?"
    var params = [req.params.assignment_id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

// student submit assignment
app.post('/courses/:course_id/assignments/:assignment_id', function (req, res, next) {
    var errors = []
    if (!req.body.row_id) {
        errors.push("User row ID required.");
    }

    // console.log(errors);
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }

    if (req.body.answer) {
        var data = {
            row_id: req.body.row_id,
            assignment_id: req.params.assignment_id,
            answer: req.body.answer,
            grade: null
        }


        function myCallback2(id) {
            var student_id = id;

            // Then update student_assignment with answer
            var sql = 'UPDATE student_assignment SET answer = ? WHERE student_id = ? and assignment_id = ?'
            var params = [data.answer, student_id, data.assignment_id]
            db.all(sql, params, (err, rows) => {
                if (err) {
                    res.status(400).json({'error': err.message});
                    return;
                }
                res.json({
                    'message': 'success',
                    'data': rows
                })
                // console.log(rows);
            })
        }

        // Get student_id given row_id, then update answer in callback function
        var sql = "select student_id from user_infos where rowid = ?;"
        var params = [data.row_id]
        function updateStudentAnswer (sql, params, callback) {
            // First get student_id given row_id
            db.get(sql, params, (err, row) => {
                if (err) {
                    res.status(400).json({'error': err.message});
                    // console.log(err.message)
                    return;
                }
                
                // Use callback function to update student answer
                callback(row['student_id']);
            })
        }

        updateStudentAnswer(sql, params, myCallback2);
    }

    // here to update grade: if (req.body.grade)
   
});


app.post('/assignment/:id/grade', function (req, res, next) {
    var errors = []

    if (!req.body.grade) {
        errors.push("Grade is empty. ");
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }
    var data = {
        grade: req.body.grade,
    }
    db.run(
        `UPDATE student_assignment
         set grade = COALESCE(?, grade)
             WHERE rowid = ?`,
        [data.grade, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
        });
});

// app.delete('/assignment', function (req, res, next) {
//     res.json('index', {title: 'Express'});
// });
app.get('/account/teachers', cors(), function (req, res, next) {
    var sql = "select rowid, * from user_infos where account_type = 'Teacher'"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});


/* For log-in system */
app.get('/account', cors(), function (req, res, next) {
    var sql = "select rowid, * from user_infos"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.get('/account/:id', cors(), function (req, res, next) {
    var sql = "select rowid, * from user_infos WHERE email = '" + req.params.id + "'"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.get('/account/rowid/:id', cors(), function (req, res, next) {
    var sql = "select rowid, * from user_infos WHERE rowid = '" + req.params.id + "'"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.get('/account/id/:id', cors(), function (req, res, next) {
    var sql = "select rowid, * from user_infos WHERE student_id = '" + req.params.id + "'"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.post('/account/created', function (req, res, next) {
    var errors = []
    if (!req.body.email) {
        errors.push("No email.");
    }
    if (!req.body.student_id) {
        errors.push("No student ID.");
    }
    if (!req.body.password) {
        errors.push("No password.");
    }
    if (!req.body.ans_1) {
        errors.push("No answer for security question 1.");
    }
    if (!req.body.ans_2) {
        errors.push("No answer for security question 2.");
    }
    if (!req.body.ans_3) {
        errors.push("No answer for security question 3.");
    }
    if (!req.body.activity) {
        errors.push("No activity status.");
    }
    if (!req.body.account_type) {
        errors.push("No account type.");
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }
    var data = {
        email: req.body.email,
        name: req.body.name? req.body.name : NULL,
        student_id: req.body.student_id,
        password: req.body.password,
        ans_1: req.body.ans_1,
        ans_2: req.body.ans_2,
        ans_3: req.body.ans_3,
        activity: req.body.activity,
        account_type: req.body.account_type,
    }
    var sql = 'INSERT INTO user_infos VALUES (?,?,?,?,?,?,?,?,?)'
    var params = [data.email, data.name, data.student_id, data.password, data.ans_1, data.ans_2, data.ans_3, data.activity, data.account_type]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
});

app.post('/change_pwd/:id', function (req, res, next) {
    var errors = []
    if (!req.body.email) {
        errors.push("No email.");
    }
    if (!req.body.password) {
        errors.push("No password.");
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }
    var data = {
        email: req.body.email,
        password: req.body.password,
    }
    var sql = 'UPDATE user_infos SET password = ? WHERE email = ?'
    var params = [data.password, data.email]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
});


app.post('/profile/:id', function (req, res, next) {
    var errors = []
    if (!req.body.account_id) {
        errors.push("No account ID.");
    }
    if (!req.body.email) {
        errors.push("No email.");
    }
    if (!req.body.name) {
        errors.push("No name.");
    }
    if (!req.body.student_id) {
        errors.push("No student ID.");
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }
    var data = {
        account_id: req.body.account_id,
        email: req.body.email,
        name: req.body.name,
        student_id: req.body.student_id,
    }
    var sql = 'UPDATE user_infos SET email = ?, name = ?, student_id = ? WHERE rowid = ?'
    var params = [data.email ,data.name, data.student_id, data.account_id]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
});

app.post('/profile/security_questions/:id', function (req, res, next) {
    var errors = []
    if (!req.body.account_id) {
        errors.push("No account ID.");
    }
    if (!req.body.ans_1) {
        errors.push("No answer for security question 1.");
    }
    if (!req.body.ans_2) {
        errors.push("No answer for security question 2.");
    }
    if (!req.body.ans_3) {
        errors.push("No answer for security question 3.");
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }
    var data = {
        account_id: req.body.account_id,
        ans_1: req.body.ans_1,
        ans_2: req.body.ans_2,
        ans_3: req.body.ans_3,
    }
    var sql = 'UPDATE user_infos SET security_question_answer_1 = ?, security_question_answer_2 = ?, security_question_answer_3 = ? WHERE rowid = ?'
    var params = [data.ans_1 ,data.ans_2, data.ans_3, data.account_id]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
});

app.post('/profile/password/:id', function (req, res, next) {
    var errors = []
    if (!req.body.account_id) {
        errors.push("No account ID.");
    }
    if (!req.body.password) {
        errors.push("No password.");
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }
    var data = {
        account_id: req.body.account_id,
        password: req.body.password,
    }
    var sql = 'UPDATE user_infos SET password = ? WHERE rowid = ?'
    var params = [data.password, data.account_id]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
});


/* for Dashboard */
app.get('/assignments_to_do/:id', function (req, res, next) {
    var sql = "SELECT assignment.name, dueDate, maxPoint, details, user_course.course_id FROM assignment LEFT JOIN user_course ON user_course.course_id = assignment.course_id LEFT JOIN user_infos ON user_infos.student_id = user_course.user_id WHERE user_infos.rowid = ? AND dueDate > date('now') AND dueDate <= date('now','+3 day')"
    var params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.get('/assignments_past/:id', function (req, res, next) {
    var sql = "SELECT assignment.name, dueDate, maxPoint, details, user_course.course_id FROM assignment LEFT JOIN user_course ON user_course.course_id = assignment.course_id LEFT JOIN user_infos ON user_infos.student_id = user_course.user_id WHERE user_infos.rowid = ? AND dueDate <= date('now')"
    var params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.get('/assignments_upcoming/:id', function (req, res, next) {
    var sql = "SELECT assignment.name, dueDate, maxPoint, details, user_course.course_id FROM assignment LEFT JOIN user_course ON user_course.course_id = assignment.course_id LEFT JOIN user_infos ON user_infos.student_id = user_course.user_id WHERE user_infos.rowid = ? AND dueDate >= date('now','+3 day')"
    var params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.get('/num_students', cors(), function (req, res, next) {
    var sql = "select count(*) as number_of_students from user_infos WHERE activity = 1 and account_type = 'Student'"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.get('/num_teachers', cors(), function (req, res, next) {
    var sql = "select count(*) as number_of_teachers from user_infos WHERE activity = 1 and account_type = 'Teacher'"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

app.get('/num_courses', cors(), function (req, res, next) {
    var sql = "select count(*) as number_of_courses from course"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        })
    })
});

module.exports = app;
