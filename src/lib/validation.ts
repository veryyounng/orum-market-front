export const validateEmail = (email: string) => {
  const validEmailRegex = /^\S+@\S+\.\S+$/;
  return validEmailRegex.test(email);
};

export const validatePassword = (password: string) => {
  // Assuming the password criteria is a minimum of 8 characters
  return password.length >= 8;
};

export const validateProductName = (name: string) => {
  return name.length >= 2;
};

export const validateProductContent = (content: string) => {
  return content.length >= 10;
};

export const validateProductPrice = (price: number | string): boolean => {
  const numricPrice = typeof price === 'string' ? parseFloat(price) : price;
  return Number.isInteger(numricPrice);
};

export const validateProductShippingFees = (shippingFees: number) => {
  return shippingFees % 1 === 0;
};
