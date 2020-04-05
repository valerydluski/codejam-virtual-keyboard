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
const keyArrId = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'en', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];
const keyArrEn = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Delete'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'r-shift'],
  ['Ctrl', 'Win', 'Alt', ' ', 'alt', 'Ру', '←', '↓', '→'],
];
const keyArrEnCaps = [
  ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', 'Delete'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
  ['Shift', '|', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'r-shift'],
  ['Ctrl', 'Win', 'Alt', ' ', 'alt', 'Ру', '←', '↓', '→'],
];
const keyArrRu = [
  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Delete'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'r-shift'],
  ['Ctrl', 'Win', 'Alt', ' ', 'alt', 'En', '←', '↓', '→'],
];
const keyArrRuCaps = [
  ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
  ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Delete'],
  ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
  ['Shift', '/', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'r-shift'],
  ['Ctrl', 'Win', 'Alt', ' ', 'alt', 'En', '←', '↓', '→'],
];

const specialKey = ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight'];
// create input for keyboard
body.append(wrapper);
wrapper.append(inputKeyboard);
inputKeyboard.id = 'input';
wrapper.append(someText);
someText.textContent = 'переключение раскладки: виртуальная - shift+ctrl или shift+alt; физическая - ctrl + alt';

const deleteKeyboard = () => {
  while (keyboard.hasChildNodes()) {
    keyboard.removeChild(keyboard.firstChild);
  }
};

const unActive = (targetId) => {
  if (document.getElementById(targetId).classList.contains('key')) {
    document.getElementById(targetId).classList.remove('active');
  }
};

const onMouseOut = (event) => {
  if (event.fromElement && event.toElement && event.fromElement.id && event.toElement.id) {
    if (!(event.target.id === 'CapsLock') && !(event.target.id === 'ShiftLeft') && !(event.target.id === 'ShiftRight')) {
      unActive(event.target.id);
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

const active = (targetId) => {
  if (document.getElementById(targetId).classList.contains('key')) {
    document.getElementById(targetId).classList.add('active');
  }
};

const checkCapsOrShift = (str) => {
  if (str === 'ShiftLeft' || str === 'ShiftRight') {
    return true;
  }
  return false;
};

keyboard.addEventListener('mouseup', (event) => {
  if (checkCapsOrShift(event.target.id)) {
    return;
  }
  if (event.target.id === 'CapsLock') {
    return;
  }
  unActive(event.target.id);
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
  if (document.getElementById(str).classList.contains('active')) {
    return true;
  }
  return false;
}

const checkShift = () => {
  const shiftActive = document.getElementById('ShiftLeft').classList.contains('active');
  const rShiftActive = document.getElementById('ShiftRight').classList.contains('active');
  if (shiftActive || rShiftActive) {
    return true;
  }
  return false;
};

const changeKeyboardCaps = () => {
  for (let i = 1; i < 13;) {
    keyboardChild[i].textContent = keyArrEn[0][i];
    i += 1;
  }
};

const downSpecialKey = (id, target) => {
  switch (id) {
    case 'Backspace':
      active(id);
      keyBackspace();
      break;
    case 'Tab':
      active(id);
      inputKeyboard.value += '        ';
      break;
    case 'Delete':
      active(id);
      keyDelete();
      break;
    case 'Space':
      active(id);
      inputKeyboard.value += ' ';
      break;
    case 'Enter':
      active(id);
      inputKeyboard.value += '\n';
      break;
    case 'MetaLeft':
      active(id);
      inputKeyboard.value += '\n';
      break;
    default:
  }

  if (checkCapsOrShift(id)) {
    if (checkActiveIncludes(id)) {
      unActive(id);
      keyboardCaps = false;
      detectedCapsAndLanguage(target);
      return;
    }
    active(id);
    keyboardCaps = true;
    detectedCapsAndLanguage(target);
    document.getElementById(id).classList.add('active');
    return;
  }

  if (id === 'ControlLeft' || id === 'AltLeft' || id === 'AltRight') {
    active(id);
    if (checkShift()) {
      changeLanguage();
      keyboardCaps = false;
      detectedCapsAndLanguage();
    }
  }

  if (id === 'CapsLock') {
    if (checkActiveIncludes(id)) {
      unActive(id);
      keyboardCaps = false;
      detectedCapsAndLanguage(target);
      return;
    }
    active(id);
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
    active(targetId);
    return;
  }

  if (specialKey.includes(targetId)) {
    downSpecialKey(targetId, event.target);
    return;
  }

  active(targetId);
  if (event.target.classList.contains('key')) {
    printInInput(event.target.textContent);
  }
});

const switchLanguage = () => {
  if (checkActiveIncludes('ControlLeft') && checkActiveIncludes('AltLeft')) {
    changeLanguage();
    detectedCapsAndLanguage();
  }
};

const keyDownKeyboard = (event) => {
  const keyCode = event.code;
  if (keyCode === 'AltLeft' || keyCode === 'ControlLeft') {
    active(keyCode);
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
