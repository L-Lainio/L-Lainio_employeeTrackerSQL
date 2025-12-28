const inquirer = require('inquirer');
const pool = require('./db/connection');

async function viewAllDepartments() {
  const res = await pool.query('SELECT * FROM department');
  console.table(res.rows);
}

async function viewAllRoles() {
  const res = await pool.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id');
  console.table(res.rows);
}

async function viewAllEmployees() {
  const res = await pool.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
           CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `);
  console.table(res.rows);
}

async function addDepartment() {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter department name:'
  });
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log('Department added');
}

async function addRole() {
  const deptRes = await pool.query('SELECT * FROM department');
  const deptChoices = deptRes.rows.map(d => ({ name: d.name, value: d.id }));
  const { title, salary, department_id } = await inquirer.prompt([
    { type: 'input', name: 'title', message: 'Enter role title:' },
    { type: 'input', name: 'salary', message: 'Enter salary:' },
    { type: 'list', name: 'department_id', message: 'Choose department:', choices: deptChoices }
  ]);
  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  console.log('Role added');
}

async function addEmployee() {
  const roleRes = await pool.query('SELECT * FROM role');
  const roleChoices = roleRes.rows.map(r => ({ name: r.title, value: r.id }));
  const managerRes = await pool.query('SELECT * FROM employee');
  const managerChoices = managerRes.rows.map(m => ({ name: `${m.first_name} ${m.last_name}`, value: m.id }));
  managerChoices.unshift({ name: 'None', value: null });
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    { type: 'input', name: 'first_name', message: 'Enter first name:' },
    { type: 'input', name: 'last_name', message: 'Enter last name:' },
    { type: 'list', name: 'role_id', message: 'Choose role:', choices: roleChoices },
    { type: 'list', name: 'manager_id', message: 'Choose manager:', choices: managerChoices }
  ]);
  await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
  console.log('Employee added');
}

async function updateEmployeeRole() {
  const empRes = await pool.query('SELECT * FROM employee');
  const empChoices = empRes.rows.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }));
  const roleRes = await pool.query('SELECT * FROM role');
  const roleChoices = roleRes.rows.map(r => ({ name: r.title, value: r.id }));
  const { employee_id, role_id } = await inquirer.prompt([
    { type: 'list', name: 'employee_id', message: 'Choose employee:', choices: empChoices },
    { type: 'list', name: 'role_id', message: 'Choose new role:', choices: roleChoices }
  ]);
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  console.log('Employee role updated');
}

async function main() {
  let exit = false;
  while (!exit) {
    const { choice } = await inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    });

    switch (choice) {
      case 'View all departments':
        await viewAllDepartments();
        break;
      case 'View all roles':
        await viewAllRoles();
        break;
      case 'View all employees':
        await viewAllEmployees();
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
      case 'Exit':
        exit = true;
        await pool.end();
        break;
    }
  }
}

main().catch(console.error);
