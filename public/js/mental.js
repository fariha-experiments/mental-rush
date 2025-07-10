let intervalId;
let mainDisplayValue;
let textRate;


// Init SpeechSynth API
const synth = window.speechSynthesis;

// // DOM Elements
const textForm = document.querySelector('form');
// const maxRangeValue = document.getElementById("maxInterval").value;
const maindisplayText = document.getElementById("display");



// const textInput = document.querySelector('#text-input');
// const voiceSelect = document.querySelector('#voice-select');
// const rate = document.querySelector('#rate');
// const rateValue = document.querySelector('#rate-value');
// const pitch = document.querySelector('#pitch');
// const pitchValue = document.querySelector('#pitch-value');
// const body = document.querySelector('body');

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
    const maxRangeValue = document.getElementById("maxInterval").value;

    const min = 1;
    var max = maxRangeValue;

    mainDisplayValue = Math.floor(Math.random() * (max - min + 1) + min);


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
function getLevel3Option(selectedOption){
var selectedDropdownOption = (selectedOption ==="physical")? "physical" : "mental";
populateDropdown(selectedDropdownOption);
}

//populate level 4 dropdown list based on user choice 
function populateDropdown(option){
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

console.log("dd option",option);

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