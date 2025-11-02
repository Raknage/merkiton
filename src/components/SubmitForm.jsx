// src/components/SubmitForm.jsx
import { useState } from "react";
import { storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { submitDesign } from "../lib/firestore";

export default function SubmitForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      alert("Please fill in title and select an image");
      return;
    }

    setLoading(true);
    try {
      // Upload image to Firebase Storage
      const timestamp = Date.now();
      const imageRef = ref(storage, `designs/${timestamp}_${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Save to Firestore
      await submitDesign({
        title,
        description,
        imageUrl,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
      setSuccess(true);

      setTimeout(() => {
        window.location.href = "/gallery";
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit design. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-lg border-2 border-green-500 bg-green-50 p-8 text-center">
        <div className="mb-4 text-6xl">✅</div>
        <h2 className="mb-2 text-2xl font-bold text-green-900">
          Design Submitted!
        </h2>
        <p className="text-green-700">Redirecting to gallery...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Design Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Sunset Mountain Patch"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us about your design..."
          rows="4"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Design Image *
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
          required
        />
        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="max-w-md rounded-lg shadow-md"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-lg px-6 py-3 font-semibold text-white ${loading ? "cursor-not-allowed bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"} `}
      >
        {loading ? "Submitting..." : "Submit Design"}
      </button>
    </form>
  );
}
