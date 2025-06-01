const generateBtn = document.getElementById('generateBtn');
const lengthInput = document.getElementById('length');
const passwordDisplay = document.getElementById('password');

const chars = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
};

function generatePassword(length) {
  const allChars = chars.lower + chars.upper + chars.numbers + chars.symbols;
  let password = '';
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * allChars.length);
    password += allChars[index];
  }
  return password;
}

generateBtn.addEventListener('click', () => {
  let length = parseInt(lengthInput.value, 10);
  if (isNaN(length) || length < 4) {
    alert('Please enter a valid password length (minimum 4).');
    return;
  }
  if (length > 64) {
    alert('Maximum length is 64.');
    length = 64;
    lengthInput.value = 64;
  }
  const newPass = generatePassword(length);
  passwordDisplay.textContent = newPass;
});
