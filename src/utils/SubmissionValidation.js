export const validateField = (name, value) => {
  switch (name) {
    case 'firstname':
      if (!value.trim()) return 'First name is required';
      break;
    case 'lastname':
      if (!value.trim()) return 'Last name is required';
      break;
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
      break;
    case 'phonenumber':
      if (!value.trim()) return 'Phone number is required';
      if (!/^\d{7,15}$/.test(value))
        return 'Phone number must be between 7 to 15 digits';
      break;
    case 'institution':
      if (!value.trim()) return 'Institution is required';
      break;
    case 'country':
      if (!value) return 'Country is required';
      break;
    case 'journal':
      if (!value) return 'Journal is required';
      break;
    default:
      return null;
  }
  return null;
};
