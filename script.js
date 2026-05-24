const timer = document.querySelector('.timer')
const title = document.querySelector('.title')
const startBtn = document.querySelector('.startBtn')
const pauseBtn = document.querySelector('.pauseBtn')
const resumeBtn = document.querySelector('.resumeBtn')
const resetBtn = document.querySelector('.resetBtn')
const promoCountsDisplay = document.querySelector('.promoCountsDisplay')


const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
let timerId = null;
let oneRoundCompleted = false;
let totalCount = 0;
let pause = false;


// function to update

const updateTitle = (msg) => {
    title.textContent = msg;

}

// function to save local storage
const saveLocalCounts = () => {
    let counts = JSON.parse(localStorage.getItem("pomoCounts"));
    counts !== null ?   counts++ :   counts = 1;
    localStorage.setItem("promoCounts", JSON.stringify(counts));
}

//function to countDown
const countDown = (time) => {
    return () => {
        const mins = Math.floor(time / 60).toString().padStart(2, '0');
        const secs = Math.floor(time % 60).toString().padStart(2, '0');
        timer.textContent = `${mins}:${secs}`;
        time--;
        if(time < 0){
            stopTimer();
            if(!oneRoundCompleted) {
                timerId = startTimer(BREAK_TIME);
                oneRoundCompleted = true;
                updateTitle("It's Break Time!")
            } else {
                updateTitle("Completed 1 Round")
                setTimeout(() => updateTitle("Start Again"), 2000);
                totalCount++;
                saveLocalCounts();
                showPomoCount();
                
            }
        }
    }
}


//function to start timer
const startTimer = (startTime) => {
    if(timerId !== null){
        stopTimer();
    }
    return setInterval(countDown(startTime), 1000)
}

//function to stop timer
const stopTimer = () => {
    clearInterval(timerId);
    timerId = null;
}
//covert min to sec
const getTimeInSeco = (timeString) =>{
    const[min, sec] = timeString.split(":")
    return parseInt(min * 60) + parseInt(sec);
}

// Adding Event to start button
startBtn.addEventListener('click', () => {
   timerId = startTimer(WORK_TIME);
   updateTitle("It's Work Time!");
})

//reset
resetBtn.addEventListener('click', () => {
    stopTimer();
    timer.textContent = "25:00";
})

//pause
pauseBtn.addEventListener('click', () => {
    stopTimer();
    pause = true;
    updateTitle("Timer paused")
})

//resume
resumeBtn.addEventListener('click', () => {
    if(pause) {
        const currentTime = getTimeInSeco(timer.textContent)
        timerId = startTimer(currentTime);
        pause = false;
        (!oneRoundCompleted) ? updateTitle("it's work") : updateTitle("its break")
    }
})



const showPomoCount = () => {
    const counts = JSON.parse(localStorage.getItem("pomoCounts"));
    if(counts > 0){
        promoCountsDisplay.style.display = "flex"

    }

    promoCountsDisplay.firstElementChild.textContent = counts;
}
showPomoCount();