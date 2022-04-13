import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtectedRoute = (props) => {

    let nav = useNavigate();
    let Cmp = props.Cmp;
    let user = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        // console.log("Admin ProtectedRoute : " + user.role);
        if (user == null)
            if (user == null)
                nav("/admin/login");

        if ( user ) {
            if (user.role == "CUSTOMER")
                nav("/login");

            if (user.role == "SELLER")
                nav("/seller/home");
        }

    }, []);

    return (<>
        <Cmp />
    </>);

}

export default AdminProtectedRoute;