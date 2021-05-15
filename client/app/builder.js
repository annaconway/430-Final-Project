// ---------------
// POST ROUTINE TO SERVER
// ---------------
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

// ---------------
// GET ROUTINES FROM SERVER
// ---------------
const loadRoutinesFromServer = () => {
    sendAjax('GET', '/getRoutines', null, (data) => {
        ReactDOM.render(
            <RoutineList routines={data.routines} />, document.querySelector("#routines")
        );
    });
};

// ---------------
// GET DRY ROUTINES FROM SERVER
// ---------------
const loadDryRoutinesFromServer = () => {
    sendAjax('GET', '/getDryRoutines', null, (data) => {
        ReactDOM.render(
            <RoutineList routines={data.routines} />, document.querySelector("#routines")
        );
    });
};

// ---------------
// GET Oily ROUTINES FROM SERVER
// ---------------
const loadOilyRoutinesFromServer = () => {
    sendAjax('GET', '/getOilyRoutines', null, (data) => {
        ReactDOM.render(
            <RoutineList routines={data.routines} />, document.querySelector("#routines")
        );
    });
};

// ---------------
// GET NORMAL ROUTINES FROM SERVER
// ---------------
const loadNormalRoutinesFromServer = () => {
    sendAjax('GET', '/getNormalRoutines', null, (data) => {
        ReactDOM.render(
            <RoutineList routines={data.routines} />, document.querySelector("#routines")
        );
    });
};

// ---------------
// GET COMBINATION ROUTINES FROM SERVER
// ---------------
const loadCombinationRoutinesFromServer = () => {
    sendAjax('GET', '/getCombinationRoutines', null, (data) => {
        ReactDOM.render(
            <RoutineList routines={data.routines} />, document.querySelector("#routines")
        );
    });
};

// ---------------
// DELETE ROUTINES FROM SERVER
// ---------------
const deleteRoutinesFromServer = (e) =>{
    e.preventDefault();

    const csrf = document.querySelector('input[name="_csrf"]').value;
    const id = e.currentTarget.getAttribute('name');

    const deleteData = `_csrf=${csrf}&routineId=${id}`;

    // Update routines
    sendAjax('POST', $("#DeleteRoutine").attr("action"), deleteData, function() {
        loadRoutinesFromServer();
    });

    return false;
};

// ---------------
// UPDATE ROUTINES FROM SERVER
// ---------------
const updateRoutinesFromServer = (e) => {
        
    e.preventDefault();

    // Empty parameters?
    if ($("#nameEditField").val() == '' ||
        $("#concernsEditField").val() == '' ||
        $("#cleanserEditField").val() == '' ||
        $("#moisturizerEditField").val() == '' ||
        $("#sunscreenEditField").val() == '') {
        handleError("All fields are required");
        return false;
    }
    
    sendAjax('POST', $("#UpdateForm").attr("action"), $("#UpdateForm").serialize(), function() {
        loadRoutinesFromServer();
    });

    return false;
};

