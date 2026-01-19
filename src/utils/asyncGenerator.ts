export default async function* asyncGenerator(start, iterations) {
    let i = start;
    // If number is -1, generate infinite records
    if (iterations === -1) {
        while (true) {
            yield i;
            i++;
        }
    } else {
        for (i; i < start + iterations; i++) {
            yield i;
        }
    }
}
