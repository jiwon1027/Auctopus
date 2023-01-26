import { useState } from "react";

interface IUser {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  address?: string;
  bankAccount?: string;
  interests?: { id: string; label: string }[];
}

const InitUser = {
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  nickname: "",
};

interface IForm {
  confirmed: boolean;
  user: IUser;
}

export const InitForm = {
  confirmed: false,
  user: InitUser,
};

export default function useSignup(state: IForm) {
  const [formState, setFormState] = useState(state);

  function updateNewUser(
    name: keyof IUser,
    value: string | { id: string; label: string }[]
  ) {
    let isConfirmed = true;
    for (const key in formState.user) {
      if (key === "interests") continue;
      const val = formState.user[key as keyof IUser] as string;
      isConfirmed = isConfirmed && val.trim() !== "";
    }

    if (name === "interests") {
      return setFormState((prev) => {
        prev.user[name] = value as { id: string; label: string }[];
        prev.confirmed = isConfirmed;
        return prev;
      });
    }

    setFormState((prev) => {
      prev.user[name] = value as string;
      return prev;
    });
  }

  return {
    formState,
    updateNewUser,
  };
}
