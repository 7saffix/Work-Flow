import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

const useAuthStore = create((set) => {
  // Load from localStorage once when store initializes
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    user: user || null,
    token: token || null,

    signup: async (credentials) => {
      try {
        const response = await axios.post("/api/auth/signup", credentials);
        set({ user: response.data });
        toast.success(response?.data?.message || "Registration successful");
      } catch (error) {
        set({ user: null });
        toast.error(error?.response?.data?.message || "Registration failed");
      }
    },

    signin: async (credentials) => {
      try {
        const response = await axios.post("/api/auth/login", credentials);
        const { user, token, message } = response.data;

        set({ user, token });
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(message || "Login successful");
        return true;
      } catch (error) {
        toast.error(error?.response?.data?.message || "Login failed");
        set({ user: null, token: null });
        return false;
      }
    },

    logout: async () => {
      try {
        await axios.get("/api/auth/logout");
        set({ user: null, token: null });
        localStorage.clear();
        toast.success("Logout success");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Logout failed");
      }
    },
  };
});

export default useAuthStore;

// import { create } from "zustand";
// import axios from "axios";
// import { toast } from "sonner";

// const useAuthStore = create((set) => ({
//   user: null,
//   token: null,

//   signup: async (credentials) => {
//     try {
//       const response = await axios.post("/api/auth/signup", credentials);
//       set({ user: response.data });
//       console.log(response.data);
//       toast.success(response?.data?.message || "registration successful");
//     } catch (error) {
//       set({ user: null });
//       toast.error(error?.response?.data?.message || "registration failed");
//     }
//   },

//   signin: async (credentials) => {
//     try {
//       const response = await axios.post("/api/auth/login", credentials);
//       const { user, token, message } = response.data;

//       set({ user, token });
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       toast.success(message || "Login successful");
//       return true;
//     } catch (error) {
//       set({ user: null, token: null });
//       toast.error(error.response?.data?.message || "login failed");
//       return false;
//     }
//   },

//   logout: async () => {
//     try {
//       await axios.get("/api/auth/logout");
//       set({ user: null, token: null });
//       localStorage.clear();
//       toast.success("Logout Success");
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   },
// }));

// export default useAuthStore;
