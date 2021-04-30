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
    sendAjax('POST', $("#routineForm").attr("action"), $("#routineForm").serialize(), function () {
        loadRoutinesFromServer();
    });

    return false;
};

const routineForm = (props) => {
    return (
        <form id="routineForm"
            onSubmit={handleRoutine}
            name="routineForm"
            action="/builder"
            method="POST"
            className="routineForm"
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

const routineList = function (props) {
    // If there are no routines
    if (props.routines.length === 0) {
        return (
            <div className="routineList">
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
        <div className="routineList">
            {routineNodes}
        </div>
    );
};

const loadRoutinesFromServer = () => {
    sendAjax('GET', '/getRoutines', null, (data) => {
        ReactDOM.render(
            <routineList routines={data.routines} />, document.querySelector("#routines")
        );
    });
};

const setup = function (csrf) {
    ReactDOM.render(
        <routineForm csrf={csrf} />, document.querySelector("#buildRoutine")
    );

    ReactDOM.render(
        <routineList routines={[]} />, document.querySelector("#routines")
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