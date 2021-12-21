const UserRole = require('./UserRole')
const express = require('express')
const Validator = require('./Validator')

module.exports = (config, db, log) => {
  const app = express()

  app.use(express.json())

  app.get('/GetEmployeeList', async function (req, res) {
    res
      .status(200)
      .json(await db.getEmployees())
  })

  app.get('/GetEmployeeRoles', async function (req, res) {
    if (!Validator.isNumber(req.query.employeeId)) {
      return res.status(400).end()
    }

    const roles = await db.getRoles(req.query.employeeId)

    res.status(200).json(roles.map(role => {
      return {
        roleId: role.RoleId,
        description: UserRole[role.RoleId]
      }
    }))
  })

  app.post('/ClockIn', async function (req, res) {
    if (!Validator.isNumber(req.body.employeeId) || !Validator.isNumber(req.body.roleId)) {
      return res.status(400).end()
    }

    const employee = await db.getEmployee(req.body.employeeId)
    
    if(!employee){
      log.error("employee doesnt exist")
      return res.status(400).json({error: "employee doesnt exist" })
    }
    
    if (!UserRole[req.body.roleId]) {
      log.error("user role doesnt exist")
      return res.status(400).json({error: "user role doesnt exist" })
    }
    
    await db.addAttendance(req.body.employeeId, req.body.roleId)
    res.status(200).end()
  })

  app.listen(config.port, () => {
    console.log(`start listening on port: ${config.port}`)
  })
}
