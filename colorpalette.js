const palette = document.getElementById('palette');
const generateBtn = document.getElementById('generateBtn');
const msg = document.getElementById('msg');

function getRandomColor() {

  const letters = '0123456789ABCDEF';
  let color = '#';
  for(let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generatePalette() {
  palette.innerHTML = '';
  msg.textContent = '';
  for(let i = 0; i < 5; i++) {
    const color = getRandomColor();
    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = color;
    colorBox.title = 'Click to copy HEX code';
    
    const codeLabel = document.createElement('div');
    codeLabel.classList.add('color-code');
    codeLabel.textContent = color;
    
    colorBox.appendChild(codeLabel);
    palette.appendChild(colorBox);

    colorBox.addEventListener('click', () => {
      navigator.clipboard.writeText(color).then(() => {
        msg.textContent = `Copied ${color} to clipboard!`;
        setTimeout(() => msg.textContent = '', 2000);
      }).catch(() => {
        msg.textContent = 'Failed to copy!';
      });
    });
  }
}


window.onload = generatePalette;

generateBtn.addEventListener('click', generatePalette);
