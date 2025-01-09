 export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Loading spinner */}
      <div className="w-16 h-16 border-4 border-[#ff5c00] border-t-transparent rounded-full animate-spin mb-4"></div>

      {/* Loading text with gradient */}
      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] bg-clip-text text-transparent">
        Loading...
      </h2>

      {/* Optional subtitle */}
      <p className="text-[#666] mt-2">
        Please wait while we prepare your content
      </p>
    </div>
  );
};