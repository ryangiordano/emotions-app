import { toast } from "react-toastify";

export const errorToast = (message?: string) =>
  toast(message ?? "Something went wrong...", {
    className: "red",
  });

export const successToast = (message?: string) =>
  toast(message ?? "Success!", {
    className: "green",
  });
