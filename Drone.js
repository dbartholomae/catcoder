module.exports = class Drone {
  constructor(simulation, index) {
    this.simulation = simulation
    this.index = index
    this.droneStatus = undefined
    this.waitingForStatus = false

    simulation.registerListener(this.parseResponse);
  }

  setThrottle(throttle) {
    this.simulation.runCommand(`THROTTLE ${this.index} ${throttle}`)
  }

  land() {
    this.simulation.runCommand(`LAND ${this.index}`)
  }

  parseResponse = response => {
    if (!this.waitingForStatus)
      return;

    let droneStatus = this.parseDroneStatus(response);
    if (!droneStatus)
      return;

    this.droneStatus = droneStatus;
    this.waitingForStatus = false;
    console.log(this.droneStatus)
  }

  parseDroneStatus(response) {
    const regexResult = /(?<x>\d+\.\d+) (?<y>\d+\.\d+) (?<z>\d+\.\d+) (?<vx>\d+\.\d+) (?<vy>\d+\.\d+) (?<vz>\d+\.\d+) (?<rx>\d+\.\d+) (?<ry>\d+\.\d+) (?<rz>\d+\.\d+)/gm.exec(
        response);
    return regexResult ? regexResult.groups : undefined;
  }

  status() {
    this.simulation.runCommand(`STATUS ${this.index}`)
    this.waitingForStatus = true;
  }
}
