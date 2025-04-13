import { FolderPen, KeyRound, Mails, UserRoundCheck } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let { signup } = useAuthStore();
  let navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let email = e.target.email.value;
    let fullName = e.target.fullname.value;
    let password = e.target.password.value;

    console.log({ username, email, password, fullName });
    signup({ username, email, password, fullName });
    navigate("/signin");
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

        <form className="space-y-5 p-5" onSubmit={handleSignUp}>
          <div className="">
            <label className="input flex items-center gap-3">
              <UserRoundCheck size={18} />
              <input
                name="username"
                type="text"
                className="grow outline rounded-sm p-2 placeholder:text-black text-sm"
                placeholder="username"
              />
            </label>
          </div>

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
              <FolderPen size={18} />
              <input
                name="fullname"
                type="text"
                className="grow outline rounded-sm p-2 
                placeholder:text-black text-sm"
                placeholder="Full name"
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
              Sign up
            </button>
          </div>

          <div className="text-center">
            Already a member ?
            <Link to={"/signin"} className="underline">
              {" "}
              sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
