/**
 * validate.js
 * Small shared helpers for showing/clearing field-level errors.
 * PRD P0.4: errors render under the field, all at once on submit,
 * and clear live once the field becomes valid.
 */

function showFieldError(fieldWrapperEl, message) {
  fieldWrapperEl.classList.add('has-error');
  const errorEl = fieldWrapperEl.querySelector('.error-text');
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(fieldWrapperEl) {
  fieldWrapperEl.classList.remove('has-error');
  const errorEl = fieldWrapperEl.querySelector('.error-text');
  if (errorEl) errorEl.textContent = '';
}

function clearAllErrors(formEl) {
  formEl.querySelectorAll('.field').forEach((el) => clearFieldError(el));
}

/** Basic "looks like an email" check: has @, and a dot after the @. */
function isValidEmailShape(email) {
  const at = email.indexOf('@');
  if (at <= 0) return false;
  const domainPart = email.slice(at + 1);
  return domainPart.includes('.') && domainPart.indexOf('.') > 0 && !domainPart.endsWith('.');
}

/** Password must be 8+ chars, containing at least one letter and one digit. */
function isValidPasswordShape(password) {
  return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
}

/** Live-clear a field's error as soon as it becomes valid, wired per-field. */
function wireLiveClear(inputEl, fieldWrapperEl, validatorFn) {
  inputEl.addEventListener('input', () => {
    if (fieldWrapperEl.classList.contains('has-error') && validatorFn(inputEl.value)) {
      clearFieldError(fieldWrapperEl);
    }
  });
}
