// import { createContext, useContext, FC } from "react";
// import { useAuth } from "../hooks/useAuth";


// interface AuthContextProps {
//   isAuthenticated: boolean;
//   login: (id: string) => void;
//   logout: () => void;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider: FC = (props) => {
//     const {children} = props
//   const auth = useAuth();
//   return (
//     <AuthContext.Provider value={auth}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = (): AuthContextProps => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuthContext must be used within an AuthProvider");
//   }
//   return context;
// };
