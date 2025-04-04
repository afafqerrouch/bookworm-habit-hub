
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Bell, Book, Gift, Star } from "lucide-react";

const notificationMessages = [
  {
    title: "New Book Suggestion",
    message: "Based on your reading history, we think you'd love 'The Silent Echo'",
    icon: <Book className="h-4 w-4 text-book-blue" />,
    delay: 45000, // 45 seconds
  },
  {
    title: "Daily Deal Alert",
    message: "Flash sale! 50% off bestselling thrillers for the next 4 hours",
    icon: <Bell className="h-4 w-4 text-book-pink" />,
    delay: 120000, // 2 minutes
  },
  {
    title: "Achievement Unlocked!",
    message: "You've earned the 'Novel Explorer' badge for discovering 5 new genres",
    icon: <Star className="h-4 w-4 text-yellow-500" />,
    delay: 180000, // 3 minutes
  },
  {
    title: "Surprise Gift",
    message: "You've received a free eBook as a loyalty reward!",
    icon: <Gift className="h-4 w-4 text-book-purple" />,
    delay: 240000, // 4 minutes
  }
];

const TriggerNotification = () => {
  const [notificationIndex, setNotificationIndex] = useState(0);

  useEffect(() => {
    // Show first notification after a short delay
    const timeout = setTimeout(() => {
      const { title, message, icon } = notificationMessages[notificationIndex];
      
      toast(title, {
        description: message,
        icon: icon,
        duration: 6000,
      });
      
      // Schedule the next notification
      setNotificationIndex((prev) => (prev + 1) % notificationMessages.length);
    }, notificationMessages[notificationIndex].delay);

    return () => clearTimeout(timeout);
  }, [notificationIndex]);

  return null; // This component doesn't render anything
};

export default TriggerNotification;
