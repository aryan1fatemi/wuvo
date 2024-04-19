import AuthForm from "./components/AuthForm";
import Landing from "./components/Landing";
import Image from "next/image";
export default function Home() {
    return (
      <div 
      className="
      flex 
      flex-col
      min-h-full
      justify-around
      py-12
      sm:px-6
      lg:px-8
      bg-gradient-to-b from-orange-50 via-orange-100 to-red-100
      ">
        <Landing />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          height="50"
          width="50"
          className="mx-auto w-auto"
          src="/images/logo.png"
          alt="Logo"
        />
        <h2 
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-orange-900
          "
          >
            Sign in to your account
        </h2>
      </div>
        <AuthForm />
      </div>
    );
  }