import React, { useState } from "react";
import "./StudentManager.css"; // Import CSS specific to this component

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", email: "", age: "" });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddStudent = () => {
    if (!form.id || !form.name || !form.email || !form.age) return alert("All fields required");
    if (students.find((s) => s.id === form.id)) return alert("Student ID must be unique");
    setStudents([...students, form]);
    setForm({ id: "", name: "", email: "", age: "" });
  };

  const handleUpdateStudent = () => {
    setStudents(students.map((s) => (s.id === form.id ? form : s)));
    setForm({ id: "", name: "", email: "", age: "" });
    setEditMode(false);
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="container">
      <h2>Student Form</h2>
      <div className="form">
        <input name="id" placeholder="Student ID" value={form.id} onChange={handleChange} />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
        {editMode ? (
          <button onClick={handleUpdateStudent}>Update Student</button>
        ) : (
          <button onClick={handleAddStudent}>Add Student</button>
        )}
      </div>

      <h3>Student List</h3>
      {students.length === 0 ? (
        <p>No students added yet.</p>
      ) : (
        <ul className="student-list">
          {students.map((student) => (
            <li key={student.id} className="student-item">
              <div>
                <p><strong>ID:</strong> {student.id}</p>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Age:</strong> {student.age}</p>
              </div>
              <div>
                <button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentManager;
