import { createContext, useContext, useState } from "react";

const SignUpContext = createContext();

export const SignUpProvider = ({ children }) => {
  const [signUpData, setSignUpData] = useState({
    role: "",
    phoneNumber: "",
    loginId: "",
    password: "",
    name: "",
    birth: "",
    school: "",
    grade: "",
  });

  const getFilteredSignUpData = () => {
    const { role, phoneNumber, loginId, password, name, birth, school, grade } =
      signUpData;
    let splitedBirth = "";
    if (birth) {
      if (typeof birth === "string") {
        splitedBirth = birth.split("T")[0];
      } else if (birth instanceof Date) {
        splitedBirth = birth.toISOString().split("T")[0];
      }
    }
    const base = { phoneNumber, loginId, password, name, birth: splitedBirth };

    if (role === "student") {
      return { ...base, school, grade };
    }

    return base;
  };

  return (
    <SignUpContext.Provider
      value={{ signUpData, setSignUpData, getFilteredSignUpData }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUp = () => useContext(SignUpContext);
