const config = require('./lib/config')
const EmployeesDatabase = require('./lib/EmployeesDatabase')
const app = require('./lib/app')
const winston = require('winston')

async function main () {
  const db = new EmployeesDatabase(config.db)
  await db.testConnection()

  const log = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logfile.log' })
    ]
  })

  app(config, db, log)
}

main()
