let intervalId;

function startCounter(e) {
let delay;
let speeds = {1:300,2:600,3:1000,4:2000};
const selectedValue = document.querySelector('input[name="speed"]:checked')?.value;
      
      for(const each in speeds){
      /* console.log(each) */
      
       if (each==selectedValue) {
        delay= speeds[each];
        console.log(delay);
        }
      
      }
      
   //     console.log("delay2",delay);

  // check if an interval has already been set up
  if (!intervalId) {
    intervalId = setInterval(flashText, delay);
  }
}

function flashText() {
  const oElem = document.getElementById("display");
const maxValue = document.getElementById("maxInterval").value;
   /*  console.log();  */
  const min = 1;
  var max= maxValue;
  const display = Math.floor(Math.random()*(max-min+1)+min);
  oElem.innerText=display;
  
 // console.log(display);

  /*oElem.className = oElem.className === "go" ? "stop" : "go";*/
}

function stopTextColor() {
  clearInterval(intervalId);
  // release our intervalId from the variable
  intervalId = null;
}

document.getElementById("set").addEventListener("click", startCounter);
document.getElementById("stop").addEventListener("click", stopTextColor);