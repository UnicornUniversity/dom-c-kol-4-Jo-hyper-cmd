/**
 * List of Slovak male first names.
 * @type {string[]}
 */
const maleNames = [
  'Ján',
  'Andrej',
  'Peter',
  'František',
  'Martin',
  'Lukáš',
  'Patrik',
  'Jozef',
  'Michal',
  'Samuel',
];

/**
 * List of Slovak male surnames.
 * @type {string[]}
 */
const maleSurnames = [
  'Novák',
  'Kováč',
  'Horváth',
  'Novotný',
  'Ševčík',
  'Benko',
  'Hriň',
  'Ďurica',
  'Vavrek',
  'Kmeť',
];

/**
 * List of Slovak female first names.
 * @type {string[]}
 */
const femaleNames = [
  'Anna',
  'Mária',
  'Jana',
  'Petra',
  'Tamara',
  'Andrea',
  'Monika',
  'Katarína',
  'Nina',
  'Alena',
];

/**
 * List of Slovak female surnames.
 * @type {string[]}
 */
const femaleSurnames = [
  'Holubová',
  'Zubáčová',
  'Tóthová',
  'Repková',
  'Šoltýsová',
  'Bartošová',
  'Špirková',
  'Gajdošová',
  'Muráriková',
  'Kocúriková',
];

/**
 * Supported workloads.
 * @type {number[]}
 */
const workLoad = [10, 20, 30, 40];

/**
 * Supported genders.
 * @type {string[]}
 */
const listOfGenders = ['male', 'female'];

/**
 * Randomly selects an item from a list.
 * @param {Array<*>} list - List of values.
 * @returns {*} Randomly selected value.
 */
function getRandomFromList(list) {
  let randomSelection = Math.floor(Math.random() * list.length);
  return list[randomSelection];
}

/**
 * Randomly generates birthdate based on age range.
 * @param {{min:number, max:number}} ageRange - Age limits.
 * @returns {string} ISO birthdate.
 */
function getRandomAge(ageRange) {
  const msInYear = 365.25 * 24 * 60 * 60 * 1000;
  const age = ageRange.min + Math.random() * (ageRange.max - ageRange.min);
  let birthdate = new Date(Date.now() - age * msInYear);
  return birthdate.toISOString();
}

/**
 * Randomly generates list of employees.
 * @param {number} count - Number of employees to generate.
 * @param {{min:number, max:number}} ageRange - Min/max age.
 * @returns {Array<object>} List of employee objects.
 */
function generateRandomEmployees(count, ageRange) {
  let listOfEmployees = [];

  for (let i = 0; i < count; i++) {
    let employee = {};

    employee.gender = getRandomFromList(listOfGenders);

    const names = employee.gender === 'male' ? maleNames : femaleNames;
    const surnames = employee.gender === 'male' ? maleSurnames : femaleSurnames;

    employee.birthdate = getRandomAge(ageRange);
    employee.name = getRandomFromList(names);
    employee.surname = getRandomFromList(surnames);
    employee.workload = getRandomFromList(workLoad);

    listOfEmployees.push(employee);
  }

  return listOfEmployees;
}

/**
 * Main export function (formerly main()).
 * Generates list of employees.
 *
 * @param {{count:number, age:{min:number, max:number}}} dtoIn - Input parameters.
 * @returns {Array<object>} Generated list of employees.
 */
export function exMain(dtoIn) {
  let dtoOut = generateRandomEmployees(dtoIn.count, dtoIn.age);
  return dtoOut;
}
