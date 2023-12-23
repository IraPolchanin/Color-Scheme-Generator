const resultField = document.getElementById('result');
const form = document.getElementById('color-form');
const hexInput = document.getElementById('hex-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const hex = hexInput.value.slice(1);
  const mode = document.getElementById('mode-input').value;
  const count = document.getElementById('count-input').value;

  fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=${count}`)
    .then(resp => resp.json())
    .then(data => generateScheme(data))
})

function generateScheme(data) {
resultField.innerHTML = data.colors.map(color => `
    <div class="color-column">
      <div class="color-display" style="background-color: ${color.hex.value};"></div>
      <p class="color-name">${color.name.value}</p>
      <p class="color-desc" id="color-desc" onclick="copyToClipboard('${color.hex.value}')">${color.hex.value}</p>
    </div>
  `).join('')
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert( `Copied ${text} to keyboard `);
  });
}

function generateRandomColor(){
 let startColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
 hexInput.value = startColor;
}

generateRandomColor()

