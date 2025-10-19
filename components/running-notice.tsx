"use client"

export default function RunningNotice() {
  return (
    <div className="w-full bg-yellow-100 border-y border-yellow-300 py-1 overflow-hidden">
      <div
        className="whitespace-nowrap text-xs text-red-700 font-medium"
        style={{
          animation: "scroll-notice 25s linear infinite",
        }}
      >
        • सूचना: यह वेबसाइट अभी निर्माणाधीन है। शीघ्र ही पूर्ण और सुंदर रूप में प्रस्तुत की जाएगी। सुझाव दें: panchalsamaj14@gmail.com •
      </div>
    </div>
  )
}
