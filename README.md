# Signup Form Validation

## 1) What the form is for
This form is for [creating a demo signup account].

## 2) Inputs + validation rules
- Name:
  - Required
  - Must be at least 2 characters
- Email:
  - Required
  - Must be a valid email format (example: name@example.com)
- Password:
  - Required
  - Must be at least 8 characters

## 3) How feedback is presented
- Field errors appear [under each input] in an error message element.
- Each invalid input gets `aria-invalid="true"` and is linked to its error text using `aria-describedby`.
- A form-level message appears [at the top/bottom of the form] saying “Fix the errors and try again.”
- On success, a message appears [in the form message area] and the form resets.

## 4) One DevTools insight used
I used DevTools [Console] to [check for errors], and DevTools [Elements] to verify the input fields update `aria-invalid` / `aria-describedby` during validation.
