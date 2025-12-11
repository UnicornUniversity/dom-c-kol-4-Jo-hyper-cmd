/**
 * List of Slovak male first names.
 * @type {string[]}
 */
const maleNames = [
  "Ján", "Andrej", "Peter", "František", "Martin",
  "Lukáš", "Patrik", "Jozef", "Michal", "Samuel",
];

/**
 * List of Slovak male surnames.
 * @type {string[]}
 */
const maleSurnames = [
  "Novák", "Kováč", "Horváth", "Novotný", "Ševčík",
  "Benko", "Hriň", "Ďurica", "Vavrek", "Kmeť",
];

/**
 * List of Slovak female first names.
 * @type {string[]}
 */
const femaleNames = [
  "Anna", "Mária", "Jana", "Petra", "Tamara",
  "Andrea", "Monika", "Katarína", "Nina", "Alena",
];

/**
 * List of Slovak female surnames.
 * @type {string[]}
 */
const femaleSurnames = [
  "Holubová", "Zubáčová", "Tóthová", "Repková", "Šoltýsová",
  "Bartošová", "Špirková", "Gajdošová", "Muráriková", "Kocúriková",
];

/**
 * Supported workloads.
 * @type {number[]}
 */
const workLoad = [10, 20, 30, 40];

/**
 * Supported gender identifiers.
 * @type {string[]}
 */
const listOfGenders = ["male", "female"];

/**
 * Selects random element from a list.
 * @param {Array<*>} list - List to select from.
 * @returns {*} Random element.
 */
function getRandomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Generates random birthdate based on age range.
 * @param {{min:number, max:number}} ageRange - Minimum and maximum age.
 * @returns {string} ISO birthdate.
 */
function getRandomAge(ageRange) {
  const msInYear = 365.25 * 24 * 60 * 60 * 1000;
  const age = ageRange.min + Math.random() * (ageRange.max - ageRange.min);
  return new Date(Date.now() - age * msInYear).toISOString();
}

/**
 * Generates list of employees based on count and age range.
 * @param {number} count - Number of employees to generate.
 * @param {{min:number, max:number}} ageRange - Minimum and maximum age.
 * @returns {Array<object>} Generated employee records.
 */
function generateRandomEmployees(count, ageRange) {
  const listOfEmployees = [];

  for (let i = 0; i < count; i++) {
    const gender = getRandomFromList(listOfGenders);
    const names = gender === "male" ? maleNames : femaleNames;
    const surnames = gender === "male" ? maleSurnames : femaleSurnames;

    listOfEmployees.push({
      gender,
      birthdate: getRandomAge(ageRange),
      name: getRandomFromList(names),
      surname: getRandomFromList(surnames),
      workload: getRandomFromList(workLoad),
    });
  }

  return listOfEmployees;
}

/**
 * Main function for generating employees (used by main.js).
 * @param {{count:number, age:{min:number, max:number}}} dtoIn - Input parameters.
 * @returns {Array<object>} List of employees.
 */
export function exMain(dtoIn) {
  return generateRandomEmployees(dtoIn.count, dtoIn.age);
}
