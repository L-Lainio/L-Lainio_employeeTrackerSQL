const sequelize = require('../db/connection');
const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');
const inquirer = require('inquirer');

// Associations
Department.hasMany(Role, { foreignKey: 'department_id' });
Role.belongsTo(Department, { foreignKey: 'department_id' });
Role.hasMany(Employee, { foreignKey: 'role_id' });
Employee.belongsTo(Role, { foreignKey: 'role_id' });
Employee.belongsTo(Employee, { as: 'manager', foreignKey: 'manager_id' });
Employee.hasMany(Employee, { as: 'subordinates', foreignKey: 'manager_id' });

async function viewAllDepartments() {
  const departments = await Department.findAll();
  console.table(departments.map(d => ({ id: d.id, name: d.name })));
}

async function viewAllRoles() {
  const roles = await Role.findAll({ include: Department });
  console.table(roles.map(r => ({ id: r.id, title: r.title, salary: r.salary, department: r.Department.name })));
}

async function viewAllEmployees() {
  const employees = await Employee.findAll({ include: [Role, { model: Employee, as: 'manager' }] });
  console.table(employees.map(e => ({
    id: e.id,
    first_name: e.first_name,
    last_name: e.last_name,
    title: e.Role.title,
    department: e.Role.Department.name,
    salary: e.Role.salary,
    manager: e.manager ? `${e.manager.first_name} ${e.manager.last_name}` : null
  })));
}

async function addDepartment() {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter department name:'
  });
  await Department.create({ name });
  console.log('Department added');
}

async function addRole() {
  const departments = await Department.findAll();
  const deptChoices = departments.map(d => ({ name: d.name, value: d.id }));
  const { title, salary, department_id } = await inquirer.prompt([
    { type: 'input', name: 'title', message: 'Enter role title:' },
    { type: 'input', name: 'salary', message: 'Enter salary:' },
    { type: 'list', name: 'department_id', message: 'Choose department:', choices: deptChoices }
  ]);
  await Role.create({ title, salary, department_id });
  console.log('Role added');
}

async function addEmployee() {
  const roles = await Role.findAll();
  const roleChoices = roles.map(r => ({ name: r.title, value: r.id }));
  const managers = await Employee.findAll();
  const managerChoices = managers.map(m => ({ name: `${m.first_name} ${m.last_name}`, value: m.id }));
  managerChoices.unshift({ name: 'None', value: null });
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    { type: 'input', name: 'first_name', message: 'Enter first name:' },
    { type: 'input', name: 'last_name', message: 'Enter last name:' },
    { type: 'list', name: 'role_id', message: 'Choose role:', choices: roleChoices },
    { type: 'list', name: 'manager_id', message: 'Choose manager:', choices: managerChoices }
  ]);
  await Employee.create({ first_name, last_name, role_id, manager_id });
  console.log('Employee added');
}

async function updateEmployeeRole() {
  const employees = await Employee.findAll();
  const empChoices = employees.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }));
  const roles = await Role.findAll();
  const roleChoices = roles.map(r => ({ name: r.title, value: r.id }));
  const { employee_id, role_id } = await inquirer.prompt([
    { type: 'list', name: 'employee_id', message: 'Choose employee:', choices: empChoices },
    { type: 'list', name: 'role_id', message: 'Choose new role:', choices: roleChoices }
  ]);
  await Employee.update({ role_id }, { where: { id: employee_id } });
  console.log('Employee role updated');
}

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };
