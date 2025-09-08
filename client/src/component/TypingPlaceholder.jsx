import { useEffect, useState } from "react";

export default function TypingPlaceholder(baseText = "Check weather in") {
  const cities = ["Mumbai", "Delhi", "Bangalore", "Ujjain", "Chennai", "Kolkata", "Hyderabad"];
  const [displayText, setDisplayText] = useState(baseText);
  const [cityIndex, setCityIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentCity = cities[cityIndex];
    let typingSpeed = isDeleting ? 50 : 120;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentCity.length) {
        setDisplayText(baseText + ` "${currentCity.slice(0, charIndex + 1)}"`);
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(baseText + ` "${currentCity.slice(0, charIndex - 1)}"`);
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentCity.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCityIndex((prev) => (prev + 1) % cities.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, cityIndex, baseText]);

  return displayText;
}
