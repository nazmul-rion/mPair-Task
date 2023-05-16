import React from 'react'

function EmployeeRow(props) {
    const { _id, fName, lName, age, email, salary, department } = props.employeeList;
    return (

        <tr>
            <td>{fName}</td>
            <td>{lName}</td>
            <td>{age}</td>
            <td>{email}</td>
            <td>{salary}</td>
            <td>{department}</td>

        </tr>
    )
}

export default EmployeeRow