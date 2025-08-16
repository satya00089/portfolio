import React from "react";

const Contact: React.FC = () => (
  <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
    <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
    <form className="flex flex-col gap-4 w-full max-w-md">
      <input
        type="text"
        placeholder="Name"
        className="p-3 rounded-lg bg-nightSky/70 focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        className="p-3 rounded-lg bg-nightSky/70 focus:outline-none"
      />
      <textarea
        placeholder="Message"
        rows={5}
        className="p-3 rounded-lg bg-nightSky/70 focus:outline-none"
      />
      <button className="bg-blue-500 hover:bg-blue-400 py-3 rounded-lg transition">
        Send
      </button>
    </form>
  </section>
);

export default Contact;
