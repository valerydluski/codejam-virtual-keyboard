import {
  keyArrId, keyArrRuCaps, keyArrEnCaps, keyArrRu, keyArrEn,
} from './keysCollections.js';

const keyboard = document.createElement('div');
const body = document.querySelector('body');
const inputKeyboard = document.createElement('textarea');
const wrapper = document.createElement('div');
const someText = document.createElement('p');
let keyboardLanguage = 'en';
let keyboardCaps = false;
let keyboardChild;
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
// create object with all key

const specialKey = ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight'];
// create input for keyboard
body.append(wrapper);
wrapper.append(inputKeyboard);
inputKeyboard.id = 'input';
wrapper.append(someText);
someText.textContent = 'переключение раскладки: виртуальная - shift+ctrl или shift+alt; физическая - ctrl + alt. Клавиатура создавалась по ОС windows';

const deleteKeyboard = () => {
  while (keyboard.hasChildNodes()) {
    keyboard.removeChild(keyboard.firstChild);
  }
};

const deactivationKey = (targetId) => {
  if (document.getElementById(targetId).classList.contains('key')) {
    document.getElementById(targetId).classList.remove('active');
  }
};

const onMouseOut = (event) => {
  if (event.fromElement && event.toElement && event.fromElement.id && event.toElement.id) {
    if (!(event.target.id === 'CapsLock') && !(event.target.id === 'ShiftLeft') && !(event.target.id === 'ShiftRight')) {
      deactivationKey(event.target.id);
    }
  }
};
// create key
const createKey = (element) => {
  const key = document.createElement('div');
  key.className = 'key';
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
    default:
  }
  keyboard.append(key);
  keyboard.addEventListener('mouseout', onMouseOut);
};

// create keyboard
const createKeyboard = (array) => {
  let i = 0;
  if (wrapper.querySelector('.keyboard')) {
    deleteKeyboard();
  }
  wrapper.append(keyboard);
  array.forEach((arr) => {
    arr.forEach((element) => {
      createKey(element);
    });
  });
  keyboardChild = keyboard.childNodes;
  keyArrId.forEach((arr) => {
    arr.forEach((element) => {
      keyboardChild[i].id = element;
      i += 1;
    });
  });
};

const activationKey = (targetId) => {
  if (document.getElementById(targetId).classList.contains('key')) {
    document.getElementById(targetId).classList.add('active');
  }
};

const checkCapsOrShift = (str) => (str === 'ShiftLeft' || str === 'ShiftRight');

keyboard.addEventListener('mouseup', (event) => {
  if (checkCapsOrShift(event.target.id)) {
    return;
  }
  if (event.target.id === 'CapsLock') {
    return;
  }
  deactivationKey(event.target.id);
  inputKeyboard.blur();
  inputKeyboard.focus();
});

const changeLanguage = () => {
  if (keyboardLanguage === 'ru') {
    keyboardLanguage = 'en';
    saveState();
  } else {
    keyboardLanguage = 'ru';
    saveState();
  }
};

const detectedCapsAndLanguage = () => {
  if (keyboardCaps) {
    if (keyboardLanguage === 'ru') {
      createKeyboard(keyArrRuCaps);
    }
    if (keyboardLanguage === 'en') {
      createKeyboard(keyArrEnCaps);
    }
  }
  if (!keyboardCaps) {
    if (keyboardLanguage === 'ru') {
      createKeyboard(keyArrRu);
    }
    if (keyboardLanguage === 'en') {
      createKeyboard(keyArrEn);
    }
  }
};

const keyBackspace = () => {
  if (inputKeyboard.value.length === 0) {
    return;
  }
  inputKeyboard.setRangeText('', inputKeyboard.selectionStart, inputKeyboard.selectionEnd, 'end');
  if (inputKeyboard.selectionStart === inputKeyboard.selectionEnd) {
    inputKeyboard.setRangeText('', inputKeyboard.selectionStart - 1, inputKeyboard.selectionEnd, 'end');
  }
};

const keyDelete = () => {
  if (inputKeyboard.selectionStart === inputKeyboard.selectionEnd) {
    inputKeyboard.setRangeText('', inputKeyboard.selectionStart, inputKeyboard.selectionEnd + 1, 'end');
  } else if (inputKeyboard.selectionStart !== inputKeyboard.selectionEnd) {
    inputKeyboard.setRangeText('', inputKeyboard.selectionStart, inputKeyboard.selectionEnd, 'end');
  }
};

function checkActiveIncludes(str) {
  return (document.getElementById(str).classList.contains('active'));
}

