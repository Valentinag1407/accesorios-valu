export const initialFormData = {
  merchantId: import.meta.env.VITE_MERCHANT_ID_PAYU,
  accountId: import.meta.env.VITE_ACCOUNT_ID_PAYU,
  description: "",
  referenceCode: "",
  amount: "",
  tax: "0",
  taxReturnBase: "0",
  currency: "COP",
  signature: "",
  test: import.meta.env.VITE_MODE_PAYU,
  buyerEmail: "",
  buyerFullName: "",
  telephone: "",
  responseUrl: "http://localhost:5173/confirmation",
  confirmationUrl: "http://localhost:5173/Productos",
};
