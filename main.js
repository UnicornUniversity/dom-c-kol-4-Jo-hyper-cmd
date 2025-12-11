import { exMain } from './src/homework3.js'

/**
 * Main application function.
 * Generates statistics for employees created by generateEmployeeData().
 *
 * @param {object} dtoIn - Input definition used in task 3 (count, age range).
 * @returns {object} Statistics of employees (see getEmployeeStatistics()).
 */
export function main(dtoIn) {
  let dtoOut = getEmployeeStatistics();
  return dtoOut;
}

/**
 * Generates employee data using external generator from task 3.
 *
 * @param {object} dtoIn - Object containing:
 * @param {number} dtoIn.count - Number of employees to generate.
 * @param {{min:number, max:number}} dtoIn.age - Allowed age range.
 * @returns {Array<object>} Array of employee objects.
 */
export function generateEmployeeData(dtoIn) {
  let dtoOut = exMain(dtoIn);
  return dtoOut;
}

const employees = generateEmployeeData(dtoIn);

/**
 * Extracts values of the given key from list.
 * If value is provided, returns only items matching key === value.
 *
 * @param {Array<object>} list - Array of objects.
 * @param {string} key - Key to extract from objects.
 * @param {*} [value] - Optional value for filtering.
 * @returns {Array<*>} Array of extracted values.
 */
function filterList(list, key, value) {
  if (value === undefined) {
    return list.map(item => item[key]);
  }

  const filteredList = list.filter(item => item[key] === value);
  return filteredList.map(item => item[key]);
}

/**
 * Computes RAW ages (non-rounded) based on birthdates.
 * Ages remain decimal values and are sorted ascending.
 *
 * @param {Array<object>} list - Array of employees.
 * @returns {number[]} Sorted array of raw ages.
 */
function getSortedAges(list) {
  const msInYear = 365.25 * 24 * 60 * 60 * 1000;

  return filterList(list, "birthdate")
    .map(d => (Date.now() - new Date(d)) / msInYear) // RAW decimal age
    .sort((a, b) => a - b);
}

const ageList = getSortedAges(employees);

/**
 * Computes average of a numeric list (not rounded).
 *
 * @param {number[]} list - List of numbers.
 * @returns {number} Average value.
 */
function getAverage(list) {
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i];
  }
  let average = sum / list.length;
  return average;
}

/**
 * Computes median of a numeric list.
 *
 * @param {number[]} list - Array of numeric values.
 * @returns {number} Median (not rounded).
 */
function findMedian(list) {
  list.sort((a, b) => a - b);
  const middleIndex = Math.floor(list.length / 2);

  if (list.length % 2 === 0) {
    return (list[middleIndex - 1] + list[middleIndex]) / 2;
  } else {
    return list[middleIndex];
  }
}

/**
 * Computes a full set of statistics required in task 4:
 * - total employee count
 * - counts for each workload (10,20,30,40)
 * - min/max/average/median age
 * - median workload
 * - average workload of women
 * - employees sorted by workload
 *
 * @returns {object} Statistics object with computed values.
 */
export function getEmployeeStatistics() {
  let dtoOut = {};

  // workload counts
  dtoOut.total = employees.length;
  dtoOut.workload10 = filterList(employees, "workload", 10).length;
  dtoOut.workload20 = filterList(employees, "workload", 20).length;
  dtoOut.workload30 = filterList(employees, "workload", 30).length;
  dtoOut.workload40 = filterList(employees, "workload", 40).length;

  // Age statistics
  dtoOut.averageAge = Math.round(getAverage(ageList) * 10) / 10;      // One decimal
  dtoOut.minAge = Math.round(Math.min(...ageList));                   // Integer
  dtoOut.maxAge = Math.round(Math.max(...ageList));                   // Integer
  dtoOut.medianAge = Math.round(findMedian([...ageList]));            // Integer

  // Workload median
  dtoOut.medianWorkload = findMedian(filterList(employees, "workload"));

  // Women's workload
  const womenWorkload = employees
    .filter(e => e.gender === "female")
    .map(e => e.workload);

  dtoOut.averageWomenWorkload =
    womenWorkload.length > 0
      ? Math.round(getAverage(womenWorkload) * 10) / 10
      : 0;

  // Sorted list – non-mutating
  dtoOut.sortedByWorkload = [...employees].sort(
    (a, b) => a.workload - b.workload
  );

  return dtoOut;
}