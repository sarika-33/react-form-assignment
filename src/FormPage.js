import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "+91",
    country: "",
    city: "",
    pan: "",
    aadhaar: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name required";
    if (!form.username.trim()) newErrors.username = "Username required";

    if (!form.email.trim()) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";

    if (!form.password.trim()) newErrors.password = "Password required";

    if (!form.phone.trim()) newErrors.phone = "Phone required";
    else if (form.phone.length < 10) newErrors.phone = "Min 10 digits";

    if (!form.country.trim()) newErrors.country = "Country required";
    if (!form.city.trim()) newErrors.city = "City required";

    if (!form.pan.trim()) newErrors.pan = "PAN required";
    else if (!/[A-Z]{5}[0-9]{4}[A-Z]/.test(form.pan))
      newErrors.pan = "Invalid PAN";

    if (!form.aadhaar.trim()) newErrors.aadhaar = "Aadhaar required";
    else if (!/^[0-9]{12}$/.test(form.aadhaar))
      newErrors.aadhaar = "Aadhaar must be 12 digits";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/details", { state: form });
    }
  };

  const isValid = Object.keys(errors).length === 0 &&
    Object.values(form).every(val => val.trim() !== "");

  return (
    <div style={styles.container}>
      <h2>User Registration Form</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* FIRST NAME */}
        <InputField
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        {/* LAST NAME */}
        <InputField
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />

        {/* USERNAME */}
        <InputField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          error={errors.username}
        />

        {/* EMAIL */}
        <InputField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        {/* PASSWORD */}
        <div style={styles.inputWrapper}>
          <label>Password</label>
          <div style={{ display: "flex" }}>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: errors.password ? "red" : "#ccc"
              }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={styles.showBtn}
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p style={styles.error}>{errors.password}</p>}
        </div>

        {/* PHONE */}
        <div style={styles.row}>
          <select
            name="countryCode"
            value={form.countryCode}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
          
          <InputField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />
        </div>

        {/* COUNTRY */}
        <InputField
          label="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
          error={errors.country}
        />

        {/* CITY */}
        <InputField
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          error={errors.city}
        />

        {/* PAN */}
        <InputField
          label="PAN"
          name="pan"
          value={form.pan.toUpperCase()}
          onChange={handleChange}
          error={errors.pan}
        />

        {/* AADHAAR */}
        <InputField
          label="Aadhaar"
          name="aadhaar"
          value={form.aadhaar}
          onChange={handleChange}
          error={errors.aadhaar}
        />

        <button
          type="submit"
          disabled={!isValid}
          style={{
            ...styles.submit,
            backgroundColor: isValid ? "#007bff" : "gray"
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;

const InputField = ({ label, name, value, onChange, error }) => (
  <div style={styles.inputWrapper}>
    <label>{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      style={{
        ...styles.input,
        borderColor: error ? "red" : "#ccc"
      }}
    />
    {error && <p style={styles.error}>{error}</p>}
  </div>
);

const styles = {
  container: { maxWidth: 450, margin: "auto", padding: 20 },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  inputWrapper: { display: "flex", flexDirection: "column" },
  input: { padding: 8, borderRadius: 4, border: "1px solid #ccc" },
  select: { padding: 8 },
  row: { display: "flex", gap: 10, alignItems: "center" },
  showBtn: {
    padding: "8px 10px",
    border: "1px solid #ccc",
    cursor: "pointer"
  },
  error: { color: "red", fontSize: "0.8rem" },
  submit: {
    padding: 10,
    border: "none",
    color: "white",
    fontSize: "1rem",
    borderRadius: 5,
    cursor: "pointer"
  }
};
