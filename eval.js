const { readFileSync } = require("fs");

async function benchmark() {

    console.log("Starting benchmark.");
    console.log();

    let imports = {
        env: {
            memory: new WebAssembly.Memory({initial: 2}),
        },
    };

    let module = await WebAssembly.instantiate(readFileSync('out.wasm'), imports);
    let func = module.instance.exports.eval

    var times = [];

    for (let i = 0; i < 100; i++) {
        const t0 = now();
        const result = func();
        const dt = now() - t0;
        times.push(dt);
    }


    report("Latency Results (µs)", times);
}

function report(note, times) {
    console.log(note);
    console.log(" min:", Math.min(...times));
    console.log(" max:", Math.max(...times));
    console.log(" mean:", mean(times));
    console.log(" median:", quantile(times, 50));
    console.log(" 90th:", quantile(times, 50));
    console.log(" 95th:", quantile(times, 95));
    console.log(" 99th:", quantile(times, 99));
}

function now() {
    const [sec, nsec] = process.hrtime();
    return (sec * 1000 * 1000) + (nsec / 1000);
}

function mean(arr) {
    var sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum/arr.length;
}

function sortNumber(a, b) {
	return a - b;
}

function quantile(arr, percentile) {
    arr.sort(sortNumber);
    index = percentile/100. * (arr.length-1);
    if (Math.floor(index) == index) {
        result = arr[index];
    } else {
        i = Math.floor(index)
        fraction = index - i;
        result = arr[i] + (arr[i+1] - arr[i]) * fraction;
    }
    return result;
}


benchmark();
