const billInput = document.getElementById('bill-input');
const tipAmount = document.getElementById('tip-amount');
const numInput = document.getElementById('num-input');
const totalAmount = document.getElementById('total-amount');
const restBtn = document.querySelector('.reset-btn');
const tipsBtn = document.querySelectorAll("button[type='button']");
const inputWrapper = document.querySelector('#zero-num');
const custom = document.querySelector('.custom');

let selectedTip = 0;

custom.addEventListener('input', () => {
  const value = Number(custom.value);

  if (value > 0) {
    custom.classList.add('active');
    tipsBtn.forEach((btn) => btn.classList.remove('active'));
    selectedTip = value;
    calculate();
  } else {
    custom.classList.remove('active');
    selectedTip = 0;
    calculate();
  }
});

tipsBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    tipsBtn.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    custom.classList.remove('active');
    selectedTip = parseFloat(btn.textContent.replace('%', ''));
    calculate();
  });
});

numInput.addEventListener('input', () => {
 if (window.innerWidth > 400) {
    numInput.style.cssText = `
    font-size: 20px;
    color: rgb(0, 71, 75);
    font-weight: bold;
    text-align: right;
    padding-right: 10px;
  `;
  }else{
      numInput.style.cssText = `
    font-size: 17px;
    color: rgb(0, 71, 75);
    font-weight: bold;
    text-align: right;
    padding-right: 10px;
  `;
  }

  const value = Number(numInput.value);
  if (value > 0) {
    inputWrapper.classList.remove('zero');
  } else {
    inputWrapper.classList.add('zero');
  }

  calculate();
});

billInput.addEventListener('input', () => {
  if (window.innerWidth > 400) {
    billInput.style.cssText = `
    font-size: 20px;
    color: rgb(0, 71, 75);
    font-weight: bold;
    text-align: right;
    padding-right: 10px;
  `;
  }else{
      billInput.style.cssText = `
    font-size: 17px;
    color: rgb(0, 71, 75);
    font-weight: bold;
    text-align: right;
    padding-right: 10px;
  `;
  }
  calculate();
});

function calculate() {
  const billValue = parseFloat(billInput.value);
  const numValue = parseFloat(numInput.value);

  if (!isNaN(billValue) && selectedTip > 0 && numValue > 0) {
    let tip = (selectedTip / 100) * billValue;
    let total = tip + billValue;

    tip /= numValue;
    total /= numValue;

    tipAmount.textContent = `$${tip.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;
  } else {
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';
  }
}

restBtn.addEventListener('click', () => {
  billInput.value = '';
  numInput.value = '';
  custom.value = '';
  tipAmount.textContent = '$0.00';
  totalAmount.textContent = '$0.00';
  tipsBtn.forEach((b) => b.classList.remove('active'));
  custom.classList.remove('active');
  selectedTip = 0;
  inputWrapper.classList.remove('zero');
});
