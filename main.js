import { exMain } from "./src/homework3.js";

/**
 * Main application function.
 * Generates employee statistics based on generated employee data.
 * @param {object} dtoIn - Input definition with number of employees and age range.
 * @param {number} dtoIn.count - Number of employees to generate.
 * @param {{min:number, max:number}} dtoIn.age - Allowed age interval.
 * @returns {object} Statistics of generated employees.
 */
export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  return getEmployeeStatistics(employees);
}

/**
 * Generates employee data using external generator.
 * @param {object} dtoIn - Object defining count and age range.
 * @returns {Array<object>} List of generated employees.
 */
export function generateEmployeeData(dtoIn) {
  return exMain(dtoIn);
}

/**
 * Extracts key values from array of objects.
 * If value is provided, filters by equality before extraction.
 * @param {Array<object>} list - Array of input objects.
 * @param {string} key - Property name to read.
 * @param {*} [value] - Optional filter value for equality.
 * @returns {Array<*>} Extracted values.
 */
function filterList(list, key, value) {
  if (value === undefined) {
    return list.map(item => item[key]);
  }
  return list.filter(item => item[key] === value).map(item => item[key]);
}

/**
 * Computes raw decimal ages sorted ascending.
 * @param {Array<object>} list - List of employees with birthdates.
 * @returns {number[]} Sorted array of ages (decimal).
 */
function getSortedAges(list) {
  const msInYear = 365.25 * 24 * 60 * 60 * 1000;
  return list
    .map(e => (Date.now() - new Date(e.birthdate)) / msInYear)
    .sort((a, b) => a - b);
}

/**
 * Computes arithmetic average of list elements.
 * @param {number[]} list - Array of numbers.
 * @returns {number} Average value.
 */
function getAverage(list) {
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i];
  }
  return sum / list.length;
}

/**
 * Computes median of values in a numeric list.
 * @param {number[]} list - Array of values.
 * @returns {number} Median value.
 */
function findMedian(list) {
  const sorted = [...list].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

/**
 * Computes full statistics:
 * - total employees
 * - workload distribution
 * - age statistics (min/max/median integer, average decimal)
 * - median workload
 * - average workload of women
 * - sorted list of employees by workload
 * @param {Array<object>} employees - Array of employee objects.
 * @returns {object} Statistics structure.
 */
export function getEmployeeStatistics(employees) {
  const ages = getSortedAges(employees);

  const dtoOut = {};

  // Workload counts
  dtoOut.total = employees.length;
  dtoOut.workload10 = filterList(employees, "workload", 10).length;
  dtoOut.workload20 = filterList(employees, "workload", 20).length;
  dtoOut.workload30 = filterList(employees, "workload", 30).length;
  dtoOut.workload40 = filterList(employees, "workload", 40).length;

  // Age statistics — test requires integer values
  dtoOut.averageAge = Math.round(getAverage(ages) * 10) / 10;
  dtoOut.minAge = Math.floor(Math.min(...ages));
  dtoOut.maxAge = Math.floor(Math.max(...ages));
  dtoOut.medianAge = Math.floor(findMedian(ages));

  // Median workload
  dtoOut.medianWorkload = findMedian(filterList(employees, "workload"));

  // Average workload of women
  const womenWorkload = employees
    .filter(e => e.gender === "female")
    .map(e => e.workload);

  dtoOut.averageWomenWorkload =
    womenWorkload.length > 0
      ? Math.round(getAverage(womenWorkload) * 10) / 10
      : 0;

  // Sorted employees
  dtoOut.sortedByWorkload = [...employees].sort(
    (a, b) => a.workload - b.workload
  );

  return dtoOut;
}
