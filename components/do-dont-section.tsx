"use client";

import { CheckCircle, XCircle } from "lucide-react";

export default function DosDontsSection() {
  return (
    <section className="w-full py-16 bg-[#FFF4E6]">

      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl text-[#B30000] mb-2">आचरण नियम</h2>
        <p className="text-[#FF6B00]">श्री त्रिपुरा सुंदरी मंदिर – दर्शन के दौरान आवश्यक निर्देश</p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 px-4">

        {/* Do's Card */}
        <div className="bg-white/90 p-6 rounded-xl shadow-md">
          <h3 className="text-xl text-[#2A2A2A] mb-4">Do’s</h3>

          <div className="space-y-3 text-[15px] text-gray-700">
            <p className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={18} />
              मंदिर में स्वच्छता और शांति बनाए रखें।
            </p>

            <p className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={18} />
              दर्शन के लिए क्रमबद्ध तरीके से कतार में खड़े रहें।
            </p>

            <p className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={18} />
              वरिष्ठ नागरिकों, बच्चों और दिव्यांगजनों का ध्यान रखें।
            </p>

            <p className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={18} />
              अपने कीमती सामान की सुरक्षा स्वयं सुनिश्चित करें।
            </p>

            <p className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={18} />
              किसी भी दान/भेंट का रसीद अवश्य प्राप्त करें।
            </p>

            <p className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={18} />
              मंदिर परिसर को प्लास्टिक-मुक्त रखने में सहयोग करें।
            </p>
          </div>
        </div>

        {/* Don'ts Card */}
        <div className="bg-white/90 p-6 rounded-xl shadow-md">
          <h3 className="text-xl text-[#2A2A2A] mb-4">Don’ts</h3>

          <div className="space-y-3 text-[15px] text-gray-700">

            <p className="flex items-start gap-2">
              <XCircle className="text-red-600 mt-1" size={18} />
              गर्भगृह में मोबाइल या कैमरा ले जाने का प्रयास न करें।
            </p>

            <p className="flex items-start gap-2">
              <XCircle className="text-red-600 mt-1" size={18} />
              मंदिर परिसर में ऊँची आवाज़ में बात न करें।
            </p>

            <p className="flex items-start gap-2">
              <XCircle className="text-red-600 mt-1" size={18} />
              प्रसाद या फूल बिखेरकर परिसर को गंदा न करें।
            </p>

            <p className="flex items-start gap-2">
              <XCircle className="text-red-600 mt-1" size={18} />
              पार्किंग क्षेत्र के बाहर वाहन न खड़ा करें।
            </p>

            <p className="flex items-start gap-2">
              <XCircle className="text-red-600 mt-1" size={18} />
              किसी भी अफवाहों या गलत संदेशों पर विश्वास न करें।
            </p>

            <p className="flex items-start gap-2">
              <XCircle className="text-red-600 mt-1" size={18} />
              बिना अनुमति धार्मिक सामग्री या वस्तुएँ न बेचें।
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}