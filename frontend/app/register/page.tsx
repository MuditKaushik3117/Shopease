"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");

    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-16">
      <h1 className="text-4xl font-bold mb-8">
        Register
      </h1>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-black text-white py-3 rounded"
        >
          Register
        </button>

      </div>
    </div>
  );
}

