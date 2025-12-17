import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactUs({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔒 REQUIRED VALIDATION
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    // Mail intent (Play Store allowed)
    window.location.href =
      `mailto:birulirohit099@gmail.com` +
      `?subject=Contact Us - QR Menu` +
      `&body=Name: ${name}%0AEmail: ${email}%0A%0A${message}`;

    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 500);
  };

  // ✅ SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-xl font-bold mb-2">Thank You</h2>
        <p className="text-gray-600 mb-6">
          We will get back to you within <b>24–48 hours</b>.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
        >
          Close
        </button>
      </div>
    );
  }

  // 📝 CONTACT US FORM
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <input
          type="email"
          placeholder="Your Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <textarea
          placeholder="Write your query or complaint *"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
        >
          {loading ? "Sending..." : "Contact Us"}
        </button>
      </form>
    </div>
  );
}
