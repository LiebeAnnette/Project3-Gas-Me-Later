import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  userId: string;
  username: string;
  exp: number;
};

export function getUserFromToken(): DecodedToken | null {
  const token = localStorage.getItem("id_token"); // ✅ match the stored key
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("❌ Invalid token:", error);
    return null;
  }
}
