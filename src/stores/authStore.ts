import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user:
      typeof localStorage !== "undefined"
        ? localStorage.getItem("currentUser")
        : null,

    userId:
      typeof localStorage !== "undefined"
        ? Number(localStorage.getItem("currentUserId")) || null
        : null,
    token:
      typeof localStorage !== "undefined"
        ? localStorage.getItem("token")
        : null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    login(userId: number, username: string) {
      this.user = username;

      this.userId = userId;

      const token = crypto.randomUUID();
      this.token = token;

      if (typeof localStorage !== "undefined") {
        localStorage.setItem("currentUser", username);

        localStorage.setItem("currentUserId", userId.toString());

        localStorage.setItem("token", token);
      }
    },

    logout() {
      this.user = null;

      this.userId = null;

      this.token = null;

      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("currentUser");

        localStorage.removeItem("currentUserId");

        localStorage.removeItem("token");
      }
    },

    loadUser() {
      const user = localStorage.getItem("currentUser");

      const userId = localStorage.getItem("currentUserId");

      if (user && userId) {
        this.user = user;

        this.userId = Number(userId);
      }
    },
  },
});
