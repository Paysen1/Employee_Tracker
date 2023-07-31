-- Seeds for department table
INSERT INTO department (name) VALUES ('Human Resources');
INSERT INTO department (name) VALUES ('Finance');
-- Add more departments if needed

-- Seeds for role table
INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 60000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 50000, 2);
-- Add more roles if needed

-- Seeds for employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
-- Add more employees if needed
