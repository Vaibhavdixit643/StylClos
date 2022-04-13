import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GuestRoute = (props) => {

    let nav = useNavigate();
    let Cmp = props.Cmp;;
    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        console.log("Guest Route : " + (user == null));

        if (user == null)
            nav("/login");
            
        if ( user ) {
            if (user.role == "ADMIN") {
                console.log("CustomerPR in admin match");
                nav("/admin/home");
            }


            else if (user.role == "SELLER") {
                console.log("CustomerPR in seller match");
                nav("/seller/home");
            }

            else
                nav("/home");
        }

    }, []);

    return (<>
        <Cmp />
    </>);

}

export default GuestRoute;