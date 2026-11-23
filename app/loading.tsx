export default function Loading() {
  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Decorative paw prints background */}
      <div className="absolute -top-10 -left-10 text-orange-100 text-[120px]">🐾</div>
      <div className="absolute -bottom-10 -right-10 text-orange-100 text-[120px]">🐾</div>
      <div className="absolute top-1/2 -right-20 text-orange-50 text-[80px]">🐾</div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Dog running animation */}
        <div className="relative w-full max-w-md h-40 flex items-center justify-center overflow-hidden mb-8 group">
          <div
            className="absolute -left-1/2 animate-[dog_run_2s_linear_infinite] group-hover:animate-[dog_run_1s_linear_infinite]"
          >
            <span className="text-7xl">🐕</span>
          </div>
          <div className="absolute -right-1/2 animate-[dog_run_2s_linear_infinite_reverse] group-hover:animate-[dog_run_1s_linear_infinite_reverse]">
            <span className="text-7xl">🐾</span>
          </div>
          <div className="absolute -top-8 left-1/4 text-orange-200 text-[60px] animate-bounce">
            🐾
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: "200ms" }} />
          <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: "400ms" }} />
        </div>
        <p className="mt-4 text-sm text-slate-600 font-medium">
          Fetching your deras...
        </p>
      </div>
    </div>
  )
}