const checkShift = () => {
  const shiftActive = document.getElementById('ShiftLeft').classList.contains('active');
  const rShiftActive = document.getElementById('ShiftRight').classList.contains('active');
  return (shiftActive || rShiftActive);
};

const changeKeyboardCaps = () => {
  for (let i = 1; i < 13; i += 1) {
    keyboardChild[i].textContent = keyArrEn[0][i];
  }
};

const downSpecialKey = (id, target) => {
  switch (id) {
    case 'Backspace':
      activationKey(id);
      keyBackspace();
      break;
    case 'Tab':
      activationKey(id);
      inputKeyboard.value += '        ';
      break;
    case 'Delete':
      activationKey(id);
      keyDelete();
      break;
    case 'Space':
      activationKey(id);
      inputKeyboard.value += ' ';
      break;
    case 'Enter':
      activationKey(id);
      inputKeyboard.value += '\n';
      break;
    case 'MetaLeft':
      activationKey(id);
      inputKeyboard.value += '\n';
      break;
    default:
  }

  if (checkCapsOrShift(id)) {
    if (checkActiveIncludes(id)) {
      deactivationKey(id);
      keyboardCaps = false;
      detectedCapsAndLanguage(target);
      return;
    }
    activationKey(id);
    keyboardCaps = true;
    detectedCapsAndLanguage(target);
    document.getElementById(id).classList.add('active');
    return;
  }

  if (id === 'ControlLeft' || id === 'AltLeft' || id === 'AltRight') {
    activationKey(id);
    if (checkShift()) {
      changeLanguage();
      keyboardCaps = false;
      detectedCapsAndLanguage();
    }
  }

  if (id === 'CapsLock') {
    if (checkActiveIncludes(id)) {
      deactivationKey(id);
      keyboardCaps = false;
      detectedCapsAndLanguage(target);
      return;
    }
    activationKey(id);
    keyboardCaps = true;
    detectedCapsAndLanguage(target);
    changeKeyboardCaps();
    document.getElementById(id).classList.add('active');
  }
};

const printInInput = (str) => {
  inputKeyboard.value += str;
};

keyboard.addEventListener('mousedown', (event) => {
  const targetId = event.target.id;

  if (targetId === 'en') {
    changeLanguage();
    saveState();
    detectedCapsAndLanguage();
    activationKey(targetId);
    return;
  }

  if (specialKey.includes(targetId)) {
    downSpecialKey(targetId, event.target);
    return;
  }

  activationKey(targetId);
  if (event.target.classList.contains('key')) {
    printInInput(event.target.textContent);
  }
});

const switchLanguage = () => {
  if (checkActiveIncludes('ControlLeft') && checkActiveIncludes('AltLeft')) {
    changeLanguage();
    detectedCapsAndLanguage();
    activationKey('AltLeft');
    activationKey('ControlLeft');
  }
};

const keyDownKeyboard = (event) => {
  const keyCode = event.code;
  if (keyCode === 'AltLeft' || keyCode === 'ControlLeft') {
    activationKey(keyCode);
    switchLanguage();
    return;
  }
  if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
    if (checkShift()) {
      return;
    }
  }
  if (specialKey.includes(keyCode)) {
    downSpecialKey(keyCode, event.target);
    return;
  }

  if (document.getElementById(keyCode) == null) {
    return;
  }
  document.getElementById(keyCode).classList.add('active');
  printInInput(document.getElementById(keyCode).textContent);
};

const keyUpKeyboard = (event) => {
  if (document.getElementById(event.code) == null) {
    return;
  }
  if (event.code === 'CapsLock') {
    return;
  }
  if (checkCapsOrShift(event.code)) {
    keyboardCaps = false;
    detectedCapsAndLanguage();
    document.getElementById(event.code).classList.remove('active');
    return;
  }
  document.getElementById(event.code).classList.remove('active');
  inputKeyboard.blur();
  inputKeyboard.focus();
};

document.addEventListener('keydown', (event) => keyDownKeyboard(event));
document.addEventListener('keyup', (event) => keyUpKeyboard(event));


document.getElementById('input').onkeydown = function forTab(event) {
  event.preventDefault();
  if (event.keyCode === 9 || event.which === 9) {
    event.preventDefault();
    const s = this.selectionStart;
    this.value = `${this.value.substring(0, this.selectionStart)}\t${this.value.substring(this.selectionEnd)}`;
    this.selectionEnd = s + 1;
  }
};


window.onload = () => {
  restoreState();
  detectedCapsAndLanguage();
};
