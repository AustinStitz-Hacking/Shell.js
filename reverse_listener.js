const net = require("net");
const process = require("process");

if(process.argv[2] && +process.argv[2] != process.argv[2]) {
  console.log(`"${process.argv[2]}" is not a valid port. A port must be a number.`);
  process.exit(1);
}

const PORT = process.argv[2] || 4444;


const server = net.createServer(client => {
  client.pipe(process.stdout);
  process.stdin.pipe(client);
  client.on("end", () => {
    console.log("Connection closed");
    client.destroy();
    process.exit();
  });
});

server.listen(PORT, () => {
  console.log(`Listener open on port ${PORT}`);
});
