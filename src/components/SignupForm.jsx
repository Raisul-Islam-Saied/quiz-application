import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../context/authContext";
import * as Yup from "yup";
import Button from "./Button";
import ChackBox from "./ChackBox";
import Form from "./Form";
import FormControl from "./FormControl";
import FormError from "./FormError";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const SignupForm = () => {
  const [formError, setFormError] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      agree: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("name is required")
        .min(3, "name must have at least 3 characters")
        .max(30, "name can have 30 character")
        .trim(),
      email: Yup.string()
        .email("not a valid email")
        .required("email is required")
        .trim(),
      password: Yup.string()
        .matches(passwordRules, {
          message: "Please create a stronger password",
        })
        .required("Required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "password must match")
        .required(),
      agree: Yup.boolean()
        .required("The terms and conditions must be accepted.")
        .oneOf([true], "The terms and conditions must be accepted."),
    }),

    onSubmit: async (value, { resetForm }) => {
      try {
        setError(null);
        setLoading(true);
        await signup(value.email, value.password, value.name);
        toast.success("created successfully");
        resetForm({ values: "" });
        setTimeout(() => {
          navigate("/", { state: value });
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        toast.error("failed to create an account");
      }
    },
  });
  useEffect(() => {
    setFormError(formik.errors);
  }, [formik.errors]);

  return (
    <Form className="signup" onSubmit={formik.handleSubmit}>
      <FormControl
        icon="person"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
        errorMessage={
          formik.touched.name && formError.name ? formError.name : null
        }
        placeholder="enter name"
        name="name"
      />
      <FormControl
        icon="alternate_email"
        type="email"
        placeholder="Enter Email"
        onChange={formik.handleChange}
        value={formik.values.email}
        name="email"
        errorMessage={
          formik.touched.email && formError.email ? formError.email : null
        }
      />
      <FormControl
        icon="lock"
        type="password"
        placeholder="Enter Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        name="password"
        errorMessage={
          formik.touched.password && formError.password
            ? formError.password
            : null
        }
      />
      <FormControl
        icon="phonelink_lock"
        type="password"
        placeholder="Confirm password"
        name="confirm_password"
        onChange={formik.handleChange}
        value={formik.values.confirm_password}
        errorMessage={
          formik.touched.confirm_password && formError.confirm_password
            ? formError.confirm_password
            : null
        }
      />
      <ChackBox
        text="I agree to the Terms & Condition"
        name="agree"
        value={formik.values.agree}
        onChange={formik.handleChange}
        checked={formik.values.agree}
      />
      {formik.touched.agree && formError.agree && (
        <FormError className="terms-error ">{formError.agree}</FormError>
      )}
      {error && <FormError className="common-error ">{error}</FormError>}
      <Button type="submit" disabled={loading}>
        Submit now
      </Button>
      <div className="info">
        <span>
          Already have an account?
          <Link to="/login"> Login </Link>
          instead
        </span>
      </div>
    </Form>
  );
};

export default SignupForm;
