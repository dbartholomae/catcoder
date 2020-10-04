const childProcess = require('child_process')

module.exports = async function createSimulator(level, task, port = 3000) {
  const simulator = childProcess.exec(
      '"C:\\Program Files\\Java\\jre1.8.0_261\\bin\\java.exe" -jar D:\\repos\\catcoder\\simulator.jar ' +
      level + ' ' + task + ' ' + port);
  simulator.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  simulator.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  await new Promise((resolve) => setTimeout(resolve, 200))
}
