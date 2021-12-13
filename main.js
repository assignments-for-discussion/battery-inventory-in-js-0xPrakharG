const assert = require('assert');

function countBatteriesByUsage() {
  return {
    lowCount: 0,
    mediumCount: 0,
    highCount: 0
  };
}

function testBucketingByNumberOfCycles() {
  console.log('Counting batteries by usage cycles...')
  counts = countBatteriesByUsage([100, 300, 500, 600, 900, 1000]);
  assert(counts["lowCount"] == 1);
  assert(counts["mediumCount"] == 3);
  assert(counts["highCount"] == 2);
  console.log("Done counting :)");
}

testBucketingByNumberOfCycles();
