import React, { useEffect, useState } from "react";

const WhatsAppButton = () => {
  const [showLabel, setShowLabel] = useState(true);
  const [animate, setAnimate] = useState(false);

  // Hide label after 5 seconds
  useEffect(() => {
    const labelTimer = setTimeout(() => setShowLabel(false), 9000);
    return () => clearTimeout(labelTimer);
  }, []);

  // Trigger animation every 2 minutes
  useEffect(() => {
    const triggerAnimation = () => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 3000); // Animation duration
    };

    triggerAnimation(); // initial
    const interval = setInterval(triggerAnimation, 1 * 30 * 1000); // every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <a
  href="https://wa.me/923153465995"
  target="_blank"
  rel="noopener noreferrer"
  className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg shadow-lg group transition-all duration-300 ease-in-out ${
    animate ? "animate-shake-slow" : ""
  }`}
  aria-label="Chat on WhatsApp"
>
  <img src="/assets/Logo/whatsapp-icon.png" alt="contact" className="w-12 h-12" />
  {showLabel && (
    <span className="whitespace-nowrap animate-slide-in text-sm font-medium text-blue-300 pr-1">
      Click Here
    </span>
  )}
</a>
  );
};

export default WhatsAppButton;
