'use client';
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import AuthSocialButton from "./AuthSocialButton";
import { FaGithub,FaGoogle } from "react-icons/fa";
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
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "register" && (
            <Input label="Name" register={register} id="name" errors={errors} disabled={loading}/>
          )}
          <Input label="Email" register={register} id="email" errors={errors} type="email" disabled={loading}/>
          <div className="items-center flex flex-row relative">
            <Input 
              label="Password" 
              register={register} 
              id="password" 
              errors={errors} 
              type={showPassword ? 'text' : 'password'}
              disabled={loading}
            />
            <button
              type="button" 
              onClick={togglePasswordVisibility} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-3 z-10 pt-6"
            >
              {!showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
            </button>
          </div>
          <div className="flex justify-end">
            <Button
              disabled={loading}
              fullWidth
              type="submit"
              >
              {variant === 'login' ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div 
              className="
                absolute 
                inset-0 
                flex 
                items-center">
              <div className="w-full border-t border-stone-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-orange-50 px-2 text-stone-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={FaGithub} onClick={()=> social('github')}/>
            <AuthSocialButton icon={FaGoogle} onClick={()=> social('google')}/>
          </div>

        </div>

          <div className="flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-stone-500
          ">
            <div>
              {variant === 'login' ? 'New to WuVo?' : 'Already have an account?'} 
            </div>
            <div 
              onClick={toggleVariant} 
              className="underline cursor-pointer"
              >
              {variant === 'login' ? 'Create an account' : 'Login'}
            </div>
          </div>
      </div>
    </div>
  )
}

export default AuthForm