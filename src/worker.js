export default () => {
    self.addEventListener("message", e => { /* eslint-disable-line no-restricted-globals */
        if (!e) return;
        console.log(e.data,"---------workerjs")
        const processedData = [];
        for (let i = 0; i < e.data.count; i++) {
            let sum = 0;
            for (let j = 0; j < 100000; j++) {
                sum += Math.sqrt(j);
            }
            processedData.push({
                id: i,
                name: `User-${i}`,
                processedValue: Math.round(sum)
            });
        }
        postMessage(processedData);
    })
}

