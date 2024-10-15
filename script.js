//money per sec function
let money = 0;
let moneyPerSecond = 0;
let displayMoney = 0;
let moneyPerClick = 1;
const moneyElement = document.querySelector(".lev-count");
const moneyPerSecondElement = document.querySelector('.lev-per-sec');

const upgrades = [
  {
    name: '10st',
    cost: document.querySelector('.lev-cost-10st'),
    parsedCost: parseFloat(document.querySelector(".lev-cost-10st").innerHTML),
    level: document.querySelector(".level-lev-10st"),
    costMultiplier: 1.12,
    mPS: 0.1
  },
  {
    name: '20st',
    cost: document.querySelector('.lev-cost-20st'),
    parsedCost: parseFloat(document.querySelector(".lev-cost-20st").innerHTML),
    level: document.querySelector(".level-lev-20st"),
    costMultiplier: 1.12,
    mPS: 0.2
  },
  {
    name: '2lv',
    cost: document.querySelector('.lev-cost-2'),
    parsedCost: parseFloat(document.querySelector(".lev-cost-2").innerHTML),
    level: document.querySelector(".level-lev-2"),
    costMultiplier: 1.12,
    mPS: 2
  },

]


// Update money display
function updateMoneyDisplay() {
  moneyElement.textContent = money.toFixed(2);
  moneyPerSecondElement.textContent = moneyPerSecond.toFixed(2);
  //   moneyElement.classList.add('animated');
  //   setTimeout(() => {
  //     moneyElement.classList.remove('animated');
  // }, 100); // Match this duration with your CSS animation duration
}

// Increment money by money per second
function incrementMoney() {
  money += moneyPerSecond / 10;
  updateMoneyDisplay();
}

function updateTitle() {
  document.title = `${Math.floor(money).toLocaleString()} лева`; // Update title with current money
}

let levImgContainter = document.querySelector('.lev-container')

function incrementLev(event) {
  money += moneyPerClick;
  updateMoneyDisplay();

  const x = event.offsetX
  const y = event.offsetY

  const div = document.createElement('div')
  div.innerHTML = `
  <span style="display: flex; align-items: center;">
    +${Math.round(moneyPerClick)}
    <img src="images/lew.png" alt="lew" style="width: 20px; height: 20px; margin-left: 5px;">
  </span>
`;
  div.style.cssText = `color: #D6ED17; position: absolute; top: ${y}px; left: ${x}px; font-size: 25px; pointer-events: none;`
  levImgContainter.appendChild(div)

  div.classList.add('fade-up')

  divTimeout(div)
}

const divTimeout = (div) => {
  setTimeout(() => {
    div.remove()
  }, 800)
}
// Run the increment function every second
setInterval(incrementMoney, 100);
setInterval(updateTitle, 1000);

function buyUpgrade(upgrade) {
  const mU = upgrades.find((u) => {
    if (u.name == upgrade) return u
  })

  if (money >= mU.parsedCost) {
    money -= mU.parsedCost;
    mU.level.innerHTML++;

    mU.parsedCost *= mU.costMultiplier;
    mU.cost.innerHTML = mU.parsedCost.toFixed(2);
    moneyPerSecond += mU.mPS;
    updateMoneyDisplay();
  }
}

function save() {
  localStorage.clear()

  upgrades.map((upgrade) => {

    const obj = JSON.stringify({
      parsedLevel: parseFloat(upgrade.level.innerHTML),
      parsedCost: upgrade.parsedCost,
    })

    localStorage.setItem(upgrade.name, obj)

  })

  localStorage.setItem('mnPerClick', JSON.stringify(moneyPerClick))
  localStorage.setItem('mnPerSecond', JSON.stringify(moneyPerSecond))
  localStorage.setItem('money', JSON.stringify(money))
}

const saveButton = document.getElementById('saveButton');
const saveModal = document.getElementById('saveModal');
const confirmSave = document.getElementById('confirmSave');
const cancelSave = document.getElementById('cancelSave');

// When the "Save" button is clicked, show the modal
saveButton.addEventListener('click', function () {
  saveModal.style.display = 'block'; // Show the modal
});

// When the user clicks "Yes, Save", close the modal and confirm save
confirmSave.addEventListener('click', function () {
  saveModal.style.display = 'none'; // Hide the modal
  alert("Save confirmed!"); // You can replace this with actual save logic
  save()
});

// When the user clicks "Cancel", close the modal
cancelSave.addEventListener('click', function () {
  saveModal.style.display = 'none'; // Hide the modal
  alert("Save cancelled."); // Optionally show a message for cancellation
});

// Close the modal if the user clicks outside of the modal content
window.addEventListener('click', function(event) {
  if (event.target == saveModal) {
      saveModal.style.display = 'none';
  }
  if (event.target == loadModal) {
      loadModal.style.display = 'none';
  }
});

const loadButton = document.getElementById('loadButton');
const loadModal = document.getElementById('loadModal');
const confirmLoad = document.getElementById('confirmLoad');
const cancelLoad = document.getElementById('cancelLoad');

loadButton.addEventListener('click', function () {
  loadModal.style.display = 'block'; // Show the load modal
});

confirmLoad.addEventListener('click', function () {
  loadModal.style.display = 'none'; // Hide the modal
  alert("Load confirmed!"); // You can replace this with actual load logic
  load()
});

cancelLoad.addEventListener('click', function () {
  loadModal.style.display = 'none'; // Hide the modal
  alert("Load cancelled.");
});

function load() {
  upgrades.map((upgrade) => {
    const savedValues = JSON.parse(localStorage.getItem(upgrade.name))

    upgrade.parsedCost = savedValues.parsedCost

    upgrade.level.innerHTML = savedValues.parsedLevel
    upgrade.cost.innerHTML = upgrade.parsedCost.toFixed(2)
  })

  moneyPerClick = JSON.parse(localStorage.getItem('mnPerClick'))
  moneyPerSecond = JSON.parse(localStorage.getItem('mnPerSecond'))
  money = JSON.parse(localStorage.getItem('money'))

  moneyElement.textContent = money.toFixed(2);
  moneyPerSecondElement.textContent = moneyPerSecond.toFixed(2);
}