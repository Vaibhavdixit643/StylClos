import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const nav = useNavigate();
    const goBack = () => nav(-1);

    return (<>
        <h4> You're unauthorized</h4>
        <div className="flexGrow">
            <button onClick={goBack}>Go Back</button>
        </div>
    </>)
}

export default Unauthorized;