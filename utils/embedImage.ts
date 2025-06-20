import { BASE_URL } from "@/constants/BaseUrl";

const embedImage = (path: string) => {
  return `${BASE_URL}${path}`;
};

export { embedImage };
