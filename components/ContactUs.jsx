"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import emailjs from "@emailjs/browser";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    role: "user", // Default role
  });

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!agreed) return; // Prevent submission if not agreed

    setLoading(true);

    const templateParams = {
      from_name: formData.firstName + " " + formData.lastName,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      role: formData.role,
    };

    try {
      console.log("Sending email...");
      const response = await emailjs.send(
        "service_0b6yksd", // Replace with your actual Service ID
        "template_qo5p1wb", // Replace with your actual Template ID
        templateParams,
        "b8UQyPu_N-Q1V-zOZ" // Replace with your actual Public Key
      );
      if (response.status !== 200) throw new Error("Failed to send email");
      alert("Message Sent Successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        role: "user",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send message. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white px-6 my-20 mt-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contact Us
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          We're here to assist you. Reach out to us for any inquiries.
        </p>
      </div>
      <form onSubmit={sendEmail} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="role"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Role
            </label>
            <select
              name="role"
              defaultValue={"user"}
              value={formData.role}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            >
              <option value="user">User</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
        <Switch.Group as="div" className="flex gap-x-4 mt-2 sm:col-span-2">
          <Switch
            checked={agreed}
            onChange={setAgreed}
            className={classNames(
              agreed ? "bg-indigo-600" : "bg-gray-300",
              "relative flex w-10 h-5 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/10 transition-all duration-300 ease-in-out hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            )}
            aria-checked={agreed}
          >
            <span
              className={classNames(
                agreed ? "translate-x-5" : "translate-x-0",
                "absolute left-0 top-0 h-5 w-5 transform bg-white rounded-full shadow-md ring-1 ring-gray-900/10 transition-all duration-300 ease-in-out"
              )}
            />
          </Switch>

          <Switch.Label className="text-sm leading-6 text-gray-600">
            By selecting this, you agree to our{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold text-indigo-600 hover:underline"
            >
              privacy policy
            </Link>
            .
          </Switch.Label>
        </Switch.Group>
        <div className="mt-10">
          <button
            type="submit"
            disabled={!agreed || loading}
            className={`block w-full rounded-md ${
              agreed ? "bg-indigo-600" : "bg-indigo-300"
            } px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm ${
              agreed ? "hover:bg-indigo-600" : "cursor-not-allowed"
            }`}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
