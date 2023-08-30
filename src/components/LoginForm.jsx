import Form from "./Form";
import FormControl from "./FormControl";
import FormError from "./FormError";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../context/authContext";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

///
function LoginForm() {
  const [formError, setFormError] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("not a valid email")
        .required("email is required")
        .trim(),
      password: Yup.string().min(6).required("Required"),
    }),

    onSubmit: async (value, { resetForm }) => {
      try {
        setError(null);
        setLoading(true);
        await login(value.email, value.password);
        toast.success("logged in successfully");
        resetForm({ values: "" });
        setTimeout(() => {
          navigate("/", { state: value });
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        toast.error("failed to login");
      }
    },
  });
  useEffect(() => {
    setFormError(formik.errors);
  }, [formik.errors]);

  return (
    <Form className="login" onSubmit={formik.handleSubmit}>
      <FormControl
        icon="alternate_email"
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={formik.handleChange}
        value={formik.values.email}
        errorMessage={
          formik.touched.email && formError.email ? formError.email : null
        }
      />
      <FormControl
        icon="lock"
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        errorMessage={
          formik.touched.password && formError.password
            ? formError.password
            : null
        }
      />
      {error && <FormError className="common-error ">{error}</FormError>}

      <Button type="submit" disabled={loading}>
        Login
      </Button>
      <div className="info">
        <span>
          Dont have an account?
          <Link to="/signup"> Sign up </Link>
          instead
        </span>
      </div>
    </Form>
  );
}

export default LoginForm;
