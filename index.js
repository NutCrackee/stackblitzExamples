import * as redux from 'redux';

/* REDUX AREA START */

function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 };
    case 'counter/decremented':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

function timerReducer(state = { running: false, elapsedSec: 0 }, action) {
  switch (action.type) {
    case 'timer/run':
      return Object.assign(state, { running: true });
    case 'timer/stop':
      return Object.assign(state, { running: false });
    case 'timer/addSec':
      return Object.assign(state, { elapsedSec: state.elapsedSec + 1 });
    case 'timer/reset':
      return Object.assign(state, { elapsedSec: 0 });
    default:
      return state;
  }
}

const combinedReducers = redux.combineReducers({
  counterReducer,
  timerReducer
});

const reduxStore = redux.createStore(combinedReducers);

reduxStore.subscribe(() => {
  // Debug info
  console.log(reduxStore.getState());

  // HTML renders
  counterValueText.innerText = reduxStore.getState().counterReducer.value;
  timerValueText.innerText = `Running: ${
    reduxStore.getState().timerReducer.running
  } | ${reduxStore.getState().timerReducer.elapsedSec}`;
});

/* REDUX AREA END */

/* Event implementation */

let interval = null;

const increment = () => {
  reduxStore.dispatch({ type: 'counter/incremented' });
};

const decrement = () => {
  reduxStore.dispatch({ type: 'counter/decremented' });
};

const start = () => {
  reduxStore.dispatch({ type: 'timer/run' });
  interval = setInterval(() => {
    reduxStore.dispatch({ type: 'timer/addSec' });
  }, 1000);
};

const stop = () => {
  clearInterval(interval);
  reduxStore.dispatch({ type: 'timer/stop' });
};

const reset = () => {
  reduxStore.dispatch({ type: 'timer/reset' });
};

/* HTML Events Bindings */

// Counter Bindings
const incrementBtn = document.getElementById('incrementBtn');
incrementBtn.addEventListener('click', increment);

const decrementBtn = document.getElementById('decrementBtn');
decrementBtn.addEventListener('click', decrement);

const counterValueText = document.getElementById('counterValueText');

// Timer Bindings
const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', start);

const stopBtn = document.getElementById('stopBtn');
stopBtn.addEventListener('click', stop);

const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', reset);

const timerValueText = document.getElementById('timerValueText');
