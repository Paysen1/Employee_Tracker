const inquirer = require('inquirer');

const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require('./queries');

const mainMenu = async () => {
  const { choice } = await inquirer.prompt([
    {
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
        'Exit',
      ],
    },
  ]);

  switch (choice) {
    case 'View all departments':
      const departments = await getAllDepartments();
      console.table(departments); //returning?
      break;
    case 'View all roles':
      const roles = await getAllRoles();
      console.table(roles);//returning?
      break;
    case 'View all employees':
      const employees = await getAllEmployees();
      console.table(employees);//returning?
      break;
    case 'Add a department':
      const departmentName = await inquirer.prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'Enter the name of the department:',
        },
      ]);
      await addDepartment(departmentName.departmentName);
      console.log('Department added successfully!');
      break;
    case 'Add a role':
      const roleDetails = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary of the role:',
        },
        {
          type: 'input',
          name: 'department_id',
          message: 'Enter the department ID for the role:',
        },
      ]);
      await addRole(roleDetails);
      console.log('Role added successfully!');
      break;
    case 'Add an employee':
      const employeeDetails = await inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the first name of the employee:',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the last name of the employee:',
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'Enter the role ID for the employee:',
        },
        {
          type: 'input',
          name: 'manager_id',
          message: "Enter the manager's ID for the employee (leave empty if there is no manager):",
        },
      ]);
      await addEmployee(employeeDetails);
      console.log('Employee added successfully!');
      break;
    case 'Update an employee role':
      const employeeToUpdate = await inquirer.prompt([
        {
          type: 'input',
          name: 'employee_id',
          message: 'Enter the ID of the employee you want to update:',
        },
      ]);
      const newRoleId = await inquirer.prompt([
        {
          type: 'input',
          name: 'role_id',
          message: 'Enter the new role ID for the employee:',
        },
      ]);
      await updateEmployeeRole(employeeToUpdate.employee_id, newRoleId.role_id);
      console.log('Employee role updated successfully!');
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit(0);
  }

  mainMenu();
};

const mysql = require('mysql2/promise'); // Use 'mysql2/promise' for promise-based API


    const pool = mysql.createPool({ // Create the pool
      host: 'localhost',
      user: 'root',
      password: 'Neorocks9292?',
      database: 'Employees',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const startApp = async () => {
      try {
        const connection = await pool.getConnection();
        console.log('Connected to the database successfully!');
    
        // Pass the database connection to the queries module
        const db = require('./queries');
        db.connection = connection;

    // Show the main menu to the user
    mainMenu();
    
    process.on('SIGINT', () => {
      connection.end();
      console.log('Database connection closed.');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

startApp();
