const db = require('./db');

const getAllDepartments = async () => {
  try {
    const [rows] = await db.connection.query('SELECT * FROM department');
    console.log('Departments data:', rows);
    return rows;
  } catch (error) {
    console.error('Error getting departments:', error);
    return [];                                                               //returning?
  }
};

const getAllRoles = async () => {
  try {
    const [rows] = await db.connection.query('SELECT * FROM role');
    console.log('Departments data:', rows);
    return rows;
  } catch (error) {
    console.error('Error getting roles:', error);
    return [];
  }
};                                                                          //returning?

const getAllEmployees = async () => {
  try {
    const [rows] = await db.connection.query('SELECT * FROM employee');
    console.log('Departments data:', rows);
    return rows;
  } catch (error) {
    console.error('Error getting employees:', error);
    return [];
  }
};                                                                          //returning?

const addDepartment = async (departmentName) => {
  try {
    await db.connection.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
  } catch (error) {
    console.error('Error adding department:', error);
  }
};

const addRole = async (roleDetails) => {
  try {
    const { title, salary, department_id } = roleDetails;
    await db.connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
  } catch (error) {
    console.error('Error adding role:', error);
  }
};

const addEmployee = async (employeeDetails) => {
  try {
    const { first_name, last_name, role_id, manager_id } = employeeDetails;
    await db.connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
  } catch (error) {
    console.error('Error adding employee:', error);
  }
};

const updateEmployeeRole = async (employeeId, newRoleId) => {
  try {
    await db.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
};

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
