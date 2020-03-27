let text = prompt("Введите символ для определения языка и регистра", );

let body = document.querySelector('body');
let inputKeyboard = document.createElement('textarea');
let wrapper = document.createElement('div');
let keyboard = document.createElement('div');
let startLanguage = navigator.language.slice(0, 2);  

wrapper.className = 'wrapper';
inputKeyboard.className = 'input-keyboard';
keyboard.className = 'keyboard';

//create object with all key
const keyArrEn = [
  ['`', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace', ],
  ['Tab', "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", 'DEL', ],
  ['CapsLock', "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", `\\`, 'Enter',],
  ["Shift", '\\', "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", '↑', "r-shift", ],
  ["Ctrl", "Win", "Alt", " ", "alt", "Ру", "←", "↓", "→", ],
];
const keyArrEnCaps = [
  ['~', '!', "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", 'Backspace', ],
  ['Tab', "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", 'DEL', ],
  ['CapsLock', "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', `|`, 'Enter',],
  ["Shift", '|', "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", '↑', "r-shift", ],
  ["Ctrl", "Win", "Alt", " ", "alt", "Ру", "←", "↓", "→", ],
];
const keyArrRu = [
  ['ё', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace', ],
  ['Tab', "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 'DEL', ],
  ['CapsLock', "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", `\\`, 'Enter',],
  ["Shift", '\\', "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", '↑', "r-shift", ],
  ["Ctrl", "Win", "Alt", " ", "alt", "En", "←", "↓", "→", ],
];
const keyArrRuCaps = [
  ['Ё', '!', '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", 'Backspace', ],
  ['Tab', "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", 'DEL', ],
  ['CapsLock', "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", `/`, 'Enter',],
  ["Shift", '/', "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", '↑', "r-shift", ],
  ["Ctrl", "Win", "Alt", " ", "alt", "En", "←", "↓", "→", ],
];

  
//create input for keyboard
body.append(wrapper);
wrapper.append(inputKeyboard);

//create keyboard
function createKeyboard(keyArr) {
  wrapper.append(keyboard);
  for (let arr of keyArr) {
   arr.forEach(element => {
     createKey(element);
   });
 }
}

function createKey(element){
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
}



function active(target) {
  if(target.classList.contains('key')){
    target.classList.add('active');
  }
}

function unActive(target) {
  target.classList.remove('active');
}

document.addEventListener('mouseup', (event) =>{
  unActive(event.target);
});

document.addEventListener('mousedown', (event) =>{
  active(event.target);
  printInInput(event.target.id);
});

document.addEventListener('keydown', (event) => keyDownKeyboard(event));
document.addEventListener('keyup', (event) => keyUpKeyboard(event));

function keyDownKeyboard(event){
  printInInput(event.key);
}

function keyUpKeyboard(event){
  console.log(event);
}

function languageDetected(str){
  if(/[а-я]/.test(str)){
    createKeyboard(keyArrRu);
  }

  if(/[А-Я]/.test(str)){
    createKeyboard(keyArrRuCaps);
    document.getElementById('CapsLock').classList.add('active');
  }

  if(/[a-z]/.test(str)){
    createKeyboard(keyArrEn);
  }

  if(/[A-Z]/.test(str)){
    createKeyboard(keyArrEnCaps);
    document.getElementById('CapsLock').classList.add('active');
  }
 
  if(!(/[a-z]/i.test(str)) && !(/[а-я]/i.test(str))){
    let newText = prompt("не удалось определить язык, введите букву", 1)
    languageDetected(newText);
  }
  
}

function printInInput(str){
  if(str === 'Tab'){
    inputKeyboard.value += '  ';
  } 
  if(str === 'space'){
    inputKeyboard.value += ' ';
  }
  if (str.length == 1){
  inputKeyboard.value += str;
  }
}

languageDetected(text);