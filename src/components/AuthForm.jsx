// import { useState } from "react";
// import { useLoginMutation, useRegisterMutation } from "../reducers/authSlice"

// //Auth Form allows a user to either login or register for an account
// function AuthForm() {
//     const [login] = useLoginMutation();
//     const [register] = useRegisterMutation();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
  
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
  
//     const [isLogin, setIsLogin] = useState(true);
//     const authType = isLogin ? "Login" : "Register";
//     const oppositeAuthCopy = isLogin
//       ? "Don't have an account?"
//       : "Already have an account?";
//     const oppositeAuthType = isLogin ? "Register" : "Login";


//     //Send Credentials to server for Authentication 
//     async function attemptAuth(event) {
//         event.preventDefault();
//         setError(null);
    
//         const authMethod = isLogin ? login : register;
//         const credentials = { username, password };
    
//         try {
//           setLoading(true);
//           await authMethod(credentials).unwrap();
//         } catch (error) {
//           setLoading(false);
//           setError(error.data);
//         }
//       }


//       return (





//       )
// }