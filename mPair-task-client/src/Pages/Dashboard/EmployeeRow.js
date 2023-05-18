import React from 'react'

function EmployeeRow(props) {
    const { _id, first_name, last_name, age, email, phone_number, job_title, join_date, salary, department } = props.employeeList;
    return (

        <tr>
            <td className='border border-dark'>{first_name}</td>
            <td className='border border-dark'>{last_name}</td>
            <td className='border border-dark'>{age}</td>
            <td className='border border-dark'>{email}</td>
            <td className='border border-dark'>{phone_number}</td>
            <td className='border border-dark'>{job_title}</td>
            <td className='border border-dark'>{join_date}</td>
            <td className='border border-dark'>${salary.toFixed(2)}</td>
            <td className='border border-dark'>{department}</td>

        </tr>
    )
}

export default EmployeeRow