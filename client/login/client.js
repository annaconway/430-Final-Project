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
// HANDLE CHANGE PASSWORD
// Sends new password to the server
// ---------------
const handleChangePassword = (e) => {
    e.preventDefault();

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    if($("#pass2").val() !== $("#pass3").val()) {
        handleError("Passwords do not match");
        return false;
    }

    console.log($("#changePasswordForm").serialize());

    sendAjax('POST', $("#changePasswordForm").attr("action"), $("#changePasswordForm").serialize(), function(){
        document.querySelector("#errorMessage").innerHTML = "Password has been changed";
    });

    return false;
}

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
// PASSWORD WINDOW
// React component for password change
// ---------------
const PasswordWindow = (props) => {
    return (
        <form id="changePasswordForm"
        name="changePasswordForm"
        onSubmit={handleChangePassword}
        action="/changePass"
        method="POST"
        className="changePassForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass2">New Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="new password" />
            <label htmlFor="pass3">New Password: </label>
            <input id="pass3" type="password" name="pass3" placeholder="retype new password" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" id="changePass" type="submit" value="Change Password" />
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

    document.querySelector("#errorMessage").innerHTML = "";
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

    document.querySelector("#errorMessage").innerHTML = "";
};

// ---------------
// CREATE PASSWORD WINDOW
// Applies react component to the site
// ---------------
const createPasswordWindow = (csrf) => {
    ReactDOM.render(
        <PasswordWindow csrf={csrf} />,
        document.querySelector("#content")
    );

    ReactDOM.unmountComponentAtNode(document.querySelector("#changePasswordButton"));
    document.querySelector("#errorMessage").innerHTML = "";
};

// ---------------
// SETUP
// Establish functionality
// ---------------
const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signuputton = document.querySelector("#signupButton");
    const changePasswordButton = document.querySelector("#changePasswordButton");

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

    changePasswordButton.addEventListener("click", (e)=> {
        e.preventDefault();
        createPasswordWindow(csrf);
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