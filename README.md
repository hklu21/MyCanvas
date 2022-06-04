# MyCanvas

## Introduction

This is a Canvas-like web application called "My Uchicago Canvas". We use react.js for front end and express.js and splite for backend.

## How to run
go the back-end/ directory and run
```Shell
npm install
```
and 
```Shell
npm start
```
then, go the front-end/ directory and run
```Shell
npm install
```
and 
```Shell
npm start
```
then type "yes" to open a new port. And then the web application is avaliable at locahost with front-end server runned on port 3001 and back-end server runner on port 3000.

## Existed Active Accounts:

If you don't want to sign up new accounts and active them as an admin manully, use the following accounts:

- admin:
    - username: admin@uchicago.edu
    - passwrd:  asd1!

- teacher:
    - username: teacher1@uchicago.edu
    - passwrd:  asd1!

- student: 
    - username: student1@uchicago.edu
    - passwrd:  asd1!



## Functionality

### As a user(Teacher or Student):

- login with username and password
- click on “Forget Password” button to reset password by answering three security questions correctly
- sign up with Name, Email, ID(must by a number), Password(5 chars in length, at least 1 number and 1 symbol), confirmed password(must match the password), Account type(Student or Teacher), Three security questions and answers.
- see navigation menu with the following options: My Account, Dashboard (default, the page to display after successful login), Courses Settings(for admin users only) and Logout upon login.
- logout anytime and be redirected to the login page.
- click on My Account to view my personal information such as name, email, student ID.
- click “Edit Profile” button to edit personal information such as name, email, student ID.
- click “Change Password” button to change password by providing Current password, New password and Confirm password.
- click “Change Security Questions” button to edit security questions and answers.
- see the name of the assignment, the class name, number of points and the due date for each assignment on dashboard,
- click “Courses” to see a list of my courses

### As a Student

- see “To Do” items(assignments that are due in the next 3 days from current date), “Upcoming” items(assignments that are due after 3 days from current date) and “Past” items(past due assignments) on dashboard.
- view all announcements in the course
- view grade for each assignment in a course
- view all available assignments and click on each assignment and submit the assignment by providing answers in text area

### As a Teacher

- see the assignments that needs grading (past due assignments) on dashboard.
- view all announcements in the course and be able to create a new announcement by providing the detail in text area.
- see all students’ grades in a list and submit grades for each student for each assignment.
- view all available assignments and be able to create a new assignment by providing assignment’s name, number of points, description in text area.

### As an Admin

- click “Settings” inside navigation menu to see the listof registered users, active and inactive users.(be able to filter by user’s status, active and inactive and search for a user by typing their name or email)
- click on any user from the list above and perform perform the following actions: 1.Approve or reject certain registered users(no one should be able to login without admin’s approval, once admins approve, the user’s account will become
active; otherwise, it’s inactive) 2.Attach registered users (student or teacher) to their appropriate classes(one or multiple classes). 3. Deactivate user.
- click “Courses” to see all courses in the system
- click “Create Course” button to create a course by providing: name, description, capacity and choose the assigned teacher from dropdown list, in “Courses” section.
- see Number of active students in the system, Number of courses in the system, Number of active teachers in the system on dashboard.

## Notification

1. An admin account is provided in default when the databases is created. (use the following information to log in as admin)
    - username(email): admin@uchicago.edu
    - password: asd1!

2. users can only signed up as "Student" or "Teacher", when a user account signed up succeesfully, admin could see the aplication record in "Settings" and the user's account status is inactive before the approvement of the admin. (Users can only log in with "active" account).

3. When a teacher is creating an assignment, he or she need to type the "dueDate" in the format "yyyy--mm--dd" (wo do not provide validation check here).

4. Only three security questions are provided in our system for simplicity.



## References
[React warn against an contentEditable component](https://stackoverflow.com/questions/49639144/why-does-react-warn-against-an-contenteditable-component-having-children-managed)

[React images](https://create-react-app.dev/docs/adding-images-fonts-and-files/)

[Disable Button in React](https://www.delftstack.com/howto/react/disable-button-in-react/)

[Edit text within a React component](https://stackoverflow.com/questions/62748074/how-do-i-add-the-ability-to-edit-text-within-a-react-component)