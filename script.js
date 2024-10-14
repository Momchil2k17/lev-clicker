//money per sec function
let money = 0;
let moneyPerSecond = 0;
let displayMoney = 0;
let moneyPerClick = 1041;
const moneyElement = document.querySelector(".lev-count");
const moneyPerSecondElement = document.querySelector('.lev-per-sec');

// Update money display
function updateMoneyDisplay() {
  moneyElement.textContent = money.toFixed(2);
  moneyPerSecondElement.textContent = moneyPerSecond.toFixed(2);
  moneyElement.classList.add('animated');
  setTimeout(() => {
    moneyElement.classList.remove('animated');
}, 100); // Match this duration with your CSS animation duration
}

// Increment money by money per second
function incrementMoney() {
  money += moneyPerSecond;
  updateMoneyDisplay();
}

function updateTitle() {
    document.title = `${Math.floor(money).toLocaleString()} лева`; // Update title with current money
  }

let levImgContainter=document.querySelector('.lev-container')

function incrementLev(event){
    money+=moneyPerClick;
    updateMoneyDisplay();

    const x=event.offsetX
    const y=event.offsetY

    const div=document.createElement('div')
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
setInterval(incrementMoney, 1000);
setInterval(updateTitle, 1000);

//buy 10 st
let upgradeCostLev10st=10;

let st10Level=document.querySelector(".level-lev-10st")
const upgradeCost10stElement = document.querySelector('.lev-cost-10st');

function updateUpgrade10stDisplay() {
    upgradeCost10stElement.textContent = upgradeCostLev10st.toFixed(2);
  }

function buy10st(){
    if(money>=upgradeCostLev10st){
        money-=upgradeCostLev10st
        upgradeCostLev10st*=1.15

        st10Level.innerHTML++
        moneyPerSecond += 0.1; // Increment money per second by 2
        updateMoneyDisplay();
        updateUpgrade10stDisplay()

    }
}
//buy 20 st
let upgradeCostLev20st=100;

let st20Level=document.querySelector(".level-lev-20st")
const upgradeCost20stElement = document.querySelector('.lev-cost-20st');

function updateUpgrade20stDisplay() {
    upgradeCost20stElement.textContent = upgradeCostLev20st.toFixed(2);
  }

function buy20st(){
    if(money>=upgradeCostLev20st){
        money-=upgradeCostLev20st
        upgradeCostLev20st*=1.15

        st20Level.innerHTML++
        moneyPerSecond += 0.2; // Increment money per second by 2
        updateMoneyDisplay();
        updateUpgrade20stDisplay()

    }
}
//buy 2 leva 
let upgradeCostLev2=1000;

let lev2Level=document.querySelector(".level-lev-2")
const upgradeCostLev2Element = document.querySelector('.lev-cost-2');

function updateUpgradeLev2Display() {
    upgradeCostLev2Element.textContent = upgradeCostLev2.toFixed(2);
  }

function buy2Leva(){
    if(money>=upgradeCostLev2){
        money-=upgradeCostLev2
        upgradeCostLev2*=1.15

        lev2Level.innerHTML++
        moneyPerSecond += 2; // Increment money per second by 2
        updateMoneyDisplay();
        updateUpgradeLev2Display()

    }
}
