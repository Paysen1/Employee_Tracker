const db = require('./db');

const getAllDepartments = async () => {
  try {
    const [rows] = await db.connection.query('SELECT * FROM department');
    return rows;
  } catch (error) {
    console.error('Error getting departments:', error);
    return [];
  }
};

const getAllRoles = async () => {
  try {
    const [rows] = await db.connection.query('SELECT * FROM role');
    return rows;
  } catch (error) {
    console.error('Error getting roles:', error);
    return [];
  }
};

const getAllEmployees = async () => {
  try {
    const [rows] = await db.connection.query('SELECT * FROM employee');
    return rows;
  } catch (error) {
    console.error('Error getting employees:', error);
    return [];
  }
};

const addDepartment = async (departmentName) => {
  try {
    await db.connection.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
  } catch (error) {
    console.error('Error adding department:', error);
  }
};

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
};
