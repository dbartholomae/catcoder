const server= require('net')
const childProcess = require('child_process')

module.exports = class Simulation {
  constructor(port) {
    this.port = port || 3000
    this.listeners = [];
  }

  tick (timeInSeconds) {
    this.runCommand(`TICK ${timeInSeconds}`)
  }

  runCommand(command) {
    this.client(command)
  }

  async start (level, task) {
    await this.createSimulator(level, task);
    this.client = await this.createClient(this.parseResponse);
  }

  registerListener(listener) {
    this.listeners.push(listener);
  }

  parseResponse = (response) => {
    this.listeners.forEach(listener => listener(response));
    console.log(this.parseFieldSize(response));
    console.log(this.parseDroneCount(response));
    console.log(response + 'XXXXX')
  }

  parseFieldSize(response) {
    const regexResult =  /^(?<xMin>\d+\.\d+) (?<xMax>\d+\.\d+) (?<yMin>\d+\.\d+) (?<yMax>\d+\.\d+)$/gm.exec(
        response);
    return regexResult ? regexResult.groups : undefined;
  }

  parseDroneCount(response) {
    const regexResult =  /(?<xMin>\d+)\n/gm.exec(response);
    return regexResult ? regexResult.groups : undefined;
  }

  async createSimulator(level, task) {
    const simulator = childProcess.exec(
        '"C:\\Program Files\\Java\\jre1.8.0_261\\bin\\java.exe" -jar D:\\repos\\catcoder\\simulator.jar ' +
        level + ' ' + task + ' ' + this.port);
    simulator.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    simulator.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  async createClient(listener) {
    return new Promise((resolve) => {
      const client = server.connect(this.port, 'localhost', () => {
        resolve((command) => client.write(command + '\n'))
      })

      client.on('data', (data) => {
        listener(data.toString())
      })
    })
  }
}
