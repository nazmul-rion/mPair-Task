import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import EmployeeListApi from '../../hooks/employeeListApi';
import EmployeeRow from '../Dashboard/EmployeeRow'

function SalaryManagement() {

    const [selectedOption, setSelectedOption] = useState('all');
    const [employees] = EmployeeListApi(selectedOption);
    const { register, handleSubmit, reset } = useForm();


    if (employees.length === 0) {
        return <h1 className='text-center'>Loading</h1>

    }


    const handleFilter = (event) => {
        setSelectedOption(event.target.value);
    };

    const onSubmit = data => {
        swal("Are you sure? ", {
            buttons: ["No", "Yes"],
        })
            .then((value) => {
                if (value) {

                    fetch(`https://mpair-server.onrender.com/update-salary`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(data)

                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.modifiedCount) {
                                swal('Salary updated')

                            }
                        })


                }
            });
    }




    return (
        <div className='container-fluid'>

            <div className="container my-3">
                <h6>Filter By Job Title:</h6>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <select {...register("jobTitle", { required: true })} className='form-control w-25 mb-3' value={selectedOption} onChange={handleFilter}>
                        <option value="all">All</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                        <option value="Back-end Developer">Back-end Developer</option>
                        <option value="Front-end Developer">Front-end Developer</option>
                        <option value="Web Developer">Web Developer</option>
                    </select>
                    <label className='d-block' >Enter a value for salary increment</label>
                    <input {...register("percent", { required: true })} className='form-control mb-3 d-inline' style={{ width: "80px" }} type="number" /> %
                    <input className='btn btn-primary mb-3 d-block' type="submit" />

                </form>

                <h4>Filterd Employees</h4>
                <table class="table table-striped ">
                    <thead>
                        <tr>
                            <th className='text-center border border-dark'>first_name</th>
                            <th className='text-center border border-dark'>last_name</th>
                            <th className='text-center border border-dark'>age</th>
                            <th className='text-center border border-dark'>email</th>
                            <th className='text-center border border-dark'>phone_number</th>
                            <th className='text-center border border-dark'>job_title</th>
                            <th className='text-center border border-dark'>join_date</th>
                            <th className='text-center border border-dark'>salary</th>
                            <th className='text-center border border-dark'>department</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
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


        </div>
    )
}

export default SalaryManagement