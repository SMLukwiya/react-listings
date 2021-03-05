export const checkValidity = (field, value, rules) => {
  let isValid = true;
  let message = '';
  if (!rules) return;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
    message = !isValid ? `${field} field cannot be empty!` : '';
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    message = !isValid ? `${field} field cannot be less than ${rules.minLength} characters!` : '';
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    message = !isValid ? `${field} field cannot be less than ${rules.minLength} characters!` : '';
  }

  if (field === 'email') {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,7}$/;
    isValid = re.test(value.toLowerCase()) && isValid;
    message = !isValid ? 'please enter a valid email address!' : ''
  }

  return { isValid, message };
}

export const moneyFormatter = (num) => {
  let num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}
