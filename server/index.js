const app = require('./app')


const { PORT } = require('./utils/config')
const logger = require('./utils/logger')

const server = PORT || 3001

app.listen(server, (req,res) => {
  logger.information('listen server in the port:' + server)
})