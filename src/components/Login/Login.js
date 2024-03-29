import { useState, useReducer, useEffect } from "react";
import { Alert } from "@mui/material";
import { URL } from "../../URL";
import { useNavigate } from "react-router-dom";
import { registerReducer, INITIAL_STATE } from "../../reducers/registerReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./login.css";
// import SetCookie from "../../hooks/setCookie";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [state, dispatch] = useReducer(registerReducer, INITIAL_STATE);
  const [result, setResult] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    // backend-course-app-production-1670.up.railway.app
    e.preventDefault();
    const loginUrl = `${URL}auth/login`;
    setLoading(true);
    const userDetails = {
      email: state.email,
      password: state.password,
    };
    const res = await axios.post(loginUrl, userDetails, {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    });
    if (res.status !== 200 || res.status !== 201) {
      setError(true);
    }
    toast.success("successfully logged in ", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setUser(res.data.token);
    setResult(res.data.existingUser._id);
    localStorage.setItem("userId", JSON.stringify(res.data.existingUser._id));
    localStorage.setItem("token", JSON.stringify(res.data.token));

    navigate("/");
    if (res.status === 200) {
      // saveAccessToken(res.data.token);
    }
  };
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(
        "Error: User not found or Please Check Your Email and Password"
      );
    }
  }, [success, error]);
  return (
    <>
      <section className="login-section">
        {error && (
          <>
            <Alert severity="error">
              User Not Found Please Check Your Email and Password
            </Alert>
          </>
        )}
        <div className="login-container bg-neutral-900">
          <ToastContainer />
          <form onSubmit={handleSubmit} className="login-form-style">
            <h2 className="form-heading text-white">Login</h2>
            <input
              type="text"
              className="input-field-login"
              onChange={handleChange}
              name="email"
              placeholder="email"
            />

            <input
              className="input-field-login"
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="password"
            />

            <button type="submit" className="submit-btn ">
              {loading ? "Loading..." : "Login"}
            </button>

            <p
              onClick={() => {
                navigate("/register");
              }}
              className="text-white"
              style={{
                cursor: "pointer",
              }}
            >
              Don't have an account? click to register (working on CSS Tho won't
              be styled) the logic works
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
