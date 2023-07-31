const db = require('./db');

const getAllDepartments = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM department;');
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error getting departments:', error);
    return [];                                                               //returning?
  }
};

const getAllRoles = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM role');
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error getting roles:', error);
    return [];
  }
};                                                                          //returning?

const getAllEmployees = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM employee');
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error getting employees:', error);
    return [];
  }
};                                                                          //returning?

const addDepartment = async (departmentName) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
    await connection.commit();
    console.log('Department added successfully!');
  } catch (error) {
    await connection.rollback();
    console.error('Error adding department:', error);
  } finally {
    connection.release();
  }
};


const addRole = async (roleDetails) => {
  const connection = await db.getConnection();
  try {
    const { title, salary, department_id } = roleDetails;
    await connection.beginTransaction();
    await connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
    await connection.commit();
    console.log('Role added successfully!');
  } catch (error) {
    await connection.rollback();
    console.error('Error adding role:', error);
  } finally {
    connection.release();
  }
};

const addEmployee = async (employeeDetails) => {
  const connection = await db.getConnection();
  try {
    const { first_name, last_name, role_id, manager_id } = employeeDetails;
    await connection.beginTransaction();
    await connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
    await connection.commit();
    console.log('Employee added successfully!');
  } catch (error) {
    await connection.rollback();
    console.error('Error adding employee:', error);
  } finally {
    connection.release();
  }
};

const updateEmployeeRole = async (employeeId, newRoleId) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
    await connection.commit();
    console.log('Employee role updated successfully!');
  } catch (error) {
    await connection.rollback();
    console.error('Error updating employee role:', error);
  } finally {
    connection.release();
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
