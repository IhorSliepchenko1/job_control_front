import { FcGoogle } from "react-icons/fc";

export const GoogleAuth = () => {
  const handleGoogleAuth = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google/redirect`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm text-gray-500">или</span>
      <button
        className="flex justify-center items-center cursor-pointer text-center text-small hover:shadow-xl hover:scale-105 transition duration-100"
        onClick={handleGoogleAuth}
      >
        <FcGoogle size={18} />
        <span>oogle</span>
      </button>
    </div>
  );
};
