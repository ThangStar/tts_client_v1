import axios, {
  AxiosError,
  HttpStatusCode,
  type AxiosInstance,
} from "axios";
class Http {
  instance: AxiosInstance;
  private accessToken: string | undefined | null;
  private status: number | undefined;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 60000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;