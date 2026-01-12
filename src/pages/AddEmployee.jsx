import { useState } from "react";
import { getDateYearsAgo } from "../helpers/functions";

export default function AddEmployee({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  edit,
  setEdit,
}) {
  return (
    <div className="form-container modal-body">
      <form className="form">
        <div className="form-group">
          <label htmlFor="id">Emp ID</label>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="EMP001"
            value={formData.id}
            onChange={handleChange}
          />

          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <p className="label">Gender</p>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="Male"
                name="gender"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                value="Female"
                name="gender"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            min={getDateYearsAgo(60)}
            max={getDateYearsAgo(18)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Profile Image</label>

          {formData.image && (
            <img
              src={edit ? formData.image : URL.createObjectURL(formData.image)}
              alt="preview"
              className="image-preview"
            />
          )}

          <input type="file" id="image" name="image" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="state">Select State</label>
          <select
            name="state"
            id="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Tamilnadu">Tamilnadu</option>
            <option value="Kerala">Kerala</option>
            <option value="Gujarat">Gujarat</option>
          </select>
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>
        </div>
      </form>
    </div>
  );
}
