export const LoginStart = (userCredentials = {
  type: "LOGIN_START",
});

export const LoginSukses = (user = {
  type: "LOGIN_SUKSES",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Logout = () => ({
  type: "LOGOUT",
});

export const UpdateStart = (userCredentials = {
  type: "UPDATE_START",
});

export const UpdateSukses = (user = {
  type: "UPDATE_SUKSES",
  payload: user,
});

export const UpdateFailure = () => ({
  type: "UPDATE_FAILURE",
});
