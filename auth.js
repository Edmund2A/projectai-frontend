// ── Login Form Validation ──
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginBtnText = document.getElementById('loginBtnText');
    const loginSpinner = document.getElementById('loginSpinner');

    let valid = true;

    // Clear previous errors
    emailError.textContent = '';
    passwordError.textContent = '';

    // Validate email
    if (!email.value.trim()) {
      emailError.textContent = 'Please enter your email address.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    }

    // Validate password
    if (!password.value.trim()) {
      passwordError.textContent = 'Please enter your password.';
      valid = false;
    }

    if (valid) {
      loginBtnText.textContent = 'Logging in...';
      loginSpinner.classList.remove('hidden');

      // Send data to backend
      fetch('${API_URL}/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      })
      .then(res => res.json())
      .then(data => {
        loginBtnText.textContent = 'Log in';
        loginSpinner.classList.add('hidden');

        if (data.token) {
          // Save token and user info
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          // Redirect to dashboard
          window.location.href = 'dashboard.html';
        } else {
          document.getElementById('emailError').textContent = data.message || 'Invalid email or password.';
        }
      })
      .catch(err => {
        loginBtnText.textContent = 'Log in';
        loginSpinner.classList.add('hidden');
        document.getElementById('emailError').textContent = 'Could not connect to server. Please try again.';
      });
    }
  });
}

// ── Password Toggle ──
const togglePassword = document.getElementById('togglePassword');
if (togglePassword) {
  togglePassword.addEventListener('click', () => {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeIcon.textContent = '🙈';
    } else {
      passwordInput.type = 'password';
      eyeIcon.textContent = '👁';
    }
  });
}

// ── Google Login (placeholder) ──
const googleLogin = document.getElementById('googleLogin');
if (googleLogin) {
  googleLogin.addEventListener('click', () => {
    alert('Google login will be connected to the backend shortly.');
  });
}


// Bottom
// ── Signup Form Validation ──
const signupForm = document.getElementById('signupForm');

if (signupForm) {

  // Password strength checker
  const signupPassword = document.getElementById('signupPassword');
  if (signupPassword) {
    signupPassword.addEventListener('input', () => {
      const val = signupPassword.value;
      const seg1 = document.getElementById('seg1');
      const seg2 = document.getElementById('seg2');
      const seg3 = document.getElementById('seg3');
      const seg4 = document.getElementById('seg4');
      const label = document.getElementById('strengthLabel');

      // Reset
      [seg1, seg2, seg3, seg4].forEach(s => {
        s.className = 'strength-seg';
      });

      let strength = 0;
      if (val.length >= 6) strength++;
      if (val.length >= 10) strength++;
      if (/[A-Z]/.test(val) && /[0-9]/.test(val)) strength++;
      if (/[^A-Za-z0-9]/.test(val)) strength++;

      if (strength === 1) {
        seg1.classList.add('weak');
        label.textContent = 'Weak';
        label.style.color = '#e53e3e';
      } else if (strength === 2) {
        seg1.classList.add('fair');
        seg2.classList.add('fair');
        label.textContent = 'Fair';
        label.style.color = '#dd6b20';
      } else if (strength === 3) {
        seg1.classList.add('good');
        seg2.classList.add('good');
        seg3.classList.add('good');
        label.textContent = 'Good';
        label.style.color = '#d69e2e';
      } else if (strength === 4) {
        [seg1, seg2, seg3, seg4].forEach(s => s.classList.add('strong'));
        label.textContent = 'Strong';
        label.style.color = '#38a169';
      } else {
        label.textContent = '';
      }
    });
  }

  // Password toggle for signup
  const toggleSignupPassword = document.getElementById('toggleSignupPassword');
  if (toggleSignupPassword) {
    toggleSignupPassword.addEventListener('click', () => {
      const input = document.getElementById('signupPassword');
      const icon = document.getElementById('signupEyeIcon');
      input.type = input.type === 'password' ? 'text' : 'password';
      icon.textContent = input.type === 'password' ? '👁' : '🙈';
    });
  }

  // Password toggle for confirm
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  if (toggleConfirmPassword) {
    toggleConfirmPassword.addEventListener('click', () => {
      const input = document.getElementById('confirmPassword');
      const icon = document.getElementById('confirmEyeIcon');
      input.type = input.type === 'password' ? 'text' : 'password';
      icon.textContent = input.type === 'password' ? '👁' : '🙈';
    });
  }

  // Form submission
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    // Clear all errors
    const errors = document.querySelectorAll('.error-msg');
    errors.forEach(e => e.textContent = '');

    // First name
    const firstName = document.getElementById('firstName');
    if (!firstName.value.trim()) {
      document.getElementById('firstNameError').textContent = 'First name is required.';
      valid = false;
    }

    // Last name
    const lastName = document.getElementById('lastName');
    if (!lastName.value.trim()) {
      document.getElementById('lastNameError').textContent = 'Last name is required.';
      valid = false;
    }

    // Email
    const signupEmail = document.getElementById('signupEmail');
    if (!signupEmail.value.trim()) {
      document.getElementById('signupEmailError').textContent = 'Email address is required.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail.value)) {
      document.getElementById('signupEmailError').textContent = 'Please enter a valid email.';
      valid = false;
    }

    // University
    const university = document.getElementById('university');
    if (!university.value.trim()) {
      document.getElementById('universityError').textContent = 'University name is required.';
      valid = false;
    }

    // Department
    const department = document.getElementById('department');
    if (!department.value.trim()) {
      document.getElementById('departmentError').textContent = 'Department is required.';
      valid = false;
    }

    // Country
    const country = document.getElementById('country');
    if (!country.value) {
      document.getElementById('countryError').textContent = 'Please select your country.';
      valid = false;
    }

    // Level
    const level = document.getElementById('level');
    if (!level.value) {
      document.getElementById('levelError').textContent = 'Please select your academic level.';
      valid = false;
    }

    // Password
    const password = document.getElementById('signupPassword');
    if (!password.value.trim()) {
      document.getElementById('signupPasswordError').textContent = 'Password is required.';
      valid = false;
    } else if (password.value.length < 6) {
      document.getElementById('signupPasswordError').textContent = 'Password must be at least 6 characters.';
      valid = false;
    }

    // Confirm password
    const confirmPassword = document.getElementById('confirmPassword');
    if (!confirmPassword.value.trim()) {
      document.getElementById('confirmPasswordError').textContent = 'Please confirm your password.';
      valid = false;
    } else if (confirmPassword.value !== password.value) {
      document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
      valid = false;
    }

    // Terms
    const terms = document.getElementById('terms');
    if (!terms.checked) {
      document.getElementById('termsError').textContent = 'You must agree to the terms to continue.';
      valid = false;
    }

    if (valid) {
      const btnText = document.getElementById('signupBtnText');
      const spinner = document.getElementById('signupSpinner');
      btnText.textContent = 'Creating account...';
      spinner.classList.remove('hidden');

      // Simulate API call — replace with real backend later
      setTimeout(() => {
        btnText.textContent = 'Create my account';
        spinner.classList.add('hidden');
        // Redirect to dashboard after successful signup
        window.location.href = 'dashboard.html';
      }, 1500);
    }
  });
}

// ── Google Signup (placeholder) ──
const googleSignup = document.getElementById('googleSignup');
if (googleSignup) {
  googleSignup.addEventListener('click', () => {
    alert('Google signup will be connected to the backend shortly.');
  });
}
