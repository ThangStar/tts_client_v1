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
    if (typeof window !== "undefined") {
      this.accessToken = this.getCookie("jwt_voice"); // Retrieve jwt from cookies
    }
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 20000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        console.log("response", response.data.data)
        if (response?.data?.data?.token) {
          this.accessToken = response.data.data.token;
          document.cookie = `jwt_voice=${response.data.data.token};path=/;`;
        }

        return response;
      },
      async (error: AxiosError) => {
        if (HttpStatusCode.Unauthorized == (error.response?.status as number)) {
          localStorage.removeItem("jwt_voice");
          window.location.href = "/";
        }
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized,
            HttpStatusCode.Forbidden,
          ].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data;
          if (this.status != error.response?.status) {
            this.status = error.response?.status as number;
            let time = 5000;
            if (data.drawOut == 1) {
              time = 15000;
            }
            setTimeout(() => {
              this.status = undefined;
            }, time);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getCookie(name: string): string | null {
    if (typeof document !== "undefined") {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }
}

const http = new Http().instance;

export default http;