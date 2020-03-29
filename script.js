let keyboard = document.createElement('div');;
let body = document.querySelector('body');
let inputKeyboard = document.createElement('textarea');
let wrapper = document.createElement('div');
let keyboardLanguage = 'en';
let keyboardCaps = false;
keyboard.className = 'keyboard';
keyboard.id = 'keyboard';
wrapper.className = 'wrapper';
inputKeyboard.className = 'input-keyboard';

const saveState = () => {
  localStorage.setItem('keyboard-lang', keyboardLanguage);
};

const restoreState = () => {
  console.log('restore')
  keyboardLanguage = (localStorage.getItem('keyboard-lang')) ? localStorage.getItem('keyboard-lang') : 'en';
};
//create object with all key
const keyArrEn = [
  ['`', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace', ],
  ['Tab', "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", 'Delete', ],
  ['CapsLock', "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", `\\`, 'Enter',],
  ["Shift", '\\', "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", '↑', "r-shift", ],
  ["Ctrl", "Win", "Alt", " ", "alt", "Ру", "←", "↓", "→", ],
];
const keyArrEnCaps = [
  ['~', '!', "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", 'Backspace', ],
  ['Tab', "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", 'Delete', ],
  ['CapsLock', "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', `|`, 'Enter',],
  ["Shift", '|', "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", '↑', "r-shift", ],
  ["Ctrl", "Win", "Alt", " ", "alt", "Ру", "←", "↓", "→", ],
];
const keyArrRu = [
  ['ё', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace', ],
  ['Tab', "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 'Delete', ],
  ['CapsLock', "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", `\\`, 'Enter',],
  ["Shift", '\\', "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", '↑', "r-shift", ],
  ["Ctrl", "Win", "Alt", " ", "alt", "En", "←", "↓", "→", ],
];
const keyArrRuCaps = [
  ['Ё', '!', '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", 'Backspace', ],
  ['Tab', "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", 'Delete', ],
  ['CapsLock', "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", `/`, 'Enter',],
  ["Shift", '/', "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", '↑', "r-shift", ],
  ["Ctrl", "Win", "Alt", " ", "alt", "En", "←", "↓", "→", ],
];

  
//create input for keyboard
body.append(wrapper);
wrapper.append(inputKeyboard);

//create keyboard
const createKeyboard = (array) =>{
  if (wrapper.querySelector('.keyboard')) {
    deleteKeyboard();
  }
  wrapper.append(keyboard);
  for (let arr of array) {
   arr.forEach(element => {
     createKey(element);
   });
 }
};

//create key
const createKey = (element) =>{
  let key = document.createElement('div');
  key.className = 'key';
  key.id = element;
  if (element === ' '){
    key.id = 'space';
  }
  key.textContent = `${element}`;
  switch (element) {
    case ' ':
      key.classList.add('space');
      break;
    case 'Backspace':
    case 'Tab':
    case 'CapsLock':
    case 'Shift':  
      key.classList.add('big-key');
      break;
  }
  keyboard.append(key);
  keyboard.addEventListener('mouseout', onMouseOut);
};


const active = (target) => {
  if(target.classList.contains('key')){ 
    target.classList.add('active');
  }
};

const unActive = (target) => {
  target.classList.remove('active');
  return target; 
};


document.addEventListener('mouseup', (event) =>{
  if (checkCapsOrShift(event.target.id)){
    return;
  }
  unActive(event.target);
});

document.addEventListener('mousedown', (event) =>{
  let targetId = event.target.id;
  if (targetId === 'Ру'){
      keyboardLanguage = 'ru';
      saveState(); 
      detectedCapsAndLanguage();
  }

  if (targetId === 'En'){
    keyboardLanguage = 'en';
    saveState(); 
    detectedCapsAndLanguage();
  }

  if (checkCapsOrShift(targetId)){
    if (checkActiveIncludes(targetId)){
      unActive(event.target);
      keyboardCaps = false;
      detectedCapsAndLanguage(event.target);
      
      return;
    }
    active(event.target);
    keyboardCaps = true;
    detectedCapsAndLanguage(event.target);
    document.getElementById(targetId).classList.add('active');
    return;
  }

  if (targetId === 'Ctrl' || targetId === 'Alt' || targetId === 'alt'){
    if (checkShift()){
      changeLanguage();
      keyboardCaps = false;
      detectedCapsAndLanguage();
    }
  }

  active(event.target);
  printInInput(targetId);
});

document.addEventListener('keydown', (event) => keyDownKeyboard(event));
document.addEventListener('keyup', (event) => keyUpKeyboard(event));

let keyDownKeyboard = (event) => {
  if(event.key === 'Control'){
    document.getElementById('Ctrl').classList.add('active');
    return;
  }
  if(event.code === 'ShiftRight'){
    document.getElementById('r-shift').classList.add('active');
    return;
  }
  printInInput(event.key);
  document.getElementById(event.key).classList.add('active');
};

let keyUpKeyboard = (event) => {
  if(event.key === 'Control'){
    document.getElementById('Ctrl').classList.remove('active');
    return;
  }
  if(event.code === 'ShiftRight'){
    document.getElementById('r-shift').classList.remove('active');
    return;
  }
  document.getElementById(event.key).classList.remove('active');
};

const languageDetected = (str) =>{
  if(/[а-я]/.test(str)){
    createKeyboard(keyArrRu);
    keyboardLanguage = 'ru';
    saveState(); 
    keyboardCaps = false;
  }
  if(/[А-Я]/.test(str)){
    createKeyboard(keyArrRuCaps);
    document.getElementById('CapsLock').classList.add('active');
    keyboardLanguage = 'ru';
    saveState(); 
    keyboardCaps = true;
  }
  if(/[a-z]/.test(str)){
    createKeyboard(keyArrEn);
    keyboardLanguage = 'en';
    saveState(); 
    eyboardCaps = false;
  }
  if(/[A-Z]/.test(str)){
    createKeyboard(keyArrEnCaps);
    document.getElementById('CapsLock').classList.add('active');
    keyboardLanguage = 'en';
    saveState(); 
    keyboardCaps = true;
  }
};

function printInInput(str){
  if(str === 'Tab'){
    inputKeyboard.value += '  ';
  } 
  if(str === 'space'){
    inputKeyboard.value += ' ';
  }
  if(str === 'Enter'){
    inputKeyboard.value += '\n';
  }
  if (str.length == 1){
  inputKeyboard.value += str;
  }
}

function checkCapsOrShift (str){
  if (str === 'CapsLock' || str === 'Shift' || str === 'r-shift'){
    return true;
  }
}

function checkActiveIncludes (str){
  if (document.getElementById(str).classList.contains('active')){
    return true;
  }
}

let checkShift = () =>{
  let shiftActive = document.getElementById('Shift').classList.contains('active');
  let rShiftActive = document.getElementById('r-shift').classList.contains('active');
  if (shiftActive || rShiftActive){
    return true;
  }
}

function deleteKeyboard(){
  while (keyboard.hasChildNodes()) {  
    keyboard.removeChild(keyboard.firstChild);
  } 
}

const detectedCapsAndLanguage =(str) =>{
  console.log('создание клавиатуры');
  if (keyboardCaps){
    if(keyboardLanguage === 'ru'){
      createKeyboard(keyArrRuCaps);
    }
    if(keyboardLanguage === 'en'){
      createKeyboard(keyArrEnCaps); 
    }
  }
  if (!keyboardCaps){
    if(keyboardLanguage === 'ru'){
      createKeyboard(keyArrRu);
    }
    if(keyboardLanguage === 'en'){
      createKeyboard(keyArrEn);
    }
  }
};

const onMouseOut = (event) => {
  if (event.fromElement && event.toElement && event.fromElement.id && event.toElement.id) {
    if (!(event.target.id ==='CapsLock') && !(event.target.id ==='Shift') && !(event.target.id ==='r-shift')){
      unActive(event.target);
    }
  }
};

const changeLanguage = () => {
  if (keyboardLanguage === 'ru'){
    keyboardLanguage = 'en';
    saveState(); 
  }
  else{
    keyboardLanguage = 'ru';
    saveState(); 
  }
}

window.onload = () => {
  restoreState();
  detectedCapsAndLanguage();
};