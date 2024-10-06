import Swal from "sweetalert2";

const defaultOptions = {
  position: "bottom-start",
  toast: true,
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
};

export const showToast = (title, icon = "success") => {
  Swal.fire({
    ...defaultOptions,
    title,
    icon,
  });
};
