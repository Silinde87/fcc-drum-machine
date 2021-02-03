const sounds = {
    81:{
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'C4',
        note: '/sounds/Piano.mf.C4.wav'
    },
    87:{
        keyCode: 87,
        keyTrigger: 'W',
        id: 'D4',
        note: '/sounds/Piano.mf.D4.wav'
    },
    69:{
        keyCode: 69,
        keyTrigger: 'E',
        id: 'E4',
        note: '/sounds/Piano.mf.E4.wav'
    },
    65:{
        keyCode: 65,
        keyTrigger: 'A',
        id: 'F4',
        note: '/sounds/Piano.mf.F4.wav'
    },
    83:{
        keyCode: 83,
        keyTrigger: 'S',
        id: 'G4',
        note: '/sounds/Piano.mf.G4.wav'
    },
    68:{
        keyCode: 68,
        keyTrigger: 'D',
        id: 'A4',
        note: '/sounds/Piano.mf.A4.wav'
    },
    90:{
        keyCode: 90,
        keyTrigger: 'Z',
        id: "B4",
        note: '/sounds/Piano.mf.B4.wav'
    },
    88:{
        keyCode: 88,
        keyTrigger: 'X',
        id: 'C5',
        note: '/sounds/Piano.mf.C5.wav'
    },
    67:{
        keyCode: 67,
        keyTrigger: 'C',
        id: 'D5',
        note: '/sounds/Piano.mf.D5.wav'
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
        noteDisplay.innerHTML = `${sounds[keyCode].id}`;
        display.appendChild(noteDisplay);    
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
