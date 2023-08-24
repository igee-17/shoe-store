import React, { useState, ChangeEvent, FormEvent } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiSolidLockAlt } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { RiPhoneLine } from "react-icons/ri";
import { auth, db } from "../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import firebase from "firebase/app";
import axios from "axios";

interface ControlledLoginProps {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlledLogin: React.FC<ControlledLoginProps> = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);

  const postCollectionRef = collection(db, "users");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };
  
  const backendUrl = "http://localhost:3000";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  
    if (isSignup) {
      try {
        // Signup logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        const user = userCredential.user;
        const userData = {
          name,
          email,
          phoneNumber,
        };
  
        // Send user data to backend API
        // await axios.post("http:localhost:3000/api/users", userData);
        await fetch(`${backendUrl}/api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        // const resp = fetch
        // await axios.post("/api/users", userData);
  
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuth", "true");
        setIsAuth(true);
  
        setError(null);
        navigate("/");
      } catch (error) {
        const errorMessage = (error as firebase.FirebaseError).message;
        setError(errorMessage);
      }
    } else {
      try {
        // Login logic
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        const user = userCredential.user;
  
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuth", "true");
        setIsAuth(true);
  
        setError(null);
        navigate("/");
      } catch (error) {
        const errorMessage = (error as firebase.FirebaseError).message;
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="login">
      <div className="left"></div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <div className="form-center">
            <h1>{isSignup ? "Signup" : "Login"}</h1>
            <p>{isSignup ? "Create a new account" : "Welcome back"}</p>

            {isSignup && (
              <>
                <div className="input-item">
                  <label htmlFor="name">
                    <FaUser />
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="input-item">
                  <label htmlFor="phone">
                    <RiPhoneLine />
                  </label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
              </>
            )}

            <div className="input-item">
              <label htmlFor="email">
                <AiOutlineMail />
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="input-item">
              <label htmlFor="password">
                <BiSolidLockAlt />
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            {error && <p>{error}</p>}

            <button type="submit">{isSignup ? "Signup" : "Login"}</button>
            <p>
              {isSignup ? "Already a member?" : "Not a member?"}{" "}
              <a href="#" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Login" : "Signup"}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ControlledLogin;
