export const URL_FRONTEND =
  process.env.NODE_ENV === "production"
    ? "http://frontend.corp.itsl.tel"
    : "http://localhost:3000";