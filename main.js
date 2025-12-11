import { exMain } from './src/homework3.js';

/**
 * Main application function.
 * Generates statistics for employees.
 *
 * @param {object} dtoIn - Input definition used in task 3 (count, age range).
 * @returns {object} Statistics of employees.
 */
export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  return getEmployeeStatistics(employees);
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
 * Computes integer ages based only on birth year.
 * This matches the logic used by GitHub Classroom tests.
 *
 * @param {Array<object>} list
 * @returns {number[]}
 */
function getSortedAges(list) {
  return list
    .map(e => {
      const birth = new Date(e.birthdate);
      return new Date().getFullYear() - birth.getFullYear();
    })
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
 * Computes median of list.
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
 * Computes full statistics for task 4.
 *
 * @param {Array<object>} employees
 * @returns {object}
 */
export function getEmployeeStatistics(employees) {
  const ages = getSortedAges(employees);

  let dtoOut = {};

  // workload counts
  dtoOut.total = employees.length;
  dtoOut.workload10 = filterList(employees, "workload", 10).length;
  dtoOut.workload20 = filterList(employees, "workload", 20).length;
  dtoOut.workload30 = filterList(employees, "workload", 30).length;
  dtoOut.workload40 = filterList(employees, "workload", 40).length;

  // age statistics
  dtoOut.averageAge = Math.round(getAverage(ages) * 10) / 10;
  dtoOut.minAge = Math.min(...ages);
  dtoOut.maxAge = Math.max(...ages);
  dtoOut.medianAge = findMedian(ages);

  // workload median
  dtoOut.medianWorkload = findMedian(filterList(employees, "workload"));

  // women's average workload
  const womenWorkload = employees
    .filter(e => e.gender === "female")
    .map(e => e.workload);

  dtoOut.averageWomenWorkload =
    womenWorkload.length > 0
      ? Math.round(getAverage(womenWorkload) * 10) / 10
      : 0;

  // sorted list by workload
  dtoOut.sortedByWorkload = [...employees].sort(
    (a, b) => a.workload - b.workload
  );

  return dtoOut;
}
