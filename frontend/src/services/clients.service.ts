import axios from 'axios';
import { loadAbort } from '../utilities';
import { getAllCustomersUrl } from '../constants/urls';

export const getAllClients = () => {
    const controller = loadAbort();
    return {
        call: axios.get(getAllCustomersUrl, { signal: controller.signal }),
        controller,
    }
}

export const getClientById = (id: string | undefined) => {
    const controller = loadAbort();
    return {
        call: axios.get(`${getAllCustomersUrl}/${id}`, { signal: controller.signal }),
        controller,
    }
}