// Basic form validation + accessible error messaging demo.
//
// Key ideas:
// - Read values from inputs
// - Validate and show field-level errors
// - Use ARIA attributes so assistive tech can understand errors
// - Focus the first invalid field on submit

// Grab the elements we need from the page.
const form = document.querySelector('#signup-form');
const message = document.querySelector('#form-message');

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

// These elements display the error text for each field.
const nameError = document.querySelector('#name-error');
const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');

if (
  !form ||
  !message ||
  !nameInput ||
  !emailInput ||
  !passwordInput ||
  !nameError ||
  !emailError ||
  !passwordError
) {
  throw new Error('Missing expected elements in the page');
}

function setFieldError(input, errorEl, text) {
  // Set or clear a field-specific error.
  // When invalid, we set:
  // - aria-invalid="true"
  // - aria-describedby=<id of the element containing the error message>
  // This helps screen readers announce the error in context.
  if (text) {
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorEl.id);
    errorEl.textContent = text;
  } else {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    errorEl.textContent = '';
  }
}

function validate() {
  // Validate all fields and return:
  // - ok: whether the form is valid
  // - firstInvalid: the first input that failed validation (for focusing)
  message.textContent = '';

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Track the first invalid field so we can focus it on submit.
  let firstInvalid = null;

  if (!name) {
    setFieldError(nameInput, nameError, 'Enter your name.');
    firstInvalid ??= nameInput;
  } else if (name.length < 2) {
    setFieldError(nameInput, nameError, 'Name must be at least 2 characters.');
    firstInvalid ??= nameInput;
  } else {
    setFieldError(nameInput, nameError, '');
  }

  if (!email) {
    setFieldError(emailInput, emailError, 'Enter your email address.');
    firstInvalid ??= emailInput;
  } else if (!emailInput.checkValidity()) {
    setFieldError(emailInput, emailError, 'Enter a valid email address (like name@example.com).');
    firstInvalid ??= emailInput;
  } else {
    setFieldError(emailInput, emailError, '');
  }

  if (!password) {
    setFieldError(passwordInput, passwordError, 'Enter a password.');
    firstInvalid ??= passwordInput;
  } else if (password.length < 8) {
    setFieldError(passwordInput, passwordError, 'Password must be at least 8 characters.');
    firstInvalid ??= passwordInput;
  } else {
    setFieldError(passwordInput, passwordError, '');
  }

  return { ok: !firstInvalid, firstInvalid };
}

form.addEventListener('submit', (event) => {
  // Handle submit ourselves so we can show custom messages.
  event.preventDefault();

  const { ok, firstInvalid } = validate();
  if (!ok) {
    // A simple form-level message to supplement the field-level errors.
    message.textContent = 'Fix the errors and try again.';
    firstInvalid.focus();
    return;
  }

  // Demo success path.
  message.textContent = 'Success! Your account was created (demo).';
  form.reset();
});

// Optional: validate as you type (kept lightweight for week 2)
form.addEventListener('input', () => {
  validate();
});
