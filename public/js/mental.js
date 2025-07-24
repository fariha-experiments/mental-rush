let intervalId;
let mainDisplayValue;
let textRate;


// Init SpeechSynth API
const synth = window.speechSynthesis;

// // DOM Elements
const textForm = document.querySelector('form');
let maxRangeValue;
const maindisplayText = document.getElementById("display");
// const dropDownValue = document.querySelector(".level-3 > button").value;



// const textInput = document.querySelector('#text-input');
// const voiceSelect = document.querySelector('#voice-select');
// const rate = document.querySelector('#rate');
// const rateValue = document.querySelector('#rate-value');
// const pitch = document.querySelector('#pitch');
// const pitchValue = document.querySelector('#pitch-value');
// const body = document.querySelector('body');
// document.getElementByClassName(".level3-btn-group").addEventListener("click",setLevel3Option);

//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// // Init voices array
// let voices = [];

// const getVoices = () => {
//   voices = synth.getVoices();

//   // Loop through voices and create an option for each one
//   voices.forEach(voice => {
//     // Create option element
//     const option = document.createElement('option');
//     // Fill option with voice and language
//     option.textContent = voice.name + '(' + voice.lang + ')';

//     // Set needed option attributes
//     option.setAttribute('data-lang', voice.lang);
//     option.setAttribute('data-name', voice.name);
//     voiceSelect.appendChild(option);
//   });
// };

// //Line 35, 36 causes voice list duplication
// /*getVoices();
// if (synth.onvoiceschanged !== undefined) {
//   synth.onvoiceschanged = getVoices;
// }*/

//Fix for duplication, run code depending on the browser
if (isFirefox) {
    getVoices();
}
if (isChrome) {
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = getVoices;
    }
}



// // EVENT LISTENERS

// // Text form submit
// textForm.addEventListener('submit', e => {
//   e.preventDefault();
//   speak();
//   textInput.blur();
// });

// // Rate value change
// rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// // Pitch value change
// pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// // Voice select change
// voiceSelect.addEventListener('change', e => speak());

function startCounter(e) {
    let speeds = { 1: 500, 2: 1000, 3: 1200, 4: 1500};
    const speedSelect = document.querySelector('input[name="speed"]:checked').value;


    for (const each in speeds) {
        /* console.log(each) */

        if (each == speedSelect) {
            textRate = speeds[each] + 1;
            // console.log(delay);
        }

    }

  

    // check if an interval has already been set up
    if (!intervalId) {
        intervalId = setInterval(flashText, textRate);
    }
}



function flashText() {
    var maxRangeVal = document.getElementById("maxInterval").value;

    const min = 1;
    maxRangeValue = maxRangeVal;

    mainDisplayValue = Math.floor(Math.random() * (maxRangeValue - min + 1) + min);


    if (mainDisplayValue != "") {
        const speakText = new SpeechSynthesisUtterance(mainDisplayValue);
        console.log("speech", speakText);
        speakText.rate = textRate;
        synth.speak(speakText);
        if (synth.speaking) {
  maindisplayText.innerText = speakText.text;
    
  }
       


    }


    // console.log(display);

    /*oElem.className = oElem.className === "go" ? "stop" : "go";*/
}

//function to decide the flow based on what the user selects in display level 3
function setLevel3Option(e){
    let selectedOption = e.target.value;
// console.log("dropDownValue",selectedOption);
var selectedDropdownOption = (selectedOption ==="physical")? "physical" : "mental";
toggleDropdown();
populateDropdown(selectedDropdownOption);
}
// on click of user choice(mental or physical) display(unhide) layer 4 dropdown

function toggleDropdown() {
  const dropdownMenu = document.getElementById("dropdownSearch");

 
    dropdownMenu.classList.toggle('hidden');
    dropdownMenu.classList.toggle('display');
 

  }


function search(){
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  console.log(filter);
  div = document.getElementById("getMerchant");
  a = div.getElementsByTagName("li");
  for (i = 1; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    a[i].classList.toggle('hidden', txtValue.toUpperCase().indexOf(filter) === -1);
}
}

