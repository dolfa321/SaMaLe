import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/auth/user");
        setUser(data);
      } catch (error) {
        console.error("Error fetching user session:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
