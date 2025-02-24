"use client"; // 👈 Important! Makes this a Client Component

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return <Toaster position="top-center" />;
};

export default ToasterProvider;
