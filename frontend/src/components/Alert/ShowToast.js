import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const showToast=(message,type)=>{
    switch(type){
        case 'success':
            toast.success(message, {   
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true}
                );
                break;
        case 'error':
            toast.error(message, {
                        position: "top-right",
                        autoClose: 3500,
                        hideProgressBar:false,
                        closeOnClick:true}
                        );
        
                break;
        case 'info':
            toast.info(message, {
                position: "top-right",
                autoClose:3500,
                hideProgressBar:false,
                closeOnClick:true}
                );
                break;       
    }
}
export default showToast;