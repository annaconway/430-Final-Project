"use strict";

// ---------------
// POST ROUTINE TO SERVER
// ---------------
var handleRoutine = function handleRoutine(e) {
  e.preventDefault(); // Empty parameters?

  if ($("#nameField").val() == '' || $("#concernsField").val() == '' || $("#cleanserField").val() == '' || $("#moisturizerField").val() == '' || $("#sunscreenField").val() == '') {
    handleError("All fields are required");
    return false;
  } // Post Routines


  sendAjax('POST', $("#RoutineForm").attr("action"), $("#RoutineForm").serialize(), function () {
    loadRoutinesFromServer();
  });
  return false;
}; // ---------------
// GET ROUTINES FROM SERVER
// ---------------


var loadRoutinesFromServer = function loadRoutinesFromServer() {
  sendAjax('GET', '/getRoutines', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(RoutineList, {
      routines: data.routines
    }), document.querySelector("#routines"));
  });
}; // ---------------
// GET DRY ROUTINES FROM SERVER
// ---------------


var loadDryRoutinesFromServer = function loadDryRoutinesFromServer() {
  sendAjax('GET', '/getDryRoutines', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(RoutineList, {
      routines: data.routines
    }), document.querySelector("#routines"));
  });
}; // ---------------
// GET Oily ROUTINES FROM SERVER
// ---------------


var loadOilyRoutinesFromServer = function loadOilyRoutinesFromServer() {
  sendAjax('GET', '/getOilyRoutines', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(RoutineList, {
      routines: data.routines
    }), document.querySelector("#routines"));
  });
}; // ---------------
// GET NORMAL ROUTINES FROM SERVER
// ---------------


var loadNormalRoutinesFromServer = function loadNormalRoutinesFromServer() {
  sendAjax('GET', '/getNormalRoutines', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(RoutineList, {
      routines: data.routines
    }), document.querySelector("#routines"));
  });
}; // ---------------
// GET COMBINATION ROUTINES FROM SERVER
// ---------------


var loadCombinationRoutinesFromServer = function loadCombinationRoutinesFromServer() {
  sendAjax('GET', '/getCombinationRoutines', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(RoutineList, {
      routines: data.routines
    }), document.querySelector("#routines"));
  });
}; // ---------------
// DELETE ROUTINES FROM SERVER
// ---------------


var deleteRoutinesFromServer = function deleteRoutinesFromServer(e) {
  e.preventDefault();
  var csrf = document.querySelector('input[name="_csrf"]').value;
  var id = e.currentTarget.getAttribute('name');
  var deleteData = "_csrf=".concat(csrf, "&routineId=").concat(id); // Update routines

  sendAjax('POST', $("#DeleteRoutine").attr("action"), deleteData, function () {
    loadRoutinesFromServer();
  });
  return false;
}; // ---------------
// UPDATE ROUTINES FROM SERVER
// ---------------


var updateRoutinesFromServer = function updateRoutinesFromServer(e) {
  e.preventDefault(); // Empty parameters?

  if ($("#nameEditField").val() == '' || $("#concernsEditField").val() == '' || $("#cleanserEditField").val() == '' || $("#moisturizerEditField").val() == '' || $("#sunscreenEditField").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#UpdateForm").attr("action"), $("#UpdateForm").serialize(), function () {
    loadRoutinesFromServer();
  });
  return false;
}; // ---------------
// ROUTINE FORM
// React component for routine form
// ---------------


var RoutineForm = function RoutineForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "RoutineForm",
      onSubmit: handleRoutine,
      name: "RoutineForm",
      action: "/builder",
      method: "POST",
      className: "RoutineForm"
    }, /*#__PURE__*/React.createElement("div", {
      id: "skinField"
    }, /*#__PURE__*/React.createElement("input", {
      id: "dryField",
      defaultChecked: true,
      type: "radio",
      name: "skin",
      value: "dry"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "dry"
    }, "Dry"), /*#__PURE__*/React.createElement("input", {
      id: "oilyField",
      type: "radio",
      name: "skin",
      value: "oily"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "oily"
    }, "Oily"), /*#__PURE__*/React.createElement("input", {
      id: "combinationField",
      type: "radio",
      name: "skin",
      value: "combination"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "combination"
    }, "Combination"), /*#__PURE__*/React.createElement("input", {
      id: "normalField",
      type: "radio",
      name: "skin",
      value: "normal"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "normal"
    }, "Normal")), /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "nameField",
      type: "text",
      name: "name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "concerns"
    }, "Skin Concerns: "), /*#__PURE__*/React.createElement("input", {
      id: "concernsField",
      type: "text",
      name: "concerns"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "cleanser"
    }, "Cleanser: "), /*#__PURE__*/React.createElement("input", {
      id: "cleanserField",
      type: "text",
      name: "cleanser"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "moisturizer"
    }, "Moisturizer: "), /*#__PURE__*/React.createElement("input", {
      id: "moisturizerField",
      type: "text",
      name: "moisturizer"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "sunscreen"
    }, "Sunscreen: "), /*#__PURE__*/React.createElement("input", {
      id: "sunscreenField",
      type: "text",
      name: "sunscreen"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "buildRoutineSubmit",
      type: "submit",
      value: "Build Routine"
    }))
  );
}; // ---------------
// UPDATE FORM
// React component for update form
// ---------------


