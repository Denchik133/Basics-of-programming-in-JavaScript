console.log('\n=== Інтерактивна програма ===');

if (confirm('Запустити інтерактивну програму?')) {
  let userName = prompt('Як вас звуть?', 'Ім\'я');
  if (userName) {
    alert(`Вітаємо, ${userName}!`);
    console.log(`Користувач: ${userName}`);
    let num1 = parseFloat(prompt('Введіть перше число:', '0'));
    let num2 = parseFloat(prompt('Введіть друге число:', '0'));
    if (!isNaN(num1) && !isNaN(num2)) {
      let resultSum = num1 + num2;
      let resultMult = num1 * num2;
      let message = `Результати обчислень: ${num1} + ${num2} = ${resultSum} ${num1} × ${num2} = ${resultMult}`;
      alert(message);
      console.log(message);
    } else {
      alert('Помилка: введені некоректні числа');
    }
  }
}

const calculateButton = document.getElementById('calculateAge');
const birthYearInput = document.getElementById('birthYear');
const ageResultDiv = document.getElementById('ageResult');

calculateButton.addEventListener('click', function() {
  const birthYear = parseInt(birthYearInput.value);
  console.log('Тест введеного року:', birthYear);
  if (isNaN(birthYear)) {
    ageResultDiv.textContent = 'Будь ласка, введіть коректний рік народження';
    ageResultDiv.style.color = '#dc3545';
    console.log('Помилка: не число');
    return;
  }
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  if (age < 0) {
    ageResultDiv.textContent = 'Рік народження не може бути в майбутньому';
    ageResultDiv.style.color = '#dc3545';
    console.log('Тест: майбутній рік');
  } else if (age > 150) {
    ageResultDiv.textContent = 'Будь ласка, введіть реальний рік народження';
    ageResultDiv.style.color = '#dc3545';
    console.log('Тест: занадто великий вік');
  } else {
    ageResultDiv.textContent = `Вам ${age} років`;
    ageResultDiv.style.color = '#667eea';
    console.log(`Розраховано вік: ${age}`);
  }
});

const convertButton = document.getElementById('convertTemp');
const tempInput = document.getElementById('tempValue');
const tempResult = document.getElementById('tempResult');

convertButton.addEventListener('click', function() {
  let celsius = parseFloat(tempInput.value);
  if (isNaN(celsius)) {
    tempResult.textContent = 'Введіть коректну температуру';
    tempResult.style.color = '#dc3545';
    return;
  }
  let fahrenheit = (celsius * 9/5) + 32;
  tempResult.textContent = `${celsius}°C = ${fahrenheit.toFixed(2)}°F`;
  tempResult.style.color = '#667eea';
  console.log(`Конвертація температури: ${celsius}C -> ${fahrenheit}F`);
});