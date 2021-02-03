const sounds = {
    81:{
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Chord 1',
        note: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    87:{
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Chord 2',
        note: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    69:{
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Chord 3',
        note: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    65:{
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Clap',
        note: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    83:{
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Open-HH',
        note: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    68:{
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Closed-HH',
        note: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    },
    90:{
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Punchy-Kick",
        note: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    88:{
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Side-Stick',
        note: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    67:{
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Snare',
        note: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
};

function removeTransition(e){
    if(e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

function showDisplay(keyCode){
    //Show note on display
    const display = document.querySelector('#display');
    if(display.firstChild !== null){
        display.firstChild.textContent = `${sounds[keyCode].id}`;
    }else{
        const noteDisplay = document.createElement('p')
        noteDisplay.setAttribute('id','note-display');
        if(sounds[keyCode] != undefined){
            noteDisplay.innerHTML = `${sounds[keyCode].id}`;
            display.appendChild(noteDisplay);
        }
    }
}

function removeDisplay(){
    const display = document.querySelector('#display');
    const noteDisplay = document.getElementById('note-display');
    if(noteDisplay != null){
        display.removeChild(noteDisplay); 
    }
}

function playSound(keyCode) {
    if(sounds[keyCode] === undefined) return; //Exit when not parameterized key is pressed
    const sound = document.createElement(`audio`);
    sound.setAttribute('src',`${sounds[keyCode].note}`);
    //applying style when key is pressed
    const key = document.querySelector(`#${sounds[keyCode].keyTrigger}`);
    key.classList.add('playing');
    sound.play();
}

const btn = document.querySelectorAll('.drum-pad');
btn.forEach((button) => {
    button.addEventListener('click', () => {
        Object.getOwnPropertyNames(sounds).some(key => {
            if(sounds[key].keyTrigger === button.textContent){
                playSound(key);
            }
        });
    });
});

window.addEventListener('keydown', (e) => {
    showDisplay(e.keyCode);
    playSound(e.keyCode);
});
window.addEventListener('keyup', () => {
    removeDisplay();
});

const keys = Array.from(document.querySelectorAll('.drum-pad'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
