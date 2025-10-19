"use client"

export default function NotificationBanner() {
  return (
    <div className="w-full bg-[#ffcccc] text-[#800000] py-2 overflow-hidden border-b border-[#ff9999]">
      <div
        className="whitespace-nowrap text-sm animate-marquee-slow"
        style={{
          animation: "marquee-slow 30s linear infinite",
        }}
      >
        सूचना: यह वेबसाइट अभी निर्माणाधीन है। शीघ्र ही पूर्ण और सुंदर रूप में प्रस्तुत की जाएगी। सुझाव दें: panchalsamaj14@gmail.com
      </div>
    </div>
  )
}
