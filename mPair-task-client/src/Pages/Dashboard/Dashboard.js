import React from 'react'
import EmployeeListApi from '../../hooks/employeeListApi';
import EmployeeRow from './EmployeeRow';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {

    const { user, admin } = useAuth();
    const [employees] = EmployeeListApi("all");
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    if (employees.length === 0) {
        return <h1 className='text-center'>Loading</h1>

    }


    const onSubmit = data => {
        swal("Are you sure you want to add this Employee?", {
            buttons: ["No", "Yes"],
        })
            .then((value) => {
                if (value) {
                    axios.post('https://mpair-server.onrender.com/add-employee', data)
                        .then(res => {
                            if (res.data.insertedId) {
                                swal({
                                    title: "Congratulation",
                                    text: "Employee added",
                                    icon: "success",
                                    button: "Done",
                                });
                                reset();
                            }
                            else {
                                swal("Sorry!", "Some Error occure", "error");
                            }
                        });
                }
            });
    }

    const addEmployee = () => {
        const addEmployeeSection = document.getElementById("add-employee");
        const addEmployeebtn = document.getElementById("addEmployeebtn");
        addEmployeeSection.style.display = "inline";
        addEmployeebtn.style.display = "none";
    }

    const cancelAddEmployee = () => {
        const addEmployeeSection = document.getElementById("add-employee");
        const addEmployeebtn = document.getElementById("addEmployeebtn");
        addEmployeeSection.style.display = "none";
        addEmployeebtn.style.display = "inline";
    }


    return (
        <div className='container'>
            <section id='add-employee' className='container w-50' style={{ display: "none" }}>
                <h2>Add an Employee</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="mb-3">
                        <label for="first_name" class="form-label">First Name</label>
                        <input  {...register("first_name", { required: true })} type="text" class="form-control" id="first_name" required />
                    </div>

                    <div class="mb-3">
                        <label for="last_name" class="form-label">Last Name</label>
                        <input {...register("last_name", { required: true })} type="text" class="form-control" id="last_name" required />
                    </div>

                    <div class="mb-3">
                        <label for="age" class="form-label">Age</label>
                        <input {...register("age", { required: true })} type="number" class="form-control" id="age" required />
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input {...register("email", { required: true })} type="email" class="form-control" id="email" required />
                    </div>

                    <div class="mb-3">
                        <label for="phone_number" class="form-label">Phone Number</label>
                        <input {...register("phone_number", { required: true })} type="text" class="form-control" id="phone_number" required />
                    </div>

                    <div class="mb-3">
                        <label for="job_title" class="form-label">Job Title</label>
                        <input {...register("job_title", { required: true })} type="text" class="form-control" id="job_title" required />
                    </div>

                    <div class="mb-3">
                        <label for="join_date" class="form-label">Joining Date</label>
                        <input {...register("join_date", { required: true })} type="date" class="form-control" id="join_date" required />
                    </div>

                    <div class="mb-3">
                        <label for="salary" class="form-label">Salary</label>
                        <input step="0.01" {...register("salary", { required: true })} type="number" class="form-control" id="salary" required />
                    </div>

                    <div class="mb-3">
                        <label for="department" class="form-label">Department</label>
                        <input {...register("department", { required: true })} type="text" class="form-control" id="department" required />
                    </div>

                    <input className="btn  btn-success mb-3 me-2" type="submit" />
                    <button onClick={() => cancelAddEmployee()} class="btn btn-secondary mb-3 me-2">Cancel</button>

                </form>

            </section>
            <h1 className=" text-center">Our Employees</h1>

            {
                (user?.email && admin) ? <button button onClick={() => addEmployee()} id="addEmployeebtn" className='btn btn-primary mb-2 float-end'>Add an Employee</button> : <></>

            }




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
        </div >
    )
}


export default Dashboard