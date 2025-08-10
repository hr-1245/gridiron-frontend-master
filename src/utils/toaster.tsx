import toast from "react-hot-toast";

const Toaster = (type: "success" | "error", message: string, isMiddle?: boolean) => {
    return toast[type](message, { duration: 4000, position: isMiddle ? "top-center" : "top-right" });
};

export default Toaster;