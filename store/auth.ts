import { atom } from "recoil";
import { User } from "@/mongodb/models/users";

export type AuthState = {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    user: User | null;
};

export const authState = atom<AuthState>({
    key: "auth",
    default: { isAuthenticated: false, isAuthenticating: false, user: null },
});
