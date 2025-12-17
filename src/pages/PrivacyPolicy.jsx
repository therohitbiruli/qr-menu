export default function PrivacyPolicy({ onBack }) {
    return (
      <div className="min-h-screen bg-white p-4">
        
        {/* 🔙 HEADER WITH BACK BUTTON */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Go back"
          >
            ←
          </button>
          <h1 className="text-xl font-bold">Privacy Policy</h1>
        </div>
  
        {/* 📄 CONTENT */}
        <div className="text-gray-700 space-y-4 leading-relaxed">
          <p>
            QR Menu collects basic information such as email address,
            phone number, restaurant details, and menu data to provide
            core app functionality.
          </p>
  
          <p>
            We use third-party services like Firebase for authentication
            and data storage. We do not sell, misuse, or share user data.
          </p>
  
          <p>
            For any concerns, contact us at{" "}
            <b>birulirohit099@gmail.com</b>
          </p>
        </div>
      </div>
    );
  }
  