var UpdateForm = function UpdateForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "UpdateForm",
      onSubmit: updateRoutinesFromServer,
      name: "UpdateForm",
      action: "/updateRoutine",
      method: "POST",
      className: "UpdateForm"
    }, /*#__PURE__*/React.createElement("div", {
      id: "skinEditField"
    }, /*#__PURE__*/React.createElement("input", {
      id: "dryEditField",
      defaultChecked: true,
      type: "radio",
      name: "skin",
      value: "dry"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "dry"
    }, "Dry"), /*#__PURE__*/React.createElement("input", {
      id: "oilyEditField",
      type: "radio",
      name: "skin",
      value: "oily"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "oily"
    }, "Oily"), /*#__PURE__*/React.createElement("input", {
      id: "combinationEditField",
      type: "radio",
      name: "skin",
      value: "combination"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "combination"
    }, "Combination"), /*#__PURE__*/React.createElement("input", {
      id: "normalEditField",
      type: "radio",
      name: "skin",
      value: "normal"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "normal"
    }, "Normal")), /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "nameEditField",
      type: "text",
      name: "name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "concerns"
    }, "Skin Concerns: "), /*#__PURE__*/React.createElement("input", {
      id: "concernsEditField",
      type: "text",
      name: "concerns"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "cleanser"
    }, "Cleanser: "), /*#__PURE__*/React.createElement("input", {
      id: "cleanserEditField",
      type: "text",
      name: "cleanser"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "moisturizer"
    }, "Moisturizer: "), /*#__PURE__*/React.createElement("input", {
      id: "moisturizerEditField",
      type: "text",
      name: "moisturizer"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "sunscreen"
    }, "Sunscreen: "), /*#__PURE__*/React.createElement("input", {
      id: "sunscreenEditField",
      type: "text",
      name: "sunscreen"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "updateRoutineSubmit",
      type: "submit",
      value: "Update Routine"
    }))
  );
}; // ---------------
// ADMIN CONTENT
// React component for admin page
// ---------------


var adminContent = function adminContent(props) {
  return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, " ", FilterDryButton(), " "), /*#__PURE__*/React.createElement("span", null, " ", FilterOilyButton()), /*#__PURE__*/React.createElement("span", null, " ", FilterNormalButton()), /*#__PURE__*/React.createElement("span", null, " ", FilterCombinationButton()), /*#__PURE__*/React.createElement("section", {
      id: "routines"
    }))
  );
}; // ---------------
// DELETE BUTTON
// React component for routine objects
// ---------------


var DeleteButton = function DeleteButton(props) {
  return (/*#__PURE__*/React.createElement("button", {
      id: "DeleteRoutine",
      onClick: deleteRoutinesFromServer,
      name: props,
      action: "/deleteRoutine",
      method: "POST",
      className: "DeleteRoutine"
    }, "Delete")
  );
}; // ---------------
// UPDATE BUTTON
// React component for routine objects
// ---------------


var UpdateButton = function UpdateButton(props) {
  return (/*#__PURE__*/React.createElement("button", {
      id: "updateRoutine",
      onClick: update,
      name: props,
      action: "/updateRoutine",
      method: "POST",
      className: "updateRoutine"
    }, "Update")
  );
}; // ---------------
// DRY BUTTON
// React component for filtering routine objects
// ---------------


var FilterDryButton = function FilterDryButton() {
  return (/*#__PURE__*/React.createElement("button", {
      id: "filterDryButton",
      onClick: loadDryRoutinesFromServer,
      name: "dry button",
      action: "/getDryRoutines",
      method: "GET",
      className: "filterDryButton"
    }, "Dry Routines")
  );
}; // ---------------
// OILY BUTTON
// React component for filtering routine objects
// ---------------


var FilterOilyButton = function FilterOilyButton() {
  return (/*#__PURE__*/React.createElement("button", {
      id: "filterOilyButton",
      onClick: loadOilyRoutinesFromServer,
      name: "oily button",
      action: "/getOilyRoutines",
      method: "GET",
      className: "filterOilyButton"
    }, "Oily Routines")
  );
}; // ---------------
// NORMAL BUTTON
// React component for filtering routine objects
// ---------------


