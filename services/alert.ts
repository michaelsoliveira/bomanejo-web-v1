import { createRef } from 'react';
import { toast } from 'react-toastify';


class AlertService{
    toastId: any

    constructor() {
        this.toastId = createRef()
    }
    // convenience methods
    success(message: any, options?: any) {
        if (!toast.isActive(this.toastId.current)) {
            toast.success(message, { ...options });
        }
    }

    error(message: any, options?: any) {
        if (!toast.isActive(this.toastId.current)) {
            toast.error(message, { ...options });
        }
    }

    info(message: any, options?: any) {
        if (!toast.isActive(this.toastId.current)) {
            toast.info(message, { ...options });
        }
    }

    warn(message: any, options?: any) {
        if (!toast.isActive(this.toastId.current)) {
            toast.warn(message, { ...options });    
        }
        
    }
}

export default new AlertService

