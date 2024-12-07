"use client";
import axios, {
  AxiosError,
  HttpStatusCode,
  type AxiosInstance,
} from "axios";
// import { cookies } from "next/headers";
// import getLocalStorage from "@/hooks/getLocalStorage";
// import moment from 'moment'
class Http {
  instance: AxiosInstance;
  private accessToken: string | undefined | null;
  private status: number | undefined;
  constructor() {
    if (typeof window !== "undefined") {
      this.accessToken = this.getCookie("jwt"); // Retrieve jwt from cookies
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
        if (response?.data?.token) {
          this.accessToken = response.data.token;
          document.cookie = `jwt=${response.data.token};path=/;`;
        }

        return response;
      },
      async (error: AxiosError) => {
        if (HttpStatusCode.Unauthorized == (error.response?.status as number)) {
          localStorage.removeItem("jwt");
          window.location.href = "/error";
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