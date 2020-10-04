const Simulation = require('./Simulation');
const Drone = require('./Drone');

async function run () {
  const simulation = new Simulation()
  await simulation.start(1, 1)
  const drone = new Drone(simulation, 0)
  drone.status()
  drone.setThrottle(0.6)
  simulation.tick(10)
}

run().catch(console.error)
