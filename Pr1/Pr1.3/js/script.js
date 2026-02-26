console.log('\n=== Змінні ===');

let studentName = 'Клименко Денис';
let age = 18;
let group = 'ІПЗ-11';
let averageScore = 4.2;
let isStudent = true;

console.log('Імʼя:', studentName, '| Тип:', typeof studentName);
console.log('Вік:', age, '| Тип:', typeof age);
console.log('Група:', group, '| Тип:', typeof group);
console.log('Середній бал:', averageScore, '| Тип:', typeof averageScore);
console.log('Студент:', isStudent, '| Тип:', typeof isStudent);

age = 52;
console.log('Новий вік:', age);

const PI = 3.14159;
const MAX_STUDENTS = 30;
const UNIVERSITY_NAME = 'МНТУ ім. Ю. Бугая';

console.log('PI:', PI);
console.log('Максимум студентів:', MAX_STUDENTS);
console.log('Університет:', UNIVERSITY_NAME);

console.log('\n=== Типи даних ===');

let integerNumber = 42;
let floatNumber = 3.14;
let negativeNumber = -10;

console.log('Ціле число:', integerNumber, typeof integerNumber);
console.log('Дробове число:', floatNumber, typeof floatNumber);
console.log('Від\'ємне число:', negativeNumber, typeof negativeNumber);

let singleQuotes = 'Рядок в одинарних лапках';
let doubleQuotes = "Рядок в подвійних лапках";
let templateLiteral = `Шаблонний рядок`;

console.log(singleQuotes, typeof singleQuotes);
console.log(doubleQuotes, typeof doubleQuotes);
console.log(templateLiteral, typeof templateLiteral);

let isOnline = true;
let hasAccess = false;

console.log('Online:', isOnline, typeof isOnline);
console.log('Access:', hasAccess, typeof hasAccess);

let notDefined;
console.log('Not defined:', notDefined, typeof notDefined);

let emptyValue = null;
console.log('Empty:', emptyValue, typeof emptyValue);

let infinity = Infinity;
let notANumber = NaN;

console.log('Infinity:', infinity);
console.log('NaN:', notANumber);
console.log('5 / 0 =', 5 / 0);
console.log('"text" * 2 =', 'text' * 2);

console.log('\n=== Перетворення типів ===');

let ageAsString = String(age);
console.log('String(age):', ageAsString, typeof ageAsString);
// Явне перетворення числа у рядок

let scoreAsNumber = Number('5');
console.log('Number("5"):', scoreAsNumber, typeof scoreAsNumber);
// Явне перетворення рядка у число

let result1 = '10' + 5;
console.log('"10" + 5 =', result1, typeof result1);
// Неявне перетворення числа у рядок

let result2 = '10' - 5;
console.log('"10" - 5 =', result2, typeof result2);
// Неявне перетворення рядка у число

let isPassed = Boolean(averageScore);
console.log('Boolean(averageScore):', isPassed, typeof isPassed);
// Перетворення значення у boolean