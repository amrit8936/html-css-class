// =========================================================
// FormComponent.jsx — Student Registration Form
//
// Features:
//  - Controlled inputs via useState
//  - Real-time + on-submit field validation
//  - Success message + submitted data display card
//  - Reset clears everything (inputs, errors, data)
//  - Fully accessible (aria labels, role="alert")
//  - No external UI libraries — plain CSS only
// =========================================================

import { useState } from 'react';
import './FormComponent.css';

// ─────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────

// Emoji icons shown next to each field label
const ICONS = {
  fullName:       '👤',
  age:            '🎂',
  registrationId: '🪪',
  email:          '✉️',
  city:           '🏙️',
  role:           '🎓',
};

// Dropdown options for the Role field
const ROLE_OPTIONS = ['Student', 'Teacher', 'Scholar'];

// Blank slate for form fields
const EMPTY_FORM = {
  fullName:       '',
  age:            '',
  registrationId: '',
  email:          '',
  city:           '',
  role:           '',
};

// Blank slate for error messages (same keys as form)
const EMPTY_ERRORS = {
  fullName:       '',
  age:            '',
  registrationId: '',
  email:          '',
  city:           '',
  role:           '',
};

// Standard email format regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─────────────────────────────────────────────────────────
// validateField — validate a single field by name + value
// Returns: error string if invalid, '' if valid
// ─────────────────────────────────────────────────────────
function validateField(name, value) {
  const val = String(value).trim();

  switch (name) {
    case 'fullName':
      if (!val)          return 'Full Name is required.';
      if (val.length < 2) return 'Name must be at least 2 characters.';
      return '';

    case 'age': {
      if (!val) return 'Age is required.';
      const n = Number(val);
      if (!Number.isInteger(n) || n < 1 || n > 120)
        return 'Age must be a whole number between 1 and 120.';
      return '';
    }

    case 'registrationId':
      if (!val) return 'Registration ID is required.';
      return '';

    case 'email':
      if (!val)                    return 'Email is required.';
      if (!EMAIL_REGEX.test(val))  return 'Please enter a valid email address.';
      return '';

    case 'city':
      if (!val) return 'City is required.';
      return '';

    case 'role':
      if (!val) return 'Please select a role.';
      return '';

    default:
      return '';
  }
}

// ─────────────────────────────────────────────────────────
// validateAll — run validateField on every field at once
// Returns: { fieldName: errorString, … }
// ─────────────────────────────────────────────────────────
function validateAll(formData) {
  const errors = {};
  Object.keys(formData).forEach((key) => {
    errors[key] = validateField(key, formData[key]);
  });
  return errors;
}

