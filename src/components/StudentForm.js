import React, { useState } from 'react';
import axios from 'axios';

export default function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    phone: '',
    dob: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/api/students', formData);
      setMessage(' Student added successfully!');
      setError('');
      setFormData({
        name: '',
        email: '',
        course: '',
        phone: '',
        dob: '',
      });
      console.log('Response:', res.data);
    } catch (err) {
      console.error(err);
      setMessage('');
      setError(' Failed to add student. Email might already exist.');
    }
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <h4 className="mb-3">Add Student</h4>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Course</label>
        <input
          type="text"
          className="form-control"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Date of Birth</label>
        <input
          type="date"
          className="form-control"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Student
      </button>
    </form>
  );
}
