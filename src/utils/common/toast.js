import { toast as toastFunc } from 'react-toastify';

export const toast=({message, type})=>{
    toastFunc(message,{
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: 'light',
        type: type,
        draggablePercent: 100
    })
}
