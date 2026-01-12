import "./../styles/dashboard.css";
import EmployeeReport from "../components/dashboard/EmpoyeeReport";
import NavBar from "../components/common/NavBar";
import Modal from "../components/common/Modal";
import AddEmployee from "./AddEmployee";
import { useEffect, useState } from "react";
export default function Dashboard() {
  const [allEmp, setAllEmp] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    gender: "",
    dob: "",
    image: "",
    state: "",
    isActive: false,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allEmp.length / 10);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = allEmp.slice(startIndex, endIndex);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (formData) => {
    try {
      const payload = {
        id: formData.id,
        name: formData.name,
        gender: formData.gender,
        dob: formData.dob,
        state: formData.state,
        isActive: formData.isActive,
        image: `https://i.pravatar.cc/150?img=${
          Math.floor(Math.random() * 70) + 1
        }`,
      };

      const response = await fetch(
        "http://localhost:3002/api/empmgmt/employee/add/employee",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (data.success) {
        setFormData({
          id: "",
          name: "",
          gender: "",
          dob: "",
          image: "",
          state: "",
          isActive: "",
        });
        setOpenModal(false);
        fetchEmployees();
      }
      console.log(payload, "rtyui");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/empmgmt/employee/employees`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setEmpDetails(data);
        setAllEmp(data.employees);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const validateForm = (formData) => {
    if (
      formData.id &&
      formData.name &&
      formData.dob &&
      formData.image &&
      formData.gender &&
      formData.state &&
      formData.isActive !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/empmgmt/employee/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        fetchEmployees();
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(currentPage);

  return (
    <div className="dashboard-container">
      {openModal && (
        <Modal
          title={!isEdit ? "Add Employee" : "Edit Employee"}
          isOpen={openModal}
          onClose={handleClose}
          footer={
            <div className="flex justify-between items-center">
              <button className="cancel-btn btn" onClick={handleClose}>
                Cancel
              </button>
              <button
                className={`${
                  validateForm(formData) ? "submit-btn" : "disabled-btn"
                } btn`}
                onClick={() => handleSubmit(formData)}
              >
                Submit
              </button>
            </div>
          }
        >
          <AddEmployee
            formData={isEdit ? editData : formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            edit={isEdit}
            setEdit={setIsEdit}
          />
        </Modal>
      )}
      <NavBar />
      <EmployeeReport data={empDetails} addEmployee={handleOpen} />
      <div className="table-container">
        <table className="db-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Employee Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees?.map((emp, index) => (
              <tr className="text-center">
                <td>{index + 1}</td>
                <td>{emp.id}</td>
                <td>
                  <img
                    src={emp.image}
                    alt={emp.name}
                    className="size-4 rounded-full"
                  />
                </td>
                <td>{emp.name}</td>
                <td>{emp.gender}</td>
                <td>{emp.dob}</td>
                <td>{emp.state}</td>
                <td>
                  {emp?.isActive && (
                    <button
                      className={`btn ${emp?.isActive ? "active" : "inactive"}`}
                    >
                      Active
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="edit-button btn"
                    onClick={() => {
                      setIsEdit(true);
                      setOpenModal(true);
                      setEditData(emp);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button btn"
                    onClick={() => handleDelete(emp?.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="page-btns">
        <button
          className="btn"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="btn"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= 5}
        >
          Next
        </button>
      </div>
    </div>
  );
}
