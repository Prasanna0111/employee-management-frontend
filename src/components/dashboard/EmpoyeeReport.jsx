import { useNavigate } from "react-router-dom";
import CountCard from "./CountCard";

export default function EmployeeReport({ data, addEmployee }) {
  const route = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center m-1">
        <div className="txt-primary db-text">Dashboard</div>
        <button className="btn btn-primary p-1" onClick={() => addEmployee()}>
          + Add Employee
        </button>
      </div>
      <div className="flex justify-start gap-2 m-1">
        <CountCard count={data?.totalEmployees} title="Total Employees" />
        <CountCard count={data?.activeEmployees} title="Active Employees" />
        <CountCard count={data?.inActiveEmployees} title="Inactive Employees" />
      </div>
    </>
  );
}