// ---------------
// ROUTINE FORM
// React component for routine form
// ---------------
const RoutineForm = (props) => {
    return (
        <form id="RoutineForm"
            onSubmit={handleRoutine}
            name="RoutineForm"
            action="/builder"
            method="POST"
            className="RoutineForm"
        >
            <div id="skinField">
                <input id="dryField" defaultChecked type="radio" name="skin" value="dry" />
                <label htmlFor="dry">Dry</label>

                <input id="oilyField" type="radio" name="skin" value="oily" />
                <label htmlFor="oily">Oily</label>

                <input id="combinationField" type="radio" name="skin" value="combination" />
                <label htmlFor="combination">Combination</label>

                <input id="normalField" type="radio" name="skin" value="normal" />
                <label htmlFor="normal">Normal</label>
            </div>

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

// ---------------
// UPDATE FORM
// React component for update form
// ---------------
const UpdateForm = (props) => {
    return (
        <form id="UpdateForm"
            onSubmit={updateRoutinesFromServer}
            name="UpdateForm"
            action="/updateRoutine"
            method="POST"
            className="UpdateForm"
        >
            <div id="skinEditField">
                <input id="dryEditField" defaultChecked type="radio" name="skin" value="dry" />
                <label htmlFor="dry">Dry</label>

                <input id="oilyEditField" type="radio" name="skin" value="oily" />
                <label htmlFor="oily">Oily</label>

                <input id="combinationEditField" type="radio" name="skin" value="combination" />
                <label htmlFor="combination">Combination</label>

                <input id="normalEditField" type="radio" name="skin" value="normal" />
                <label htmlFor="normal">Normal</label>
            </div>

            <label htmlFor="name">Name: </label>
            <input id="nameEditField" type="text" name="name" />

            <label htmlFor="concerns">Skin Concerns: </label>
            <input id="concernsEditField" type="text" name="concerns" />

            <label htmlFor="cleanser">Cleanser: </label>
            <input id="cleanserEditField" type="text" name="cleanser" />

            <label htmlFor="moisturizer">Moisturizer: </label>
            <input id="moisturizerEditField" type="text" name="moisturizer" />

            <label htmlFor="sunscreen">Sunscreen: </label>
            <input id="sunscreenEditField" type="text" name="sunscreen" />

            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="updateRoutineSubmit" type="submit" value="Update Routine" />

        </form>
    );
};

// ---------------
// ADMIN CONTENT
// React component for admin page
// ---------------
const adminContent = (props) => {  
    return (
        <div>     
        <span> {FilterDryButton()} </span>
        <span> {FilterOilyButton()}</span>
        <span> {FilterNormalButton()}</span>
        <span> {FilterCombinationButton()}</span>
        
    <section id="routines">
    </section>
    </div> 
    );
};

// ---------------
// DELETE BUTTON
// React component for routine objects
// ---------------
const DeleteButton = (props) =>{
    return (
        <button id="DeleteRoutine"
        onClick={deleteRoutinesFromServer}
        name={props}
        action="/deleteRoutine"
        method="POST"
        className="DeleteRoutine"
        >Delete</button>
    )
};

// ---------------
// UPDATE BUTTON
// React component for routine objects
// ---------------
const UpdateButton = (props) =>{
    return (
        <button id="updateRoutine"
        onClick={update}
        name={props}
        action="/updateRoutine"
        method="POST"
        className="updateRoutine"
        >Update</button>
    )
};

// ---------------
// DRY BUTTON
// React component for filtering routine objects
// ---------------
const FilterDryButton = () =>{
    return (
        <button id="filterDryButton"
        onClick={loadDryRoutinesFromServer}
        name="dry button"
        action="/getDryRoutines"
        method="GET"
        className="filterDryButton"
        >Dry Routines</button>
    )
};

// ---------------
// OILY BUTTON
// React component for filtering routine objects
// ---------------
const FilterOilyButton = () =>{
    return (
        <button id="filterOilyButton"
        onClick={loadOilyRoutinesFromServer}
        name="oily button"
        action="/getOilyRoutines"
        method="GET"
        className="filterOilyButton"
        >Oily Routines</button>
    )
};

// ---------------
// NORMAL BUTTON
// React component for filtering routine objects
// ---------------
const FilterNormalButton = () =>{
    return (
        <button id="filterNormalButton"
        onClick={loadNormalRoutinesFromServer}
        name= "normal button"
        action="/getNormalRoutines"
        method="GET"
        className="filterNormalButton"
        >Normal Routines</button>
    )
};

// ---------------
// COMBINATION BUTTON
// React component for filtering routine objects
// ---------------
const FilterCombinationButton = () =>{
    return (
        <button id="filterCombinationButton"
        onClick={loadCombinationRoutinesFromServer}
        name= "combination button"
        action="/getCombinationRoutines"
        method="GET"
        className="filterCombinationButton"
        >Combination Routines</button>
    )
};

// ---------------
// ROUTINE LIST
// React component from database objects
// ---------------
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
            <div key={routine._id} className="routine" id={routine._id}>
                <h3 className="nameField"> Name: {routine.name} </h3>
                <h3 className="skinField"> Skin Type: {routine.skin} </h3>
                <h3 className="concernsField"> Skin Concerns: {routine.concerns} </h3>
                <h3 className="cleanserField"> Cleanser: {routine.cleanser} </h3>
                <h3 className="moisturizerField"> Moisturizer: {routine.moisturizer} </h3>
                <h3 className="sunscreenField"> Sunscreen: {routine.sunscreen} </h3>
                <span> {DeleteButton(routine._id)} </span>
                <span> {UpdateButton(routine._id)}</span>
            </div>
        );
    });

    return (
        <div className="RoutineList">
            {routineNodes}
        </div>
    );
};

// ---------------
// ADMIN LIST
// React component from database objects
// ---------------
const AdminList = function (props) {
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
            <div key={routine._id} className="routine" id={routine._id}>
                <h3 className="nameField"> Name: {routine.name} </h3>
                <h3 className="skinField"> Skin Type: {routine.skin} </h3>
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

// ---------------
// UPDATE ROUTINE HANDLER
// ---------------
const update = (e) =>{
    e.preventDefault();

    const csrf = document.querySelector('input[name="_csrf"]').value;
    const id = e.currentTarget.getAttribute('name');

    ReactDOM.render(
         <UpdateForm csrf={csrf} _id={id}/>, document.getElementById(`${id}`) 
     )
};

// ---------------
// DISPLAY ROUTINE HANDLER
// ---------------
const setup = function (csrf) {
    ReactDOM.render(
        <RoutineForm csrf={csrf} />, document.querySelector("#buildRoutine")
    );

    ReactDOM.render(
        <RoutineList routines={[]} />, document.querySelector("#routines")
    );

    loadRoutinesFromServer();
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
// GET TOKEN FOR THE PAGE
// ---------------
$(document).ready(function () {
    getToken();
});