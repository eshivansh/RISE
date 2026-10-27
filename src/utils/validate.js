export function validateLogin(form) {
  const errors = {};
  if (!form.email.trim()) errors.email = "Email is required";
  if (!form.pass) errors.pass = "Password is required";
  return errors;
}

export function validateSignup(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Full name is required";
  if (!form.email.includes("@")) errors.email = "Enter a valid email";
  if (form.pass.length < 8) errors.pass = "At least 8 characters";
  if (form.pass !== form.confirm) errors.confirm = "Passwords do not match";
  return errors;
}
