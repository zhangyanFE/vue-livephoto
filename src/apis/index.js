import http from "@/lib/request";

export const getList = params => {
  return http.get("/api/meeting/getMeeting", {
    params: { ...params }
  });
};
