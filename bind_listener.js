const net = require("net");
const process = require("process");


const HOST = process.argv[2] || "127.0.0.1";
if(process.argv[3] && +process.argv[3] != process.argv[3]) {
  console.log(`"${process.argv[3]}" is not a valid port. A port must be a number.`);
  process.exit(1);
}

const PORT = process.argv[3] || 4444;


const client = net.createConnection({ host: HOST, port: PORT }, () => {
  console.log(`Connected to ${HOST} on port ${PORT}`);
  client.pipe(process.stdout);
  process.stdin.pipe(client);
});

client.on("end", () => {
  console.log("Connection closed");
  client.destroy();
  process.exit();
});
