import { exMain } from './src/homework3.js';

/**
 * Main application function.
 * Generates statistics for employees created by generateEmployeeData().
 *
 * @param {object} dtoIn - Input definition used in task 3 (count, age range).
 * @returns {object} Statistics of employees.
 */
export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  const dtoOut = getEmployeeStatistics(employees);
  return dtoOut;
}

/**
 * Generates employee data using external generator from task 3.
 *
 * @param {object} dtoIn
 * @returns {Array<object>}
 */
export function generateEmployeeData(dtoIn) {
  return exMain(dtoIn);
}

/**
 * Extracts values of the given key from list.
 *
 * @param {Array<object>} list
 * @param {string} key
 * @param {*} [value]
 * @returns {Array<*>}
 */
function filterList(list, key, value) {
  if (value === undefined) {
    return list.map(item => item[key]);
  }

  return list.filter(item => item[key] === value).map(item => item[key]);
}

/**
 * Computes RAW decimal ages sorted ascending.
 *
 * @param {Array<object>} list
 * @returns {number[]}
 */
function getSortedAges(list) {
  const msInYear = 365.25 * 24 * 60 * 60 * 1000;

  return list
    .map(e => (Date.now() - new Date(e.birthdate)) / msInYear)
    .sort((a, b) => a - b);
}

/**
 * Computes average of list.
 *
 * @param {number[]} list
 * @returns {number}
 */
function getAverage(list) {
  let sum = 0;
  for (let i = 0; i < list.length; i++) sum += list[i];
  return sum / list.length;
}

/**
 * Computes median.
 *
 * @param {number[]} list
 * @returns {number}
 */
function findMedian(list) {
  const sorted = [...list].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    return sorted[mid];
  }
}

/**
 * Computes all required employee statistics.
 *
 * @param {Array<object>} employees
 * @returns {object}
 */
export function getEmployeeStatistics(employees) {
  const ageList = getSortedAges(employees);

  let dtoOut = {};
  dtoOut.total = employees.length;

  dtoOut.workload10 = filterList(employees, "workload", 10).length;
  dtoOut.workload20 = filterList(employees, "workload", 20).length;
  dtoOut.workload30 = filterList(employees, "workload", 30).length;
  dtoOut.workload40 = filterList(employees, "workload", 40).length;

  dtoOut.averageAge = Math.round(getAverage(ageList) * 10) / 10;
  dtoOut.minAge = Math.round(Math.min(...ageList));
  dtoOut.maxAge = Math.round(Math.max(...ageList));
  dtoOut.medianAge = Math.round(findMedian(ageList));

  dtoOut.medianWorkload = findMedian(filterList(employees, "workload"));

  const womenWorkload = employees
    .filter(e => e.gender === "female")
    .map(e => e.workload);

  dtoOut.averageWomenWorkload =
    womenWorkload.length > 0
      ? Math.round(getAverage(womenWorkload) * 10) / 10
      : 0;

  dtoOut.sortedByWorkload = [...employees].sort(
    (a, b) => a.workload - b.workload
  );

  return dtoOut;
}
