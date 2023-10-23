import React, { useEffect, useState } from "react";

function AutomobileForm() {
  const [models, setModels] = useState([]);
  const [formData, setFormData] = useState({
    color: "",
    year: "",
    vin: "",
    model_id: "",
  });
  const fetchData = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setFormData({
        color: "",
        year: "",
        vin: "",
        model_id: "",
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
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create A New Automobile</h1>
            <form onSubmit={handleSubmit} id="create-auto-form">
              <div className="form-floating mb-3">
                <input
                  value={formData.color}
                  onChange={handleFormChange}
                  placeholder="Color"
                  required
                  type="text"
                  name="color"
                  id="color"
                  className="form-control"
                />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={formData.year}
                  onChange={handleFormChange}
                  placeholder="Year"
                  required
                  type="text"
                  name="year"
                  id="year"
                  className="form-control"
                />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={formData.color}
                  onChange={handleFormChange}
                  placeholder="VIN"
                  required
                  type="text"
                  name="vin"
                  id="vin"
                  className="form-control"
                />
                <label htmlFor="vin">VIN Number</label>
              </div>
              <div className="mb-3">
                <select
                  value={formData.model_id}
                  onChange={handleFormChange}
                  required
                  name="model"
                  id="model"
                  className="form-select"
                >
                  <option value="">Choose A Model</option>
                  {models.map((models) => {
                    return (
                      <option key={models.id} value={models.id}>
                        {models.model_id}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={formData.picture_url}
                  onChange={handleFormChange}
                  placeholder="Picture_URL"
                  required
                  type="url"
                  name="picture_url"
                  id="picture_url"
                  className="form-control"
                />
                <label htmlFor="picture_url">Image URL</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutomobileForm;