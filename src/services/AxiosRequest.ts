import Axios from "axios";
import { BASE_URL } from "./API";
/**
 * @GET request
 * @Params
 * @endPoint : Url to hit.
 * @Header : Authorization Token.
 */
function getAuthTokenFromLocalStorage(): string | null {
  if (typeof localStorage !== "undefined") {
    const persistStore = localStorage.getItem("persist:root");
    if (persistStore) {
      const parsedPersistStore = JSON.parse(persistStore);
      const userData = JSON.parse(parsedPersistStore.user);
      if (userData && userData.accessToken) {
        return userData.accessToken;
      }
    }
  }
  return null;
}

Axios.interceptors.request.use(
  (config: any) => {
    const token = getAuthTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const GET: any = async (
  endPoint: string,
  header: string,
  signal?: AbortSignal
): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get(endPoint, {
      signal,
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((response: any) => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch((error: Error) => {
        console.error(error);
        reject(error);
      });
  });
};

/**
 * @POST request
 * @Params
 * @BaseUrl : Url to hit.
 * @Header : Authorization Token.
 */
export const POST = async (
  endPoint: string,
  data?: [] | {},
  token = ""
): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.post(endPoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: any) => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch((error: Error) => {
        console.error("response error", error);
        reject(error);
      });
  });
};
/**
 * @PUT request
 * @Params
 * @Header : Authorization Token.
 */
export const PUT = async (
  endPoint: string,
  data: [] | {},
  token = ""
): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.put(endPoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: any) => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch((error: Error) => {
        console.error({ error });
        reject(error);
      });
  });
};

/**
 * @DELETE request
 * @Params
 * @Header : Authorization Token.
 */
export const DELETE = async (
  endpoint: string,
  header?: string,
  data?: any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.delete(endpoint, {
      data,
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((res: any) => {
        if (res) {
          resolve(res.data);
        }
      })
      .catch((error: Error) => {
        // console.error({ error });
        reject(error);
      });
  });
};