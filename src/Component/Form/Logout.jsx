import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Logout = () => {

    let nav = useNavigate();

    const getLocalItems = () => {
        let list = sessionStorage.getItem('user');
        console.log("logout : " + list);

        if (list) {
            console.log("return to useEffect");
            return JSON.parse(list);
        } else {
            return [];
        }
    }

    let [users] = useState(getLocalItems());

    useEffect(() => {
        console.log("user : " + users);

        if (users == null) {
            sessionStorage.setItem('user', null);
            nav("/Home");
        }
        else if (users.role == 'ADMIN') {
            sessionStorage.setItem('user', null);
            nav('/admin/login');
        }
        else if (users.role == 'SELLER') {
            sessionStorage.setItem('user', null);
            nav('/seller/login');
        }
        else {
            sessionStorage.setItem('user', null);
            nav('/Home');
        }
    }, [users])

    return (<>
    </>);
}

export default Logout;