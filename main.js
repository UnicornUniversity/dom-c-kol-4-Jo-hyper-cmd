import { exMain } from "./src/homework3.js";

/**
 * Main application function.
 * Generates statistics for employees created using generateEmployeeData().
 *
 * @param {object} dtoIn - Input definition for task: number of employees and an age range.
 * @param {number} dtoIn.count - Number of employees to generate.
 * @param {{min:number, max:number}} dtoIn.age - Allowed age range.
 * @returns {object} Statistics of generated employees.
 */
export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  return getEmployeeStatistics(employees);
}

/**
 * Generates employee data using external generator from task 3.
 *
 * @param {object} dtoIn - Input object containing count and age range.
 * @returns {Array<object>} Array of generated employee objects.
 */
export function generateEmployeeData(dtoIn) {
  return exMain(dtoIn);
}

/**
 * Extracts values of the given key from a list of objects.
 * If value is provided, returns only items where object[key] === value.
 *
 * @param {Array<object>} list - List of objects to process.
 * @param {string} key - Name of the property to extract.
 * @param {*} [value] - Optional filter value.
 * @returns {Array<*>} Array of extracted values.
 */
function filterList(list, key, value) {
  if (value === undefined) {
    return list.map(item => item[key]);
  }
  return list.filter(item => item[key] === value).map(item => item[key]);
}

/**
 * Computes sorted raw ages (decimal) of employees from their birthdates.
 *
 * @param {Array<object>} list - List of employee objects.
 * @returns {number[]} Sorted array of raw (decimal) ages.
 */
function getSortedAges(list) {
  const msInYear = 365.25 * 24 * 60 * 60 * 1000;

  return list
    .map(e => (Date.now() - new Date(e.birthdate)) / msInYear)
    .sort((a, b) => a - b);
}

/**
 * Computes the average of a numeric list.
 *
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
 * Computes median of a numeric list.
 *
 * @param {number[]} list - List of numeric values.
 * @returns {number} Median value.
 */
function findMedian(list) {
  list = [...list].sort((a, b) => a - b);
  const mid = Math.floor(list.length / 2);

  if (list.length % 2 === 0) {
    return (list[mid - 1] + list[mid]) / 2;
  }
  return list[mid];
}

/**
 * Computes complete statistics required in task 4:
 * - total employee count
 * - counts for each workload
 * - min / max / average / median age
 * - median workload
 * - average workload of women
 * - employees sorted by workload
 *
 * @param {Array<object>} employees - Array of employee objects.
 * @returns {object} Statistics object.
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

  // Age statistics — tests require integer values except averageAge
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

  // Sorted employee list
  dtoOut.sortedByWorkload = [...employees].sort(
    (a, b) => a.workload - b.workload
  );

  return dtoOut;
}
