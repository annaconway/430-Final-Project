// ROUTINE HANDLER
const handleRoutine = (e) => {
    e.preventDefault();

    // Empty parameters?
    if ($("#nameField").val() == '' ||
        $("#concernsField").val() == '' ||
        $("#cleanserField").val() == '' ||
        $("#moisturizerField").val() == '' ||
        $("#sunscreenField").val() == '') {
        handleError("All fields are required");
        return false;
    }

    // Post Routines
    sendAjax('POST', $("#RoutineForm").attr("action"), $("#RoutineForm").serialize(), function () {
        loadRoutinesFromServer();
    });

    return false;
};

const RoutineForm = (props) => {
    return (
        <form id="RoutineForm"
            onSubmit={handleRoutine}
            name="RoutineForm"
            action="/builder"
            method="POST"
            className="RoutineForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="nameField" type="text" name="name" />

            <label htmlFor="concerns">Skin Concerns: </label>
            <input id="concernsField" type="text" name="concerns" />

            <label htmlFor="cleanser">Cleanser: </label>
            <input id="cleanserField" type="text" name="cleanser" />

            <label htmlFor="moisturizer">Moisturizer: </label>
            <input id="moisturizerField" type="text" name="moisturizer" />

            <label htmlFor="sunscreen">Sunscreen: </label>
            <input id="sunscreenField" type="text" name="sunscreen" />

            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="buildRoutineSubmit" type="submit" value="Build Routine" />

        </form>
    );
};

const RoutineList = function (props) {
    // If there are no routines
    if (props.routines.length === 0) {
        return (
            <div className="RoutineList">
                <h3 className="emptyRoutine">No routines yet</h3>
            </div>
        );
    }

    // Grab routines
    const routineNodes = props.routines.map(function(routine) {
        return (
            <div key={routine._id} className="routine">
                <h3 className="nameField"> Name: {routine.name} </h3>
                <h3 className="concernsField"> Skin Concerns: {routine.concerns} </h3>
                <h3 className="cleanserField"> Cleanser: {routine.cleanser} </h3>
                <h3 className="moisturizerField"> Moisturizer: {routine.moisturizer} </h3>
                <h3 className="sunscreenField"> Sunscreen: {routine.sunscreen} </h3>
            </div>
        );
    });

    return (
        <div className="RoutineList">
            {routineNodes}
        </div>
    );
};

const loadRoutinesFromServer = () => {
    sendAjax('GET', '/getRoutines', null, (data) => {
        ReactDOM.render(
            <RoutineList routines={data.routines} />, document.querySelector("#routines")
        );
    });
};

const setup = function (csrf) {
    ReactDOM.render(
        <RoutineForm csrf={csrf} />, document.querySelector("#buildRoutine")
    );

    ReactDOM.render(
        <RoutineList routines={[]} />, document.querySelector("#routines")
    );

    loadRoutinesFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});