import { useState, useEffect, useRef } from 'react';
import "./Timer.css";

/** Renders Timer Component
 *  
 *  state:
 *  - timer: integer representing seconds, initial value of 60
 *  - isStopped: Boolean, true if timer is stopped and false otherwise
 * 
 *  ref:
 *  - timerId: set to the timerId when timer is started, used to clearInterval
 * 
 *  App -> Timer
 */
function Timer(){
  const [timer, setTimer] = useState(60);
  const [isStopped, setIsStopped] = useState(true);
  const timerId = useRef(null);

  // Checks timer and stops when timer hits zero
  useEffect(function clearIntervalTimeisUp(){
    if (timer < 1){
      clearInterval(timerId.current);
      setIsStopped(true);
    }
  }, [timer]);

  // Function handles button click for starting or stopping the timer
  function handleStartOrStop(){
    if(!isStopped){
      clearInterval(timerId.current);
      setIsStopped(true);
    } else if (timer > 1){
      setIsStopped(false);
      timerId.current = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    }
  }

  // Function handles button click for resetting the timer
  function handleReset(){
    clearInterval(timerId.current);
    setIsStopped(true);
    setTimer(60);
  }

  return (
    <div className="timer">
      <div className="timer-container">
        <div className="timer-row">
          <div className="timer-display">
            {timer}
          </div>
        </div>
        <div className="timer-row">
          <button onClick={handleStartOrStop} className="button start-stop">
            { isStopped ? 'START': 'STOP'}
          </button>
          <button onClick={handleReset} className="button reset">
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;