// ─────────────────────────────────────────────────────────
// FormComponent — main functional component
// ─────────────────────────────────────────────────────────
function FormComponent() {

  // Live values of every input field
  const [formData, setFormData] = useState(EMPTY_FORM);

  // Per-field validation error strings
  const [errors, setErrors] = useState(EMPTY_ERRORS);

  // Whether a valid submission has been made
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Frozen snapshot of data displayed in the result card
  const [submittedData, setSubmittedData] = useState(null);

  // ── onChange: update field + validate it immediately ──
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the field value
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate just this field and update its error
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // ── onSubmit: validate all fields, store data if valid ──
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent browser page reload

    // Run full validation across all fields
    const newErrors = validateAll(formData);
    setErrors(newErrors);

    // If any field has an error, stop here
    const hasErrors = Object.values(newErrors).some((msg) => msg !== '');
    if (hasErrors) return;

    // All valid — save a snapshot and show result card
    setSubmittedData({ ...formData });
    setIsSubmitted(true);
  };

  // ── onReset: wipe everything back to initial state ────
  const handleReset = () => {
    setFormData(EMPTY_FORM);       // clear all input values
    setErrors(EMPTY_ERRORS);       // remove all error messages
    setIsSubmitted(false);         // hide success banner
    setSubmittedData(null);        // remove submitted data card
  };

  // Helper — true if the named field currently has an error
  const hasErr = (field) => Boolean(errors[field]);

  // ──────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────
  return (
    <div className="form-wrapper">

      {/* ════════════════════════════════════════════════
          Page heading
          ════════════════════════════════════════════════ */}
      <div className="page-title">
        <h1>🎓 Student Registration</h1>
        <p>Complete the form below to register your details</p>
      </div>

      {/* ════════════════════════════════════════════════
          Main glassmorphism card
          ════════════════════════════════════════════════ */}
      <div className="form-card">

        {/* Card header with icon */}
        <div className="form-header">
          <div className="form-header-icon">📋</div>
          <div className="form-header-text">
            <h2>Registration Form</h2>
            <p>
              Fields marked <span className="req-note">*</span> are required
            </p>
          </div>
        </div>

        {/* ── Success banner (visible after valid submit) ── */}
        {isSubmitted && (
          <div className="success-banner" role="status" aria-live="polite">
            <span className="s-icon">✅</span>
            <p>
              Registration successful! Your details are shown below.
            </p>
          </div>
        )}

        {/* ════════════════════════════════════════════════
            Form
            ════════════════════════════════════════════════ */}
        <form
          className="registration-form"
          onSubmit={handleSubmit}
          noValidate                      /* we handle validation ourselves */
          aria-label="Student Registration Form"
        >

          {/* ── Row 1: Full Name · Age ─────────────────── */}
          <div className="form-row">

            {/* Full Name */}
            <div className="field-group">
              <label htmlFor="fullName">
                {ICONS.fullName} Full Name <span className="req-star">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Alice Johnson"
                className={hasErr('fullName') ? 'is-error' : ''}
                aria-describedby="err-fullName"
                aria-invalid={hasErr('fullName')}
                autoComplete="name"
              />
              {/* Inline validation error */}
              {errors.fullName && (
                <span className="err-msg" id="err-fullName" role="alert">
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* Age */}
            <div className="field-group">
              <label htmlFor="age">
                {ICONS.age} Age <span className="req-star">*</span>
              </label>
              <input
                id="age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 20"
                min="1"
                max="120"
                className={hasErr('age') ? 'is-error' : ''}
                aria-describedby="err-age"
                aria-invalid={hasErr('age')}
              />
              {errors.age && (
                <span className="err-msg" id="err-age" role="alert">
                  {errors.age}
                </span>
              )}
            </div>

          </div>

          {/* ── Row 2: Registration ID · Email ─────────── */}
          <div className="form-row">

            {/* Registration ID */}
            <div className="field-group">
              <label htmlFor="registrationId">
                {ICONS.registrationId} Registration ID <span className="req-star">*</span>
              </label>
              <input
                id="registrationId"
                type="text"
                name="registrationId"
                value={formData.registrationId}
                onChange={handleChange}
                placeholder="e.g. REG-2024-001"
                className={hasErr('registrationId') ? 'is-error' : ''}
                aria-describedby="err-registrationId"
                aria-invalid={hasErr('registrationId')}
              />
              {errors.registrationId && (
                <span className="err-msg" id="err-registrationId" role="alert">
                  {errors.registrationId}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="field-group">
              <label htmlFor="email">
                {ICONS.email} Email <span className="req-star">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. alice@example.com"
                className={hasErr('email') ? 'is-error' : ''}
                aria-describedby="err-email"
                aria-invalid={hasErr('email')}
                autoComplete="email"
              />
              {errors.email && (
                <span className="err-msg" id="err-email" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

          </div>

          {/* ── Row 3: City · Role ─────────────────────── */}
          <div className="form-row">

            {/* City */}
            <div className="field-group">
              <label htmlFor="city">
                {ICONS.city} City <span className="req-star">*</span>
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. New York"
                className={hasErr('city') ? 'is-error' : ''}
                aria-describedby="err-city"
                aria-invalid={hasErr('city')}
                autoComplete="address-level2"
              />
              {errors.city && (
                <span className="err-msg" id="err-city" role="alert">
                  {errors.city}
                </span>
              )}
            </div>

            {/* Role — dropdown */}
            <div className="field-group">
              <label htmlFor="role">
                {ICONS.role} Role <span className="req-star">*</span>
              </label>
              <div className="select-wrap">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={hasErr('role') ? 'is-error' : ''}
                  aria-describedby="err-role"
                  aria-invalid={hasErr('role')}
                >
                  {/* Disabled placeholder option */}
                  <option value="" disabled>Select a role…</option>

                  {/* Dynamically render options from ROLE_OPTIONS */}
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              {errors.role && (
                <span className="err-msg" id="err-role" role="alert">
                  {errors.role}
                </span>
              )}
            </div>

          </div>

          {/* ── Buttons: Submit + Reset ─────────────────── */}
          <div className="btn-group">
            <button
              type="submit"
              id="submit-btn"
              className="btn btn-submit"
            >
              🚀 Submit Registration
            </button>

            <button
              type="button"
              id="reset-btn"
              className="btn btn-reset"
              onClick={handleReset}
            >
              🔄 Reset
            </button>
          </div>

        </form>
      </div>

      {/* ════════════════════════════════════════════════
          Submitted data card — rendered only after submit
          ════════════════════════════════════════════════ */}
      {submittedData && (
        <>
          {/* Section divider label */}
          <div className="divider-label" aria-hidden="true">
            Submitted Information
          </div>

          <div
            className="submitted-card"
            aria-live="polite"
            aria-label="Submitted Registration Details"
          >

            {/* Card header */}
            <div className="submitted-header">
              <h3>📄 Registration Details</h3>
              <span className="status-badge">✓ Registered</span>
            </div>

            {/* 2-column data grid */}
            <div className="data-grid">

              <div className="data-tile">
                <div className="tile-label">{ICONS.fullName} Full Name</div>
                <div className="tile-value">{submittedData.fullName}</div>
              </div>

              <div className="data-tile">
                <div className="tile-label">{ICONS.age} Age</div>
                <div className="tile-value">{submittedData.age} years</div>
              </div>

              <div className="data-tile">
                <div className="tile-label">{ICONS.registrationId} Registration ID</div>
                <div className="tile-value">{submittedData.registrationId}</div>
              </div>

              <div className="data-tile">
                <div className="tile-label">{ICONS.email} Email</div>
                <div className="tile-value">{submittedData.email}</div>
              </div>

              <div className="data-tile">
                <div className="tile-label">{ICONS.city} City</div>
                <div className="tile-value">{submittedData.city}</div>
              </div>

              <div className="data-tile">
                <div className="tile-label">{ICONS.role} Role</div>
                <div className="tile-value">
                  <span className="role-pill">{submittedData.role}</span>
                </div>
              </div>

            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default FormComponent;
