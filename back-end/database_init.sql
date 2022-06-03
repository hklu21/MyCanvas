CREATE TABLE IF NOT EXISTS user_infos(
    email character NOT NULL UNIQUE,
    name character,
    student_id character NOT NULL,
    password character NOT NULL,
    security_question_answer_1 character NOT NULL,
    security_question_answer_2 character NOT NULL,
    security_question_answer_3 character NOT NULL,
    activity BOOLEAN NOT NULL,
    account_type character NOT NULL
);

INSERT INTO user_infos VALUES ('admin@uchicago.edu', NULL, 'a00001', 'asd1!', 'Bob', 'Football', 'Chicago', TRUE, 'Admin');
INSERT INTO user_infos VALUES ('teacher1@uchicago.edu', 'Fake Teacher', 't10001', 'asd1!', 'Jack', 'Basketball', 'Chicago', TRUE, 'Teacher');
INSERT INTO user_infos VALUES ('teacher2@uchicago.edu', 'Fake Teacher2', 't10002', 'asd1!', 'Jack', 'Basketball', 'Chicago', TRUE, 'Teacher');
INSERT INTO user_infos VALUES ('student1@uchicago.edu', 'Hengkuan Lu', 's20001', 'asd1!', 'Tim', 'Swimming', 'Chicago', TRUE, 'Student');
INSERT INTO user_infos VALUES ('student2@uchicago.edu', 'Yawen Lin', 's20002', 'asd1!', 'Tim', 'Swimming', 'Chicago', TRUE, 'Student');
INSERT INTO user_infos VALUES ('student3@uchicago.edu', 'Student 3', 's20003', 'asd1!', 'Tim', 'Swimming', 'Chicago', TRUE, 'Student');


DROP TABLE IF EXISTS assignment;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS user_course;
DROP TABLE IF EXISTS student_assignment;

CREATE TABLE IF NOT EXISTS course 
(
    course_id character NOT NULL
);

CREATE TABLE IF NOT EXISTS assignment
(
    name     text,
    dueDate  text,
    maxPoint integer,
    details text,
    course_id character
);

CREATE TABLE IF NOT EXISTS user_course
(
    user_id character,     -- corresponding to student_id in user_infos, teacher-course and student-course relationship
    course_id character,
    unique (user_id, course_id)
);

CREATE TABLE IF NOT EXISTS student_assignment
(
    student_id character,   
    assignment_id character,
    course_id character,
    answer text,
    grade real
);


INSERT INTO course VALUES ('MPCS 52553');
INSERT INTO course VALUES ('MPCS 51222');

-- student 1 takes 52553 and 51222
INSERT INTO user_course VALUES ('s20001', 'MPCS 52553');
INSERT INTO user_course VALUES ('s20001', 'MPCS 51222');
-- student 2 takes 51222
INSERT INTO user_course VALUES ('s20002', 'MPCS 51222');

-- teacher 1 teaching 51222
INSERT INTO user_course VALUES ('t10001', 'MPCS 51222');
-- teacher 2 teaching 52553
INSERT INTO user_course VALUES ('t10002', 'MPCS 52553');

-- admin has access to all courses
INSERT INTO user_course VALUES ('a00001', 'MPCS 51222');
INSERT INTO user_course VALUES ('a00001', 'MPCS 52553');


-- Problems:
-- I haven't figured out how to automatically refresh the page when a new assignment is created. This is necessary because when a teacher creates a new assignment, it would be better for the new assignment to be shown right after being created. And it's also not possible to refresh the Assignment page when I am on this page and I click the Assignment page again. I'll have to switch to other tabs like grades and then click the assignment tab again to refresh the page.
-- Don't know how to correct the route when clicking to view the detail of an assignment (It should be /#Assignments/assignment_id but now it's null). I did something like "<a href={`#Assignment/${this.state.assignmentDetailId}`} className="assign-name-link" onClick={() => { this.setState({showAssignmentDetail: true, assignmentDetailId: assignment.rowid});}}>{assignment.name}</a>" in assignment.js but it does not update the state.assignmentDetailId when it's onClick, that's why it is null.



-- Note that:
-- 1. admin should be added to all courses  (when add a admin, put tuples of [admin's student_id (user_infos), every course_id] in TABLE user_course)
-- 2. admin should be able to view all assignments in all courses (this is automatically done if 1. is set correctly)

-- For Zhecheng:
-- Course: Only show courses a student/teacher is registered in (TABLE user_course)
-- Grade: Similar to what I've done for studnets' to submit answer