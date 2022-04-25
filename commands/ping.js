const os = require("os");
let util = require("util");
const speedd = require('performance-now');
let {
	performance
} = require("perf_hooks");
let {
	sizeFormatter
} = require("human-readable");
const speed = require("performance-now");
const {toTimer} = require('../lib/tools')
module.exports = {
    name: ['ping'],
    cmd: ['ping'],
	category: 'other',
    async handler(msg, {conn}) {
        const used = process.memoryUsage();
		const cpus = os.cpus()
			.map((cpu) => {
				cpu.total = Object.keys(cpu.times)
					.reduce(
						(last, type) => last + cpu.times[type], 0);
				return cpu;
			});
		const formatp = sizeFormatter({
			std: "JEDEC", //'SI' = default | 'IEC' | 'JEDEC'
			decimalPlaces: 2,
			keepTrailingZeroes: false,
			render: (literal, symbol) => `${literal} ${symbol}B`,
		});
		const cpu = cpus.reduce(
			(last, cpu, _, {
				length
			}) => {
				last.total += cpu.total;
				last.speed += cpu.speed / length;
				last.times.user += cpu.times.user;
				last.times.nice += cpu.times.nice;
				last.times.sys += cpu.times.sys;
				last.times.idle += cpu.times.idle;
				last.times.irq += cpu.times.irq;
				return last;
			},
			{
				speed: 0,
				total: 0,
				times: {
					user: 0,
					nice: 0,
					sys: 0,
					idle: 0,
					irq: 0,
				},
			});
		let timestamp = speed();
		let latensi = speed() - timestamp;
		neww = performance.now();
		oldd = performance.now();
		respon = `
Kecepatan Respon ${latensi.toFixed(4)} Second\n ${
    oldd - neww
  } miliseconds\n\nRuntime : ${await toTimer(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

NodeJS Memory Usage
${Object.keys(used)
  .map(
    (key, _, arr) =>
      `${key.padEnd(Math.max(...arr.map((v) => v.length)), " ")}: ${formatp(
        used[key]
      )}`
  )
  .join("\n")}

${
  cpus[0]
    ? `Total CPU Usage
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times)
        .map(
          (type) =>
            `- ${(type + "").padEnd(6)}: ${(
              (100 * cpu.times[type]) /
              cpu.total
            ).toFixed(2)}%`
        )
        .join("\n")}
CPU Core(s) Usage (${cpus.length} Core CPU)`
    : ""
}
                `.trim();
		conn.reply(msg, respon);
    }
}
