const server= require('net')

module.exports = async function createClient(listener, port = 3000) {
  return new Promise((resolve) => {
    const client = server.connect(port, 'localhost', () => {
      resolve((command) => client.write(command + '\n'))
    })

    client.on('data', (data) => {
      listener(data.toString())
    })
  })
}
