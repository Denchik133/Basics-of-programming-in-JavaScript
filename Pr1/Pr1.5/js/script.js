console.log('\n=== Практичні обчислення ===');

let width = 10;
let height = 5;
let rectangleArea = width * height;
let rectanglePerimeter = 2 * (width + height);
console.log('Площа прямокутника:', rectangleArea);
console.log('Периметр прямокутника:', rectanglePerimeter);

let r = 3;
let h = 7;
let cylinderVolume = Math.PI * Math.pow(r, 2) * h;
console.log('Обʼєм циліндра:', cylinderVolume.toFixed(2));

console.log('Випадкові числа (1-100):');
for (let i = 0; i < 5; i++) {
  let randomNum = Math.floor(Math.random() * 100) + 1;
  console.log(randomNum);
}

let completed = 8;
let total = 10;
let percent = (completed / total) * 100;
console.log('Відсоток виконання:', percent + '%');