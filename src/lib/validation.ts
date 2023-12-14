export const validateEmail = (email: string) => {
  const validEmailRegex = /^\S+@\S+\.\S+$/;
  return validEmailRegex.test(email);
};

export const validatePassword = (password: string) => {
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

export const validateTel = (tel: string) => {
  const validTelRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
  return validTelRegex.test(tel);
};
