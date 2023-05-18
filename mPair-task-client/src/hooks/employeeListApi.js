import { useEffect } from "react";
import { useState } from "react"

const EmployeeListApi = (jobTitle) => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetch(`https://mpair-server.onrender.com/allemployee/?jobTitle=${jobTitle}`)
            .then(res => res.json())
            .then(data => setEmployees(data));

    }, [employees, jobTitle]);
    return [employees, setEmployees];
}

export default EmployeeListApi;