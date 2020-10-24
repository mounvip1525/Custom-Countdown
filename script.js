const inputContainer=document.getElementById('input-container');
const countdownForm=document.getElementById('countdown-form');
const datePicker=document.getElementById('date-picker');

const countdownContainer=document.getElementById('countdown-container');
const countdownElTitle=document.getElementById('countdown-title');
const countdownTimerElements=document.querySelectorAll('span');
const countdownReset=document.getElementById('countdown-reset');

const completeContainer=document.getElementById('complete-container');
const countdownInfo=document.getElementById('countdown-info');
const countdownSet=document.getElementById('button-set');

let countdownTitle='';
let countdownTime='';
let countdownActive;
let countdownVlue=Date;
let savedData;

let second=1000;
let minute=second*60;
let hour=minute*60;
let day=hour*24;

//To prevent the inputting of dates that has already passed
let today = new Date().toISOString().split('T')[0];
// console.log(today);
datePicker.setAttribute('min',today);

//Updating the UI and finding the countdown variables(days,hours,minutes,seconds)
function updateDOM(){
    //setInterval(function,milliseconds)=>a function which triggers the execution of another function to be executed in every milliseconds(here,it executes every 1 second(1000milliseconds=1second))
    countdownActive=setInterval(()=>{
        const nowTime=new Date().getTime();
        //distance from the standard date ie.june 1970 to todays date to get the actual time in days,hours,minutes and seconds
        const distance=countdownValue-nowTime;
        // console.log(distance);
        const days=Math.floor(distance/day);
        const hours=Math.floor((distance%day)/hour);
        const minutes=Math.floor((distance%hour)/minute);
        const seconds=Math.floor((distance%minute)/second);
        // console.log(days,hours,minutes,seconds);
    
        inputContainer.hidden = true;

        if (distance<0){
            countdownContainer.hidden = true;
            clearInterval(countdownActive);
            countdownInfo.textContent=`Ohho! ${countdownTitle} got over on ${countdownTime}`;
            completeContainer.hidden=false;
        }
        else{
        countdownElTitle.textContent=`${countdownTitle}`;
        countdownTimerElements[0].textContent=`${days}`;
        countdownTimerElements[1].textContent=`${hours}`;
        countdownTimerElements[2].textContent=`${minutes}`;
        countdownTimerElements[3].textContent=`${seconds}`;
        //display the countdown-container after setting the values!
        completeContainer.hidden=true;
        countdownContainer.hidden = false;
        }
    },second);

}

//To input the form details
function updateCountDown(e){
    e.preventDefault();
    // console.log(e);
    countdownTitle=e.srcElement[0].value;
    countdownTime=e.srcElement[1].value;
    savedData={
        title:countdownTitle,
        time:countdownTime
    };
    // console.log(savedData);
    //As localStorage stores only in the form of strings u need to use json.stringify method
    localStorage.setItem('countdown',JSON.stringify(savedData));
    //localStorage.setItem(key-value,object to be stored converted to string)
    if(countdownTime===''){
    alert("Hey!Choose a date to start Countdown:)");
    }
    else{
    // console.log(countdownTitle,countdownTime)
    countdownValue=new Date(countdownTime).getTime();
    // console.log(countdownValue);
    updateDOM();
    }
}
//Resetting all the values
function reset(){
    countdownContainer.hidden=true;
    completeContainer.hidden=true;
    inputContainer.hidden=false;
    clearInterval(countdownActive);
    //clearInterval function is used to stop the execution of a mentioned function/variable after a particular time here no time is mentioned hence on clicking it will immediately stop the execution of the function setInterval;
    countdownTitle='';
    countdownTime='';
    localStorage.removeItem('countdown');
}

//To get the values from local storage if exists
function restorePreviousCountdown(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden=true;
        savedData=JSON.parse(localStorage.getItem('countdown'));
        countdownTitle=savedData.title;
        countdownTime=savedData.time;
        countdownValue=new Date(countdownTime).getTime();
        updateDOM();
    }
}

//Event Listeners
countdownForm.addEventListener('submit',updateCountDown);
countdownReset.addEventListener('click',reset);
countdownSet.addEventListener('click',reset);

//On load
restorePreviousCountdown();