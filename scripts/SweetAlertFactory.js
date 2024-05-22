// import Swal from 'sweetalert2';

class SweetAlert {
    constructor(type, title, message) {
        this.type = type;
        this.title = title;
        this.message = message;
    }

    showAlert() {
        let options = {
            title: this.title,
            html: `<p class="textSweetAlert">${this.message}</p>`,
            confirmButtonColor: "#6e7881",
            allowOutsideClick: false,
            timer: 7000,
            customClass: {
                confirmButton: "btnConfirmSweetAlert",
                cancelButton: "btnCancelSweetAlert",
                popup: "popupSweetAlert"
            },
        };

        switch (this.type) {
            case "warning":
                options = {
                    ...options,
                    icon: "warning",
                };
                break;
            case "info":
                options = {
                    ...options,
                    icon: "info",
                };
                break;    
            case "success":
                options = {
                    ...options,
                    icon: "success",
                    timer: 5000,
                };
                break;
            case "question":
                options = {
                    ...options,
                    icon: "question",
                    confirmButtonColor: "#ff3b3c",
                    confirmButtonText: "Eliminar",
                    cancelButtonText: "Cancelar",
                    showCancelButton: true,
                };
                break;
            default:
                break;
        }
        
        return Swal.fire({...options});
    }
}

class SweetAlertFactory {
    createAlert(type, title, message) {
        return new SweetAlert(type, title, message);
    }
}

export default SweetAlertFactory;