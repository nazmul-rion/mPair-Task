import { useEffect } from "react";
import { useState } from "react"

const EmployeeListApi = () => {
    const [employees, setemployees] = useState([]);
    useEffect(() => {
        fetch('http://localhost:7000/allemployee')
            .then(res => res.json())
            .then(data => setemployees(data));
    }, [employees]);
    return [employees, setemployees];
}

export default EmployeeListApi;