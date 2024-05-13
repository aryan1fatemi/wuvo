'use client';
import Input from "@/app/components/inputs/Input";
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
  //social sign in
  const social =(action: string)=> {
    setLoading(true);
    //social sign in with NextAuth
  }
  return (
    <div
    className="
    mt-8
    sm:mx-auto
    sm:w-full
    sm:max-w-md
    "
    >
      <div className="bg-orange-100 px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="spce-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Enail" />
        </form>
      </div>

    </div>
  )
}

export default AuthForm