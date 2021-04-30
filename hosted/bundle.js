"use strict";

var handleRoutine = function handleRoutine(e) {
  e.preventDefault();

  if ($("#nameField").val() == '' ||
  $("#concernsField").val() == '' ||
  $("#cleanserField").val() == '' ||
  $("#moisturizerField").val() == '' ||
  $("#sunscreenField").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#RoutineForm").attr("action"), $("#RoutineForm").serialize(), function () {
    loadRoutinesFromServer();
  });
  return false;
};

var RoutineForm = function RoutineForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "RoutineForm",
      onSubmit: handleRoutine,
      name: "RoutineForm",
      action: "/builder",
      method: "POST",
      className: "RoutineForm"
    }, /*#__PURE__*/React.createElement("label", {
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
    }),  /*#__PURE__*/React.createElement("label", {
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
      className: "buildRoutineSubmit",
      type: "submit",
      value: "Build Routine"
    }))
  );
};

var RoutineList = function RoutineList(props) {
  if (props.routines.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "RoutineList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyRoutine"
      }, "No routines yet"))
    );
  }

  var routineNodes = props.routines.map(function (routine) {
    return (/*#__PURE__*/React.createElement("div", {
        key: routine._id,
        className: "routine"
      },/*#__PURE__*/React.createElement("h3", {
        className: "nameField"
      }, " Name: ", routine.name, " "
      ),/*#__PURE__*/React.createElement("h3", {
        className: "concernsField"
      }, " Skin Concerns: ", routine.concerns, " "
      ),/*#__PURE__*/React.createElement("h3", {
        className: "cleanserField"
      }, " Cleanser: ", routine.cleanser, " "
      ),/*#__PURE__*/React.createElement("h3", {
        className: "moisturizerField"
      }, " Moisturizer: ", routine.moisturizer, " "
      ), /*#__PURE__*/React.createElement("h3", {
        className: "sunscreenField"
      }, " Sunscreen: ", routine.sunscreen, " "))

    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "RoutineList"
    }, routineNodes)
  );
};

var loadRoutinesFromServer = function loadRoutinesFromServer() {
  sendAjax('GET', '/getRoutines', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(RoutineList, {
      routines: data.routines
    }), document.querySelector("#routines"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(RoutineForm, {
    csrf: csrf
  }), document.querySelector("#buildRoutine"));
  ReactDOM.render( /*#__PURE__*/React.createElement(RoutineList, {
    routines: []
  }), document.querySelector("#routines"));
  loadRoutinesFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirectl;
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