//populate level 4 dropdown list based on user choice 
function populateDropdown(option){
const level4Div= document.getElementById('level-h3');
const activities = {
  mental: [
    "snap",
    "clap",
    "blink",
    "left two",
    "right two",
    "left thumsup",
    "right thumbsup",
    "both thumsup"
  ],
  physical: [
    "Single leg hop",
    "double leg hop",
    "front hop",
    "left hop",
    "right hop",
    "back hop",
    "turn around clockwise hop",
    "turn around anti-clockwise hop",
    "squat",
    "left lunge",
    "right lunge"
  ]
};

const level4_heading = document.createElement('h3');
console.log("max"+ maxRangeValue);
level4_heading.textContent = "Choose your preferred set of "+ `${maxRangeValue} `+ `${option}`+" exercises:";
level4_heading.classList.add('text-xl', 'font-bold', 'drop-shadow-lg');
level4Div.appendChild(level4_heading);


let checkboxData = activities[option];
console.log("data"+ checkboxData);
const dropdownList= document.getElementById('dropdown-list');
  checkboxData.forEach((item, index) => {
  const id = `checkbox-${index}`;

  // Create wrapper div
  const div = document.createElement('div');
  div.classList.add('flex', 'items-center', 'p-2', 'rounded', 'hover:bg-gray-100');

  // Create input checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;
  checkbox.name = 'checkbox-item';
  checkbox.value = item;
  checkbox.classList.add(
    'w-4', 'h-4', 'text-blue-600', 'bg-gray-100',
    'border-gray-300', 'rounded', 'focus:ring-blue-500'
  );

  // Create label
  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.textContent = item;
  label.classList.add('w-full', 'ml-2', 'text-sm', 'font-medium', 'text-gray-900', 'rounded');

  // Append checkbox and label to wrapper
  div.appendChild(checkbox);
  div.appendChild(label);

  // Append div to  li container to attach to ul drpdownList
  const li = document.createElement('li');
  li.appendChild(div);

  //append the li items to existing ul wrapper
  dropdownList.appendChild(li);
  
});


}
  checkBoxArr = [];
function getCheckboxValues(e){
  const checkboxValue = e.target.value;
  const isChecked = e.target.checked;
  const maxCheckLimit = maxRangeValue;

  if (isChecked) {
    if (checkBoxArr.length < maxCheckLimit) {
      checkBoxArr.push(checkboxValue);
    } else {
      // Don't allow checking more — undo the check
      e.target.checked = false;
      e.target.classList.add('bg-grey');
     
    }
  }
  
   else {
    //handling condition if user unchecks any checked value
    checkBoxArr = checkBoxArr.filter(val => val !== checkboxValue);
    
   }

}

//to optimize: write a setMaxRange value and getMaxRange so it's globally not modified
function setMaxRange(e){
  maxRangeValue = e.target.value;

}


// Speak
// const speak = () => {
//   // Check if speaking
//   if (synth.speaking) {
//     console.error('Already speaking...');
//     return;
//   }
//   if (mainDisplayValue !== '') {
//     // Add background animation
//     // body.style.background = '#141414 url(img/wave.gif)';
//     // body.style.backgroundRepeat = 'repeat-x';
//     // body.style.backgroundSize = '100% 100%';

//     // Get speak text

//     // Speak end
//     // speakText.onend = e => {
//     //   console.log('Done speaking...');
//     //   body.style.background = '#141414';
//     // };

//     // Speak error
//     speakText.onerror = e => {
//       console.error('Something went wrong');
//     };

// //     // Selected voice
// //     const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
// //       'data-name'
// //     );

// //     // Loop through voices
// //     voices.forEach(voice => {
// //       if (voice.name === selectedVoice) {
// //         speakText.voice = voice;
// //       }
// //     });

//     // Set pitch and rate
//     speakText.rate = speedSelect;
//     // speakText.pitch = pitch.value;
//     // Speak
//     synth.speak(speakText);
//   }
// };

function stopTextColor() {
    clearInterval(intervalId);
    // release our intervalId from the variable
    intervalId = null;
}

document.getElementById("set").addEventListener("click", startCounter);
document.getElementById("stop").addEventListener("click", stopTextColor);
document.getElementById("maxInterval").addEventListener("change",setMaxRange);
document.getElementById("dropdown-list").addEventListener("change",getCheckboxValues);
document.getElementById("btn-dropdown").addEventListener("click",toggleDropdown);
document.querySelector(".level3-btn-group").addEventListener("click",setLevel3Option);