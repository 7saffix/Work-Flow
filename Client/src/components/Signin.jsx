import { KeyRound, Mails } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Signin = () => {
  const { signin } = useAuthStore();
  let navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    console.log({ email, password });
    const success = await signin({ email, password });
    if (success) navigate("/");
  };
  return (
    <div className="flex justify-center my-10">
      <div className="w-full max-w-lg bg-amber-50 pt-6 rounded-md shadow">
        <div className="text-center">
          <h1 className="font-semibold text-3xl text-[#2C3E50]">
            Join the Wisdom Community!
          </h1>
          <hr className="my-2" />
          <p className="font-medium italic text-base text-[#7F8C8D]">
            A continuous flow of ideas and thoughts.
          </p>
        </div>

        <form className="space-y-5 p-5" onSubmit={handleSignIn}>
          <div className="">
            <label className="input flex items-center gap-3">
              <Mails size={18} />
              <input
                name="email"
                type="email"
                className="grow outline rounded-sm p-2 placeholder:text-black text-sm"
                placeholder="Email"
              />
            </label>
          </div>

          <div className="">
            <label className="input flex items-center gap-3">
              <KeyRound size={18} />
              <input
                name="password"
                type="password"
                className="grow outline rounded-sm p-2 placeholder:text-black font-bold"
                placeholder="................"
              />
            </label>
          </div>

          <div className=" mt-6">
            <button className="bg-black text-white w-full rounded-md p-2">
              Sign in
            </button>
          </div>

          <div className="text-center">
            New here ?
            <Link to={"/signup"} className="underline">
              {" "}
              join us
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
