import Image from "next/image";
import authImage from "@/assets/images/auth-image.png";
import { FaTruck, FaShieldAlt, FaClock } from "react-icons/fa";

const features = [
  { icon: FaTruck, label: "Free Delivery" },
  { icon: FaShieldAlt, label: "Secure Payment" },
  { icon: FaClock, label: "24/7 Support" },
];

export default function StaticAuth() {
  return (
    <>
    <div className="text-center space-y-6">
            <div className="relative w-full h-96">
              <Image
                src={authImage}
                alt="Fresh vegetables and fruits shopping cart illustration, modern clean style, green theme"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover rounded-2xl shadow-lg"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                FreshCart - Your One-Stop Shop for Fresh Products
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of happy customers who trust FreshCart for their
                daily grocery needs
              </p>

              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                {features.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center">
                    <Icon
                      className="text-primary-600 mr-2"
                      aria-hidden="true"
                    />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
    </>
  )
}
