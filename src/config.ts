import Swal from "sweetalert2";
export const baseUrl = "http://localhost:3560/api/v1";
export const Toast = Swal.mixin({
	toast: true,
	position: "bottom-right",
	iconColor: "white",
	customClass: {
		popup: "colored-toast",
	},
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true,
});
