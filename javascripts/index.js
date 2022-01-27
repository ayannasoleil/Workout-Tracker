/** Questions regarding Features Usages
//explain the full feature
//use 3 question rule

* when can I use this event? at anytime, when the page gets loaded (domcontentloaded) 
* how will I interact with this event? user will click on button (click)
* what will happen? what's the effect? (displays)

* bonus -- add submit page or comments

**/

/** Globals **/

const baseUrl = 'http://localhost:3000';
let workouts = [];

/** NODES **/

const mainDiv = () => document.getElementById('main');
const homePageLink = () => document.getElementById('home-page-link');
const workoutListLink = () => document.getElementById('workout-list-link');
// const workoutFormLink = () => document.getElementById('workout-form-link');

/*******************/

// const dayInput = () => document.getElementById('day');
// const workoutInput = () => document.getElementById('workout');
// const equiptmentInput = () => document.getElementById('equiptment');
// const mealInput = () => document.getElementById('meal');

/** Templates **/

const homePageTemp = () => {
    return `<h1 class="center-align">Workout Planner</h1>`
}

const workoutListTemp = () => {
    return `<h1>Workout List</h1>
    <table class="highlight">
        <thead>
            <tr>
                <th>Day</th>
                <th>Workout</th>
                <th>Equipment</th>
            </tr>
        </thead>

        <tbody>
            ${ renderWorkouts() }
        </tbody>
    </table>`
}

const workoutTemp = (workout) => {
    return 
    `<tr>
    <td>${ workout.day }</td>
    <td>${ workout.workout }</td>
    <td>${ workout.equipment }</td>
</tr>`
}

/** Renderers **/

const renderHomePage = () => {
    mainDiv().innerHTML = homePageTemp();
}

const renderWorkoutListPage = () => {
    mainDiv().innerHTML = workoutListTemp();
}

const renderWorkouts = () => {
    return workouts.map(workout => workoutTemp(workout));
}

/** Events **/

const loadWorkouts = async () => {
    const resp = await fetch(baseUrl + '/workouts')
    const data = await resp.json();
    workouts = data;
    }


const homePageLinkEvent = () => {
    homePageLink().addEventListener('click', (e) => {
        e.preventDefault();
        renderHomePage();
    })
}

const workoutListLinkEvent = () =>  {
    workoutListLink().addEventListener('click', (e) => {
        e.preventDefault();
        loadWorkouts();
        renderWorkoutListPage();
    })

/***********************/


/** DOM loads **/

document.addEventListener('DOMContentLoaded', () => {
    renderHomePage();
    homePageLinkEvent();
    workoutListLinkEvent();
})
}