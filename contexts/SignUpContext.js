import { createContext, useContext, useState } from "react";

const SignUpContext = createContext();

export const SignUpProvider = ({ children }) => {
  const [signUpData, setSignUpData] = useState({
    role: "",
    phoneNum: "",
    id: "",
    pw: "",
    name: "",
    birth: "",
    school: "",
    grade: "",
  });

  return (
    <SignUpContext.Provider value={{ signUpData, setSignUpData }}>
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUp = () => useContext(SignUpContext);
