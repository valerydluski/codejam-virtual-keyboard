let keyboard = document.createElement('div');
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
  keyboardLanguage = (localStorage.getItem('keyboard-lang')) ? localStorage.getItem('keyboard-lang') : 'en';
};
//create object with all key
const keyArrEn = [
  ['`', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace', ],
  ['Tab', "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", 'Delete', ],
  ['CapsLock', "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", 'Enter',],
  ["Shift", '\\', "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", '↑', "r-shift", ],
  ["Ctrl", "Win", "Alt", " ", "alt", "Ру", "←", "↓", "→", ],
];
const keyArrEnCaps = [
  ['~', '!', "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", 'Backspace', ],
  ['Tab', "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", 'Delete', ],
  ['CapsLock', "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', 'Enter',],
  ["Shift", '|', "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", '↑', "r-shift", ],
  ["Ctrl", "Win", "Alt", " ", "alt", "Ру", "←", "↓", "→", ],
];
const keyArrRu = [
  ['ё', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace', ],
  ['Tab', "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 'Delete', ],
  ['CapsLock', "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", 'Enter',],
  ["Shift", '\\', "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", '↑', "r-shift", ],
  ["Ctrl", "Win", "Alt", " ", "alt", "En", "←", "↓", "→", ],
];
const keyArrRuCaps = [
  ['Ё', '!', '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", 'Backspace', ],
  ['Tab', "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", 'Delete', ],
  ['CapsLock', "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", 'Enter',],
  ["Shift", '/', "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", '↑', "r-shift", ],
  ["Ctrl", "Win", "Alt", " ", "alt", "En", "←", "↓", "→", ],
];

const specialKey = ["Backquote","Minus","Equal", "BracketLeft", "BracketRight", "Semicolon", "Quote","Backslash","Comma","Period","Slash","IntlBackslash"];
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
    case 'Enter':
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

  if (targetId === 'Backspace'){
    keyBackspace();
  }

  if (targetId === 'Delete'){
    keyDelete();
  }

  active(event.target);
  printInInput(targetId);
});

document.addEventListener('keydown', (event) => keyDownKeyboard(event));
document.addEventListener('keyup', (event) => keyUpKeyboard(event));

let keyDownKeyboard = (event) => {
  let keyCode = event.code;
  if(event.key === 'Control'){
    document.getElementById('Ctrl').classList.add('active');
    return;
  }
  if(keyCode === 'ShiftRight'){
    keyboardCaps = true;
    detectedCapsAndLanguage();
    document.getElementById('r-shift').classList.add('active');
    return;
  }
  if(keyCode === 'CapsLock'){
    keyboardCaps = true;
    detectedCapsAndLanguage();
    document.getElementById('CapsLock').classList.add('active');
    return;
  } 
  if(keyCode === 'ShiftLeft'){
    keyboardCaps = true;
    detectedCapsAndLanguage();
    document.getElementById('Shift').classList.add('active');
    return;
  }
  if(event.key === '|'){
    document.getElementById('|').classList.add('active');
    return;
  }
  if(event.key.length == 1){
    languageDetected(event.key);
  }
  
  if (specialKey.includes(event.code)){
    keyboardCaps = false;
    detectedCapsAndLanguage();
  }
  if(document.getElementById(event.key)==null){
    console.log('сорян, такой кнопки найти не удалось :(')
    return;
  }
  document.getElementById(event.key).classList.add('active');
};

let keyUpKeyboard = (event) => {
  if(event.key === 'Control'){
    document.getElementById('Ctrl').classList.remove('active');
    return;
  }
  if(event.code === 'ShiftRight'){
    document.getElementById('r-shift').classList.remove('active');
    keyboardCaps = false;
    detectedCapsAndLanguage();
    return;
  }
  if(event.code === 'ShiftLeft'){
    document.getElementById('Shift').classList.remove('active');
    keyboardCaps = false;
    detectedCapsAndLanguage();
    return;
  }
  if (event.key === '|'){
    document.getElementById('|').classList.remove('active');
    return;
  }
  if(event.key === '\\'){
    document.getElementById('\\').classList.remove('active');
    return;
  }
  if(document.getElementById(event.key)==null){
    return;
  }
  document.getElementById(event.key).classList.remove('active');
};

const languageDetected = (str) =>{
  if(/[а-я]/.test(str)){
    keyboardLanguage = 'ru';
    keyboardCaps = false;
    saveState(); 
    detectedCapsAndLanguage();
  }
  if(/[А-Я]/.test(str)){
    keyboardLanguage = 'ru';
    keyboardCaps = true;
    saveState();
    detectedCapsAndLanguage();
    document.getElementById('CapsLock').classList.add('active'); 
  }
  if(/[a-z]/.test(str)){
    keyboardCaps = false;
    keyboardLanguage = 'en';
    saveState(); 
    detectedCapsAndLanguage();
  }
  if(/[A-Z]/.test(str)){
    keyboardLanguage = 'en';
    keyboardCaps = true;
    saveState(); 
    detectedCapsAndLanguage();
    document.getElementById('CapsLock').classList.add('active'); 
  }
  if(/[0-9]/.test(str)){
    keyboardCaps = false;
    detectedCapsAndLanguage();
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

const detectedCapsAndLanguage =() =>{
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

const keyBackspace = () => {
  inputKeyboard.setRangeText("", inputKeyboard.selectionStart, inputKeyboard.selectionEnd, "end");
  if (inputKeyboard.selectionStart === inputKeyboard.selectionEnd) {
    inputKeyboard.setRangeText("", inputKeyboard.selectionStart - 1, inputKeyboard.selectionEnd, "end")
  }
}

const keyDelete = () => {
  if (inputKeyboard.selectionStart === inputKeyboard.selectionEnd) {
    inputKeyboard.setRangeText("", inputKeyboard.selectionStart, inputKeyboard.selectionEnd + 1, "end")
  } else if (inputKeyboard.selectionStart != inputKeyboard.selectionEnd) {
    inputKeyboard.setRangeText("", inputKeyboard.selectionStart, inputKeyboard.selectionEnd, "end");
  }
}

window.onload = () => {
  restoreState();
  detectedCapsAndLanguage();
};