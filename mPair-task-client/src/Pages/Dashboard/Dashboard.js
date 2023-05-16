import React from 'react'
import EmployeeListApi from '../../hooks/employeeListApi';
import EmployeeRow from './EmployeeRow';

const Dashboard = () => {
    const [employees] = EmployeeListApi();
    if (employees.length === 0) {
        return <h1>Loading</h1>

    }
    return (
        <div>
            <h1 className=" text-center">Our Employees</h1>
            <hr />
            <table class="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Department</th>

                    </tr>
                </thead>

                <tbody> {
                    employees.map(employee => (
                        <EmployeeRow
                            employeeList={employee}
                            key={employee._id}>
                        </EmployeeRow>
                    ))
                }
                </tbody>


            </table>
        </div>
    )
}


export default Dashboard