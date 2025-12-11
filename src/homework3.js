/**
 * The main function which calls the application.
 * Please, add specific description here for the application purpose.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */

//lists of male names & surnames
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

// lists of female names & surnames
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

const workLoad = [10, 20, 30, 40];
const listOfGenders = ['male', 'female'];

/**
 * Randomly selects an item from a list.
 * @param {Array} list  - list of items to select from.
 */

function getRandomFromList(list) {
  let randomSelection = Math.floor(Math.random() * list.length);
  let randomResult = list[randomSelection];
  return randomResult;
}

/**
 * Randomly generates a birthdate based on age range.
 * @param {object} ageRange  - age range object with min and max properties.
 */

function getRandomAge(ageRange) {
  const msInYear = 365.25 * 24 * 60 * 60 * 1000;

  let age = ageRange.min + Math.random() * (ageRange.max - ageRange.min);

  let ageMs = age * msInYear;

  let birthdate = new Date(Date.now() - ageMs);

  return birthdate.toISOString();
}


/**
 * Randomly generates a list of employees.
 * @param {number} count  - number of employees to generate.
 * @param {object} ageRange  - age range object with min and max properties.
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
 * Main function which calls the application.
 * @param {object} dtoIn  - input data object with count and age properties.
 * @returns {Array}  - list of generated employees.
 */

export function exMain(dtoIn) {
  let dtoOut = generateRandomEmployees(dtoIn.count, dtoIn.age);
  return dtoOut;
}
