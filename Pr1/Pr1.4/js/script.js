console.log('\n=== Рядки ===');

let university = 'МНТУ ім. Ю. Бугая';
let faculty = 'Факультет інформаційних технологій';
let specialty = 'Інженерія програмного забезпечення';

let sentence = `Я навчаюсь у ${university}, ${faculty}, спеціальність — ${specialty}`;
console.log(sentence);

console.log('Довжина назви університету:', university.length);
console.log('Верхній регістр факультету:', faculty.toUpperCase());
console.log('Нижній регістр спеціальності:', specialty.toLowerCase());
console.log('Перші 10 символів університету:', university.slice(0, 10));
console.log('Чи містить факультет слово "інформаційних":', faculty.includes('інформаційних'));