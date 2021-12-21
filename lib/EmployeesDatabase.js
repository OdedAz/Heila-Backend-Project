const knex = require('knex')

module.exports = class EmployeesDatabase {
  constructor (config) {
    this._knex = knex(config)
  }

  async testConnection () {
    return this._knex.raw('select 1')
  }

  async getEmployees () {
    return this._knex('Employees').select()
  }

  async getRoles (employeeId) {
    return this._knex('EmployeeRoles')
      .where({
        EmployeeId: employeeId,
        enabled: true
      })
      .select()
  }

  async addAttendance (employeeId, roleId) {
    return this._knex('Attendance').insert({
      employeeId: employeeId,
      roleId: roleId,
      actionTime: new Date()
    })
  }

  async getEmployee (employeeId) {
    return this._knex('Employees').where({
      Id: employeeId,
    }).select().first()
  }

  async getRole (employeeId) {
    return this._knex('EmployeeRoles').where({
      Id: employeeId,
    }).select().first()
  }
}