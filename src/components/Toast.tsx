import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast: React.FC = () => (
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
);

export const showToast = (message: string, type: "success" | "error" | "info") => {
    if (type === "success") {
        toast.success(message);
    } else if (type === "error") {
        toast.error(message);
    } else {
        toast.info(message);
    }
};

export default Toast;
