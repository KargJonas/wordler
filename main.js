const fixedEl = document.querySelector('#fixed');
const possibleEl = document.querySelector('#possible');
const excludeEl = document.querySelector('#exclude');
const doubleEl = document.querySelector('#double');
const outputEl = document.querySelector('#output');

const list = fetch('./words');
let words = [];

async function load() {
  words = await list
    .then(res => res.text())
    .then(text => words = text.split(/\n/));

  run();
}

load();

let lastPress = 0;
let hasRun = false;

double.addEventListener('click', change);
addEventListener('keyup', change);

function change() {
  lastPress = Date.now();
  hasRun = false;
}

function runLoop() {
  requestAnimationFrame(runLoop);
  if (hasRun == true) return;
  if (Date.now() - lastPress > 200) {
    run();
    hasRun = true;
  }
}

runLoop();

function run() {
  const fixedText = fixedEl.value;
  const possibleText = possibleEl.value;
  const fixed = fixedText.split('')
  const possible = possibleText.split('');
  const possibleLength = possible.length;
  const excludeText = excludeEl.value;
  const exclude = excludeText.split('');
  const excludeLength = exclude.length;
  const fixedLength = fixed.length;
  const noDouble = double.checked;

  console.log(noDouble)

  const filtered = words.filter((word) => {
    if (noDouble) {
      for (let i = 0; i < word.length; i++) {
        if (word.split(word[i]).length > 2) return false;
      }
    }

    for (let i = 0; i < possibleLength; i++) {
      if (!word.includes(possible[i])) return false;
    }

    for (let i = 0; i < excludeLength; i++) {
      if (word.includes(exclude[i])) return false;
    }

    if (fixedText != '_____') {
      for (let i = 0; i < fixedLength; i++) {
        if (fixed[i] == '_') continue;
        if (fixed[i] != word[i]) return false;
      }
    }

    return true;
  });

  outputEl.innerHTML = filtered
    .map((word) => `<li>${word}</li>`).join('');
}
