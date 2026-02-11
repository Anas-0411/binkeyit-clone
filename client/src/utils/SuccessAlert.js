import Swal from "sweetalert2";

const successAlert = (title) => {
  const alert = Swal.fire({
    icon: "success",
    title: title,
    confirmButtonColor: "#2f855a",
    timer: 1500,
  });
  return alert;
};

export default successAlert;
