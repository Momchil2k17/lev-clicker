import { defaultUpgradeValues } from "./defaultValues.js";

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-'); // Replace spaces with hyphens
}

function createUpgrades() {
    const upgradesContainer = document.getElementById('upgrades-container')
    const template = document.getElementById('upgrade-template').textContent
  
    defaultUpgradeValues.forEach((obj) => {
      let html = template;
      const slugifiedName = slugify(obj.name);
      Object.keys(obj).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, obj[key])
      });
      upgradesContainer.innerHTML += html
    })
  }
  createUpgrades()
  
export const upgrades = [
    {
        name: '10st',
        bgname:'Десет стотинки',
        cost: document.querySelector('.lev-cost-10st'),
        parsedCost: parseFloat(document.querySelector(".lev-cost-10st").innerHTML),
        level: document.querySelector(".level-lev-10st"),
        costMultiplier: 1.15,
        mPS: 0.1
      },
  
    {
      name: '20st',
      bgname:'Двадесет стотинки',
      cost: document.querySelector('.lev-cost-20st'),
      parsedCost: parseFloat(document.querySelector(".lev-cost-20st").innerHTML),
      level: document.querySelector(".level-lev-20st"),
      costMultiplier: 1.15,
      mPS: 0.2
    },
    {
      name: '50st',
      bgname:'Петдесет стотинки',
      cost: document.querySelector('.lev-cost-50st'),
      parsedCost: parseFloat(document.querySelector(".lev-cost-50st").innerHTML),
      level: document.querySelector(".level-lev-50st"),
      costMultiplier: 1.15,
      mPS: 0.5
    },
    {
      name: '2lv',
      bgname:'Два лева',
      cost: document.querySelector('.lev-cost-2lv'),
      parsedCost: parseFloat(document.querySelector(".lev-cost-2lv").innerHTML),
      level: document.querySelector(".level-lev-2lv"),
      costMultiplier: 1.15,
      mPS: 2
    },
    {
      name: '5lv',
      bgname:'Пет лева',
      cost: document.querySelector('.lev-cost-5lv'),
      parsedCost: parseFloat(document.querySelector(".lev-cost-5lv").innerHTML),
      level: document.querySelector(".level-lev-5lv"),
      costMultiplier: 1.15,
      mPS: 5
    },
    {
      name: '10lv',
      bgname:'Десет лева',
      cost: document.querySelector('.lev-cost-10lv'),
      parsedCost: parseFloat(document.querySelector(".lev-cost-10lv").innerHTML),
      level: document.querySelector(".level-lev-10lv"),
      costMultiplier: 1.15,
      mPS: 10
    },
    {
      name: '20lv',
      bgname:'Двадесет лева',
      cost: document.querySelector('.lev-cost-20lv'),
      parsedCost: parseFloat(document.querySelector(".lev-cost-20lv").innerHTML),
      level: document.querySelector(".level-lev-20lv"),
      costMultiplier: 1.15,
      mPS: 20
    },
    {
      name: '50lv',
      bgname:'Петдесет лева',
      cost: document.querySelector('.lev-cost-50lv'),
      parsedCost: parseFloat(document.querySelector(".lev-cost-50lv").innerHTML),
      level: document.querySelector(".level-lev-50lv"),
      costMultiplier: 1.15,
      mPS: 50
    },
    {
      name: '100lv',
      bgname:'Сто лева',
      cost: document.querySelector('.lev-cost-100lv'),
      parsedCost: parseFloat(document.querySelector(".lev-cost-100lv").innerHTML),
      level: document.querySelector(".level-lev-100lv"),
      costMultiplier: 1.15,
      mPS: 100
    },
  
  ]

  export const powerUpIntervals = [10, 20, 30, 50, 70, 100, 150, 200, 250, 300]