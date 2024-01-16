import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.API_URL,
});

type AuthInfo = {
  token: string;
  expires: Date;
};

let authInfo: AuthInfo;

const getAuthInfo: () => Promise<AuthInfo> = async () => {
  const response = await apiClient.post<AuthInfo & { expires: string }>(
    "tokens",
    {
      identity: process.env.API_USER,
      secret: process.env.API_PASS,
    },
  );

  return {
    token: response.data.token,
    expires: new Date(response.data.expires),
  };
};

const hasAValidToken = () => {
  if (!authInfo) {
    return false;
  }

  const now = Date.now();

  return now < authInfo.expires.getTime();
};

apiClient.interceptors.request.use(async (config) => {
  if (config.url === "tokens") {
    return config;
  }

  console.debug(`Starting request to ${config.url}`);

  if (!hasAValidToken()) {
    console.debug("Getting new token");
    authInfo = await getAuthInfo();
    console.debug("Got new token");
  }

  config.headers["Authorization"] = `Bearer ${authInfo.token}`;

  return config;
});

apiClient.interceptors.response.use((response) => {
  console.debug(`Finished request to ${response.config.url}`);

  return response;
});
