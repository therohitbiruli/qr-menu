import { useEffect } from "react";
import { auth } from "../firebase";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function FinishSignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        toast.error("Email not found");
        return;
      }

      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          toast.success("Logged in successfully");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [navigate]);

  return <div className="p-6 text-center">Verifying email…</div>;
}
