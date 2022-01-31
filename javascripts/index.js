/** Globals **/

let workouts = [];

/** DOM loads **/

document.addEventListener('DOMContentLoaded', () => {
    // renderHomePage();
    homePageLoadEvent();
    workoutListLoadEvent();
    workoutFormLoadEvent();
})

/*************************/

/** NODES **/

const mainDiv = () => document.getElementById('main');
const homePageLoad = () => document.getElementById('home-page');
const workoutListLoad = () => document.getElementById('workout-list');
const workoutFormLoad = () => document.getElementById('workout-form');

/*******************/

const dayInput = () => document.getElementById('day');
const workoutInput = () => document.getElementById('workout');
const equipmentInput = () => document.getElementById('equipment');

/** Template **/

const workoutTemp = (workout) => {
    const tr = document.createElement('tr');
    const tdDay = document.createElement('td');
    const tdWorkout = document.createElement('td');
    const tdEquipment = document.createElement('td');
    tdDay.innerText = workout.day;
    tdWorkout.innerText = workout.workout;
    tdEquipment.innerText = workout.equipment;
    tr.appendChild(tdDay)
    tr.appendChild(tdWorkout)
    tr.appendChild(tdEquipment);
    return tr;
}

/** Events **/

const loadWorkouts = async () => {
    const resp = await fetch('http://localhost:3000/workouts')
    const data = await resp.json();
    workouts = data;
    }

const homePageLoadEvent = () => {
    homePageLoad().addEventListener('click', (e) => {
        e.preventDefault();
        renderHomePage();
    })
}

const workoutListLoadEvent = () =>  {
    workoutListLoad().addEventListener('click', (e) => {
        e.preventDefault();
       
        renderWorkoutListPage();
    })

}

const workoutFormLoadEvent = () => {
    workoutFormLoad().addEventListener('click', (e) => {
        e.preventDefault();
        renderWorkoutForm();
    })
}

const submitFormEvent = e => {
    alert('submitted');
    e.preventDefault();
  fetch('http://localhost:3000/workouts', {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          day: dayInput().value, 
          workout: workoutInput().value, 
          equipment: equipmentInput().value, 
      })
  })
  .then(resp => resp.json())
  .then(workout => {
    renderWorkoutListPage();
  })

}

/** Renderers **/

const renderHomePage = () => {
    mainDiv().innerHTML = ''
    const h1 = document.createElement('h1');
    h1.classList.add('center-align');
    h1.innerText = 'Workout Tracker'
    mainDiv().appendChild(h1);
}

const renderWorkoutListPage = async () => {
    await loadWorkouts();
    mainDiv().innerHTML = '';
    const h1 = document.createElement('h1');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const thDay = document.createElement('th');
    const thWorkout = document.createElement('th');
    const thEquipment = document.createElement('th');
    const tbody = document.createElement('tbody');
    h1.innerText = 'Tracked Workouts';
    thDay.innerText = 'Day';
    thWorkout.innerText = 'Workout';
    thEquipment.innerText = 'Equipment';
    table.classList.add('highlight');
    tr.appendChild(thDay);
    tr.appendChild(thWorkout);
    tr.appendChild(thEquipment);
    thead.appendChild(tr);
    table.appendChild(thead);
    workouts.map(workouts => tbody.appendChild(workoutTemp(workouts)));
    table.appendChild(tbody);
    mainDiv().appendChild(h1);
    mainDiv().appendChild(table);
}

const renderWorkoutForm = () => {
    const h1 = document.createElement('h1');
    const form = document.createElement('form');
    const dayDiv = document.createElement('div');
    const dayInput = document.createElement('input');
    const dayLabel = document.createElement('label');
    const workoutDiv = document.createElement('div');
    const workoutInput = document.createElement('input');
    const workoutLabel = document.createElement('label');
    const equipmentDiv = document.createElement('div');
    const equipmentInput = document.createElement('input');
    const equipmentLabel = document.createElement('label');
    const submitButton = document.createElement('input');

    h1.className = 'center-align';
    dayDiv.className = 'input-field';
    workoutDiv.className = 'input-field';
    equipmentDiv.className = 'input-field';
    submitButton.className = 'waves-effect waves-light btn';

    dayInput.setAttribute('id', 'day');
    dayInput.setAttribute('type', 'text');
    dayLabel.setAttribute('for', 'day');
    workoutInput.setAttribute('id', 'workout');
    workoutInput.setAttribute('type', 'text');
    workoutLabel.setAttribute('for', 'workout');
    equipmentInput.setAttribute('id', 'equipment');
    equipmentInput.setAttribute('type', 'text');
    equipmentLabel.setAttribute('for', 'equipment');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'Create Workout');
  
    h1.innerText = 'Create Workout';
    dayLabel.innerText = 'Day'
    workoutLabel.innerText = 'Workout'
    equipmentLabel.innerText = 'Equipment'
    
  
    dayDiv.appendChild(dayInput);
    dayDiv.appendChild(dayLabel);
    workoutDiv.appendChild(workoutInput);
    workoutDiv.appendChild(workoutLabel);
    equipmentDiv.appendChild(equipmentInput);
    equipmentDiv.appendChild(equipmentLabel);
    
  
  
    form.appendChild(dayDiv);
    form.appendChild(workoutDiv);
    form.appendChild(equipmentDiv);
    form.appendChild(submitButton);
  
    form.addEventListener('submit', submitFormEvent);
  
    mainDiv().appendChild(h1);
    mainDiv().appendChild(form);
}
