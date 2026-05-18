import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
        Forgot Your Password?
      </h2>

      <p className="text-sm text-gray-500 mb-6 text-center">
        Masukkan email kamu dan kami akan kirimkan link untuk reset password.
      </p>

      <form>
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Send Reset Link
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        Ingat password?{" "}
        <Link to="/login" className="text-green-600 hover:underline font-medium">
          Kembali ke Login
        </Link>
      </p>
    </div>
  );
}
