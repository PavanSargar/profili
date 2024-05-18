export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export interface MethodsEntity {
  GET: "get";
  POST: "post";
  PUT: "put";
  PATCH: "patch";
  DELETE: "delete";
}

//* Use these endpoints while make api requests
//* these are example requests change as per your routes
export const Config = {
  baseURL: BASE_URL,
  auth: {
    root: "/auth",
    login: "/login",
    signup: "/signup",
    logout: "/logout",
    forgetPassword: "/forget-password",
    verifyOtp: "/verify-otp",
    newPassword: "/new-password/:userId",
  },
  methods: {
    GET: "get",
    POST: "post",
    PUT: "put",
    PATCH: "patch",
    DELETE: "delete",
  } as MethodsEntity,
};
