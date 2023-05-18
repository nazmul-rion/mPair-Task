import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import initializeAuthentication from "../config/firebase";


//initialize firebase  authentication
initializeAuthentication()

const useFirebase = () => {
    const [admin, setAdmin] = useState(false);
    const [employee, setEmployee] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectUrl = location.state?.from || '/';

    useEffect(() => {
        setLoading(true);
        fetch(`https://mpair-server.onrender.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => {

                if (data.isAdmin === "admin") {
                    setAdmin(true);
                    setEmployee(false);
                    setLoading(false);
                    navigate(redirectUrl)
                }
                else if (data.isAdmin === "employee") {
                    setEmployee(true);
                    setAdmin(false);
                    setLoading(false);
                    navigate(redirectUrl)

                }

            })

    }, [user.email])


    //on State Change 
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({});
            }

            setLoading(false);
        })
    }, [auth])



    //sign in functionality
    const signInUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                setLoading(true);
                setUser(res.user);
                swal("Sign in!", "Sign in Successfull", "success");
                navigate(redirectUrl);
            }).finally(() => setLoading(false))
            .catch(err => setError(err.message))
    }


    const saveUser = (email, password) => {
        const user = { email, password };

        fetch('https://mpair-server.onrender.com/adduser', {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                setError(res.message)
            })

    }

    //sign up functionality
    const signUpUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                setLoading(true);
                setUser(res.user);
                saveUser(email, password);
                updateProfile(auth.currentUser, {

                }).then(() => {

                    swal("Sign Up!", "Sign Up Successfull", "success");

                    navigate(redirectUrl);
                })

            }).finally(() => setLoading(false)).catch(err => setError(err.message));
    }


    // sign out 
    const signOutUser = () => {
        signOut(auth).then(() => {
            setUser({});
            swal("Sign Out!", "Sign out Successfull", "error");
            navigate('/login')
        }).finally(() => setLoading(false)).catch((err) => {
            setError(err.message);
        });
    }

    return {
        user,
        admin,
        employee,
        error,
        loading,
        signInUser,
        signUpUser,
        signOutUser,
    }
}

export default useFirebase
