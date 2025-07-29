
import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const TopNavbar = () => {
  const phoneNumbers = [
    { number: '+92 315 3465995', display: '+92 315 3465995' },
    { number: '+92 332 9959017', display: '+92 332 9959017' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <img src="/assets/socialMediaIcons/fb.svg" alt="FB" />, url: 'https://www.facebook.com/profile.php?id=61577423111420' },
    { name: 'Instagram', icon: <img src="/assets/socialMediaIcons/insta.svg" alt="Insta" />, url: 'https://www.instagram.com/alsiratalmustaqim0/' },
    { name: 'LinkedIn', icon: <img src="/assets/socialMediaIcons/linkedin.svg" alt="" />, url: 'https://www.linkedin.com/in/sirat-al-mustaqim-46107a375/' },
    { name: 'YouTube', icon: <img src="/assets/socialMediaIcons/youtue.svg" alt="" />, url: 'https://www.youtube.com/@Al-Siratal-Mustaqim-o6k9y' },
    { name: 'X (Twitter)', icon: <img src="/assets/socialMediaIcons/x.svg" alt="" />, url: 'https://x.com/sirat_almustqim' },
    { name: 'TikTok', icon: <img src="/assets/socialMediaIcons/tiktok.svg" alt="" />, url: 'https://www.tiktok.com/@alsiratalmustaqim0' }
  ];

  const handleWhatsApp = (number: string) => {
    const whatsappNumber = number.replace(/\s+/g, '').replace('+', '');
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div className="bg-blue-600 text-white py-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-sm">
          {/* Left Side - Phone Numbers */}
          <div className="flex items-center space-x-4">
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="flex items-center space-x-2">
                <button
                  onClick={() => handleWhatsApp(phone.number)}
                  className="flex items-center space-x-1 hover:text-green-300 transition-all duration-300 transform hover:scale-105 group"
                >
                  <MessageCircle className="h-4 w-4 group-hover:animate-pulse" />
                  <span className="hidden sm:inline">{phone.display}</span>
                </button>
              </div>
            ))}
            <div className="flex items-center space-x-1 hover:text-blue-200 transition-colors duration-300">
              <Mail className="h-4 w-4" />
              <a href="mailto:alsiratalmustaqim0@gmail.com" className="hidden sm:inline hover:underline">
                alsiratalmustaqim0@gmail.com
              </a>
            </div>
          </div>

          {/* Right Side - Social Icons */}
          <div className="flex items-center space-x-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                className="text-lg hover:text-blue-200 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