var FilterNormalButton = function FilterNormalButton() {
  return (/*#__PURE__*/React.createElement("button", {
      id: "filterNormalButton",
      onClick: loadNormalRoutinesFromServer,
      name: "normal button",
      action: "/getNormalRoutines",
      method: "GET",
      className: "filterNormalButton"
    }, "Normal Routines")
  );
}; // ---------------
// COMBINATION BUTTON
// React component for filtering routine objects
// ---------------


var FilterCombinationButton = function FilterCombinationButton() {
  return (/*#__PURE__*/React.createElement("button", {
      id: "filterCombinationButton",
      onClick: loadCombinationRoutinesFromServer,
      name: "combination button",
      action: "/getCombinationRoutines",
      method: "GET",
      className: "filterCombinationButton"
    }, "Combination Routines")
  );
}; // ---------------
// ROUTINE LIST
// React component from database objects
// ---------------


var RoutineList = function RoutineList(props) {
  // If there are no routines
  if (props.routines.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "RoutineList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyRoutine"
      }, "No routines yet"))
    );
  } // Grab routines


  var routineNodes = props.routines.map(function (routine) {
    return (/*#__PURE__*/React.createElement("div", {
        key: routine._id,
        className: "routine",
        id: routine._id
      }, /*#__PURE__*/React.createElement("h3", {
        className: "nameField"
      }, " Name: ", routine.name, " "), /*#__PURE__*/React.createElement("h3", {
        className: "skinField"
      }, " Skin Type: ", routine.skin, " "), /*#__PURE__*/React.createElement("h3", {
        className: "concernsField"
      }, " Skin Concerns: ", routine.concerns, " "), /*#__PURE__*/React.createElement("h3", {
        className: "cleanserField"
      }, " Cleanser: ", routine.cleanser, " "), /*#__PURE__*/React.createElement("h3", {
        className: "moisturizerField"
      }, " Moisturizer: ", routine.moisturizer, " "), /*#__PURE__*/React.createElement("h3", {
        className: "sunscreenField"
      }, " Sunscreen: ", routine.sunscreen, " "), /*#__PURE__*/React.createElement("span", null, " ", DeleteButton(routine._id), " "), /*#__PURE__*/React.createElement("span", null, " ", UpdateButton(routine._id)))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "RoutineList"
    }, routineNodes)
  );
}; // ---------------
// ADMIN LIST
// React component from database objects
// ---------------


var AdminList = function AdminList(props) {
  // If there are no routines
  if (props.routines.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "RoutineList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyRoutine"
      }, "No routines yet"))
    );
  } // Grab routines


  var routineNodes = props.routines.map(function (routine) {
    return (/*#__PURE__*/React.createElement("div", {
        key: routine._id,
        className: "routine",
        id: routine._id
      }, /*#__PURE__*/React.createElement("h3", {
        className: "nameField"
      }, " Name: ", routine.name, " "), /*#__PURE__*/React.createElement("h3", {
        className: "skinField"
      }, " Skin Type: ", routine.skin, " "), /*#__PURE__*/React.createElement("h3", {
        className: "concernsField"
      }, " Skin Concerns: ", routine.concerns, " "), /*#__PURE__*/React.createElement("h3", {
        className: "cleanserField"
      }, " Cleanser: ", routine.cleanser, " "), /*#__PURE__*/React.createElement("h3", {
        className: "moisturizerField"
      }, " Moisturizer: ", routine.moisturizer, " "), /*#__PURE__*/React.createElement("h3", {
        className: "sunscreenField"
      }, " Sunscreen: ", routine.sunscreen, " "))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "RoutineList"
    }, routineNodes)
  );
}; // ---------------
// UPDATE ROUTINE HANDLER
// ---------------


var update = function update(e) {
  e.preventDefault();
  var csrf = document.querySelector('input[name="_csrf"]').value;
  var id = e.currentTarget.getAttribute('name');
  ReactDOM.render( /*#__PURE__*/React.createElement(UpdateForm, {
    csrf: csrf,
    _id: id
  }), document.getElementById("".concat(id)));
}; // ---------------
// DISPLAY ROUTINE HANDLER
// ---------------


var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(RoutineForm, {
    csrf: csrf
  }), document.querySelector("#buildRoutine"));
  ReactDOM.render( /*#__PURE__*/React.createElement(RoutineList, {
    routines: []
  }), document.querySelector("#routines"));
  loadRoutinesFromServer();
}; // ---------------
// GET CSRF TOKEN
// ---------------


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
}; // ---------------
// GET TOKEN FOR THE PAGE
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
