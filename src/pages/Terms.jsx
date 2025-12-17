export default function Terms({ onBack }) {
    return (
      <div className="min-h-screen bg-white p-4">
        
        {/* 🔙 HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Go back"
          >
            ←
          </button>
          <h1 className="text-xl font-bold">Terms & Conditions</h1>
        </div>
  
        {/* 📄 CONTENT */}
        <div className="text-gray-700 space-y-4 leading-relaxed text-sm">
          <p>
            By using the QR Menu application, you agree to comply with
            and be bound by these Terms & Conditions.
          </p>
  
          <p>
            QR Menu allows restaurant owners to create and manage digital
            menus. We do not guarantee order fulfillment, food quality,
            pricing accuracy, or delivery.
          </p>
  
          <p>
            Restaurant owners are solely responsible for menu content,
            pricing, availability, and order handling.
          </p>
  
          <p>
            QR Menu is not liable for any losses, disputes, or damages
            arising from the use of this app.
          </p>
  
          <p>
            We reserve the right to suspend or terminate accounts that
            misuse the platform.
          </p>
  
          <p>
            For any questions, contact us at{" "}
            <b>birulirohit099@gmail.com</b>
          </p>
        </div>
      </div>
    );
  }
  