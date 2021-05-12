// ---------------
// HANDLE LOGIN
// Sends login to the server
// ---------------
const handleLogin = (e) => {
    e.preventDefault();

    // No username or password?
    if($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Username or password is empty");
        return false;
    }
    
    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

// ---------------
// HANDLE SIGNUP
// Sends new account to the server
// ---------------
const handleSignup = (e) => {
    e.preventDefault();

    // No username or password?
    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    // Passwords don't match?
    if($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

// ---------------
// LOGIN WINDOW
// React component for login
// ---------------
const LoginWindow = (props) => {
    return (
        <form id="loginForm" name="loginForm"
                onSubmit={handleLogin}
                action="/login"
                method="POST"
                className="mainForm"
                >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign in" />

        </form>
    );
};

// ---------------
// SIGNUP WINDOW
// React component for signup
// ---------------
const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
         <label htmlFor="username">Username: </label>
         <input id="user" type="text" name="username" placeholder="username" />
         <label htmlFor="pass">Password: </label>
         <input id="pass" type="password" name="pass" placeholder="password" />
         <label htmlFor="pass2">Password: </label>
         <input id="pass2" type="password" name="pass2" placeholder="retype password" />
         <input type="hidden" name="_csrf" value={props.csrf} />
         <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
};

// ---------------
// CREATE LOGIN WINDOW
// Applies react component to the site
// ---------------
const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

// ---------------
// CREATE SIGNUP WINDOW
// Applies react component to the site
// ---------------
const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

// ---------------
// SETUP
// Establish functionality
// ---------------
const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signuputton = document.querySelector("#signupButton");

    signuputton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    createLoginWindow(csrf); //default view
};

// ---------------
// GET CSRF TOKEN
// ---------------
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

// ---------------
// GET TOKEN FOR PAGE
// ---------------
$(document).ready(function() {
    getToken();
});