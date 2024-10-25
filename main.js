const assert = require("assert");

function countBatteriesByHealth(presentCapacities) {
    const rated_Capacity = 120;

    let counts = {
        healthy: 0,
        exchange: 0,
        failed: 0,
    };

    for (let capacity of presentCapacities) {
        const soh = (capacity / rated_Capacity) * 100;
        if (soh > 83) {
            counts.healthy += 1;
        } else if (soh >= 63) {
            counts.exchange += 1;
        } else {
            counts.failed += 1;
        }
    }
    return counts;
}

function testBucketingByHealth() {
    console.log("Counting batteries by SoH...");
    let presentCapacities = [113, 116, 80, 95, 92, 70]; // Changed the const variable to let for making more test cases.
    counts = countBatteriesByHealth(presentCapacities);
    assert(counts["healthy"] == 2);
    assert(counts["exchange"] == 3);
    assert(counts["failed"] == 1);
    console.log("Done counting :)");

    // Edge Case 1: All batteries at healthy boundary (83.01%)
    presentCapacities = [99.612];
    counts = countBatteriesByHealth(presentCapacities);
    assert(counts.healthy === 1);
    assert(counts.exchange === 0);
    assert(counts.failed === 0);

    // Edge Case 2: Exactly at exchange boundary (63%)
    presentCapacities = [75.6];
    counts = countBatteriesByHealth(presentCapacities);
    assert(counts.healthy === 0);
    assert(counts.exchange === 1);
    assert(counts.failed === 0);

    // Edge Case 3: Just below exchange boundary (62.99%)
    presentCapacities = [75.588];
    counts = countBatteriesByHealth(presentCapacities);
    assert(counts.healthy === 0);
    assert(counts.exchange === 0);
    assert(counts.failed === 1);

    // Edge Case 4: All batteries failed (capacity < 63%)
    presentCapacities = [70, 60, 50];
    counts = countBatteriesByHealth(presentCapacities);
    assert(counts.healthy === 0);
    assert(counts.exchange === 0);
    assert(counts.failed === 3);

    // Edge Case 5: All batteries healthy (capacity > 83%)
    presentCapacities = [110, 115, 119];
    counts = countBatteriesByHealth(presentCapacities);
    assert(counts.healthy === 3);
    assert(counts.exchange === 0);
    assert(counts.failed === 0);

    // Edge Case 6: No batteries in input (empty array)
    presentCapacities = [];
    counts = countBatteriesByHealth(presentCapacities);
    assert(counts.healthy === 0);
    assert(counts.exchange === 0);
    assert(counts.failed === 0);

    console.log("All tests passed!");
}

testBucketingByHealth();
