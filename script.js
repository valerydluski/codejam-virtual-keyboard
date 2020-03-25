let body = document.querySelector('body');
let inputKeyboard = document.createElement('textarea');
let wrapper = document.createElement('div')

wrapper.className = 'wrapper';
inputKeyboard.className = 'input-keyboard';

body.append(wrapper);
wrapper.append(inputKeyboard);