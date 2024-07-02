import { config } from 'dotenv'
config();
import axios, { AxiosInstance, AxiosResponse } from 'axios';


const token = process.env.LENDSQR_API_KEY

interface VerificationResponse {
    status: string;
    message: string;
    data?: object; 
  }

class VerificationService {

    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://adjutor.lendsqr.com/v2/verification',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    public async blackListIdentity(identity: string): Promise<VerificationResponse> {
        try {
            const response: AxiosResponse<VerificationResponse> = await this.axiosInstance.get(`/karma/${identity}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data;
            }
            throw error;
        }
    }

}

export default VerificationService;



