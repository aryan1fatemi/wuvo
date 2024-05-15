'use client';
import Input from "@/app/components/inputs/Input";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
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
    //togle the password:
    const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
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
      <div className="bg-orange-50 px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="spce-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "register" && (
            <Input label="Name" register={register} id="name" errors={errors}/>
          )}
          <Input label="Email" register={register} id="email" errors={errors} type="email"/>
          <div className="flex flex-row">
          <Input label="Password" register={register} id="password" errors={errors} type= {showPassword ? 'text' : 'password'}/>
            <button onClick={togglePasswordVisibility}>{!showPassword ? <RiEyeCloseLine/>: <RiEyeLine/>}</button>
          </div>
          
        </form>
      </div>

    </div>
  )
}

export default AuthForm