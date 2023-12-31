import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AppointmentForm() {
  const [technicians, setTechnicians] = useState([]);
  const [formData, setFormData] = useState({
    vin: "",
    customer: "",
    date: "",
    time: "",
    technician: "",
    reason: "",
  });

  const fetchData = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateTime = new Date(`${formData.date}T${formData.time}`);
    const isoDateTime = dateTime.toISOString();

    const url = "http://localhost:8080/api/appointments/";

    const fetchConfig = {
      method: "post",
      body: JSON.stringify({
        vin: formData.vin,
        customer: formData.customer,
        technician: formData.technician,
        reason: formData.reason,
        date_time: isoDateTime,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setFormData({
        vin: "",
        customer: "",
        date: "",
        time: "",
        technician: "",
        reason: "",
        date_time: "",
      });
    }
  };
  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="shadow p-4 mt-4">
            <h1>Book an appointment</h1>
            <form onSubmit={handleSubmit} id="create-appointment-form">
              <div className="form-floating mb-3">
                <input
                  value={formData.vin}
                  onChange={handleFormChange}
                  placeholder="Vin"
                  required
                  type="text"
                  name="vin"
                  id="vin"
                  className="form-control"
                />
                <label htmlFor="vin">Vin</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={formData.customer}
                  onChange={handleFormChange}
                  placeholder="Customer"
                  required
                  type="text"
                  name="customer"
                  id="customer"
                  className="form-control"
                />
                <label htmlFor="customer">Customer</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={formData.date}
                  onChange={handleFormChange}
                  placeholder="Date"
                  required
                  type="date"
                  name="date"
                  id="date"
                  className="form-control"
                />
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={formData.time}
                  onChange={handleFormChange}
                  placeholder="Time"
                  required
                  type="time"
                  name="time"
                  id="time"
                  className="form-control"
                />
                <label htmlFor="time">Time</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  value={formData.technician}
                  onChange={handleFormChange}
                  required
                  name="technician"
                  id="technician"
                  className="form-select"
                >
                  <option value="">Choose a technician</option>
                  {technicians.map((technician) => {
                    return (
                      <option
                        key={technician.employee_id}
                        value={technician.employee_id}
                      >
                        {technician.first_name} {technician.last_name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="technician">Technician</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={formData.reason}
                  onChange={handleFormChange}
                  placeholder="Reason"
                  required
                  type="text"
                  name="reason"
                  id="reason"
                  className="form-control"
                />
                <label htmlFor="reason">Reason</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-8 offset-md-2 mt-3">
        <div className="d-flex justify-content-center">
          <Link to="/appointments/">
            <button type="button" className="btn btn-outline-secondary">Open appointments</button>
          </Link>
          <Link to="/appointments/history/">
            <button type="button" className="btn btn-outline-secondary">Past appointments</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
