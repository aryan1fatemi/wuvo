'use client';
import clsx from "clsx";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
//type for variant:
type variant = "login" | "register";
const AuthForm = () => {
  //state for variant
  // the deafault is login, the other option is register
  const [variant, setVariant] = useState<variant>("login");
  //loading state to disable buttons while loading
  const [loading, setLoading] = useState(false);
  //useCallBack to handle the variant change:
  const toggleVariant = useCallback(() => {
    if(variant === "login"){
      setVariant("register");
    }
    else{
      setVariant("login");
    }
  },[variant])

  //useForm to create form:
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    }
  });

  //submit handler function:
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    if(variant === "register"){
      //axios
    }
    if(variant === "login"){
      //NextAuth
    }
  }
  return (
    <div>AuthForm</div>
  )
}

export default AuthForm