const createSimulator = require('./createSimulator');
const createClient = require('./createClient');

async function run () {
  await createSimulator(2,1);
  const runCommand = await createClient(console.log)
  runCommand('THROTTLE 0 0.5\n')
  runCommand('TICK 2.5\n')
  runCommand('THROTTLE 0 0.2\n')
  runCommand('TICK 5\n')
  runCommand('LAND\n')
  runCommand('STATUS 0\n')
}

run().catch(console.error)
