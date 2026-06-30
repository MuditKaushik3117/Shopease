"use client";

export default function ProfilePage() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (

    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Profile
      </h1>

      <div className="border rounded-lg p-6">

        <p className="mb-4">
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

      </div>

    </div>

  );

}

