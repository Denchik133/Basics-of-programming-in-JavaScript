console.log('=== Різні методи консолі ===');
console.log('Це звичайне повідомлення');
console.error('Це повідомлення про помилку');
console.warn('Це попередження');
console.info('Це інформаційне повідомлення');
console.log('Число:', 42, 'Рядок:', 'Hello', 'Boolean:', true);

const student = {
    name: 'Іван Петренко',
    age: 20,
    course: 1,
    specialty: 'Інженерія ПЗ'
};
console.log('Студент:', student);
console.table(student);
console.dir(student);

console.group('Група повідомлень');
console.log('Повідомлення 1');
console.log('Повідомлення 2');
console.log('Повідомлення 3');
console.groupEnd();
console.groupCollapsed('Згорнута група');
console.log('Це приховано за замовчуванням');
console.groupEnd();

console.time('Цикл');
for (let i = 0; i < 1000000; i++) {

}
console.timeEnd('Цикл');

let score = 75;
console.assert(score >= 90, 'Оцінка недостатньо висока');
console.assert(score >= 50, 'Оцінка прийнятна');