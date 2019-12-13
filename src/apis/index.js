import http from "@/lib/api";

http.defaults.headers.post["Content-Type"] = "application/json";

export const getList = params => {
  return http.get("/api/list", { ...params });
};
