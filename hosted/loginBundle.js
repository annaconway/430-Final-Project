"use strict";

// ---------------
// HANDLE LOGIN
// Sends login to the server
// ---------------
var handleLogin = function handleLogin(e) {
  e.preventDefault(); // No username or password?

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Username or password is empty");
    return false;
  }

  console.log($("input[name=_csrf]").val());
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
}; // ---------------
// HANDLE SIGNUP
// Sends new account to the server
// ---------------


var handleSignup = function handleSignup(e) {
  e.preventDefault(); // No username or password?

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required");
    return false;
  } // Passwords don't match?


  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
}; // ---------------
// HANDLE CHANGE PASSWORD
// Sends new password to the server
// ---------------


var handleChangePassword = function handleChangePassword(e) {
  e.preventDefault();

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required");
    return false;
  }

  if ($("#pass2").val() !== $("#pass3").val()) {
    handleError("Passwords do not match");
    return false;
  }

  console.log($("#changePasswordForm").serialize());
  sendAjax('POST', $("#changePasswordForm").attr("action"), $("#changePasswordForm").serialize(), function () {
    document.querySelector("#errorMessage").innerHTML = "Password has been changed";
  });
  return false;
}; // ---------------
// LOGIN WINDOW
// React component for login
// ---------------


var LoginWindow = function LoginWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "loginForm",
      name: "loginForm",
      onSubmit: handleLogin,
      action: "/login",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Sign in"
    }))
  );
}; // ---------------
// PASSWORD WINDOW
// React component for password change
// ---------------


var PasswordWindow = function PasswordWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "changePasswordForm",
      name: "changePasswordForm",
      onSubmit: handleChangePassword,
      action: "/changePass",
      method: "POST",
      className: "changePassForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass2"
    }, "New Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass2",
      type: "password",
      name: "pass2",
      placeholder: "new password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass3"
    }, "New Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass3",
      type: "password",
      name: "pass3",
      placeholder: "retype new password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      id: "changePass",
      type: "submit",
      value: "Change Password"
    }))
  );
}; // ---------------
// SIGNUP WINDOW
// React component for signup
// ---------------


var SignupWindow = function SignupWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "signupForm",
      name: "signupForm",
      onSubmit: handleSignup,
      action: "/signup",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass2"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass2",
      type: "password",
      name: "pass2",
      placeholder: "retype password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Sign Up"
    }))
  );
}; // ---------------
// CREATE LOGIN WINDOW
// Applies react component to the site
// ---------------


var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
  document.querySelector("#errorMessage").innerHTML = "";
}; // ---------------
// CREATE SIGNUP WINDOW
// Applies react component to the site
// ---------------


var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
  document.querySelector("#errorMessage").innerHTML = "";
}; // ---------------
// CREATE PASSWORD WINDOW
// Applies react component to the site
// ---------------


var createPasswordWindow = function createPasswordWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PasswordWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#changePasswordButton"));
  document.querySelector("#errorMessage").innerHTML = "";
}; // ---------------
// SETUP
// Establish functionality
// ---------------


var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signuputton = document.querySelector("#signupButton");
  var changePasswordButton = document.querySelector("#changePasswordButton");
  signuputton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  changePasswordButton.addEventListener("click", function (e) {
    e.preventDefault();
    createPasswordWindow(csrf);
    return false;
  });
  createLoginWindow(csrf); //default view
}; // ---------------
// GET CSRF TOKEN
// ---------------


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
}; // ---------------
// GET TOKEN FOR PAGE
// ---------------


$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
