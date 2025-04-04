
import { useEffect, useState } from "react";
import { DealOfTheDay as DealType, fetchDealOfTheDay } from "@/services/bookService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const DealOfTheDay = () => {
  const [deal, setDeal] = useState<DealType | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeal = async () => {
      try {
        const dealData = await fetchDealOfTheDay();
        setDeal(dealData);
        setTimeLeft({
          hours: dealData.hoursLeft,
          minutes: dealData.minutesLeft,
          seconds: 0,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to load deal of the day:", error);
        setLoading(false);
      }
    };

    loadDeal();
  }, []);

  useEffect(() => {
    if (!deal) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        if (newHours < 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [deal]);

  const addToCart = () => {
    toast.success(`${deal?.book.title} added to your cart!`, {
      description: "Hurry, deal ends soon!"
    });
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-8 w-2/3 bg-muted rounded mb-4"></div>
          <div className="aspect-[3/2] bg-muted rounded mb-4"></div>
          <div className="h-4 bg-muted rounded w-full mb-2"></div>
          <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-10 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (!deal) return null;

  const { book } = deal;
  const formattedTime = `${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`;

  return (
    <Card className="overflow-hidden border-2 border-book-pink animate-fade-in">
      <div className="bg-book-pink text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-bold text-lg">Deal of the Day</h3>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span className="font-mono">{formattedTime}</span>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6">
          <div className="flex justify-center">
            <Link to={`/book/${book.id}`}>
              <img
                src={book.coverImage}
                alt={book.title}
                className="object-cover h-[280px] hover-scale"
              />
            </Link>
          </div>
          <div>
            <Link to={`/book/${book.id}`}>
              <h2 className="text-2xl font-serif font-bold hover:text-book-purple transition-colors">{book.title}</h2>
            </Link>
            <p className="text-book-purple-dark mb-2">{book.author}</p>
            <div className="flex items-baseline space-x-3 mb-4">
              <span className="text-book-pink font-bold text-2xl">${book.price.toFixed(2)}</span>
              {book.originalPrice && (
                <span className="text-muted-foreground line-through">${book.originalPrice.toFixed(2)}</span>
              )}
              <span className="bg-book-pink/10 text-book-pink px-2 py-0.5 rounded-md text-sm font-medium">
                {deal.discount}% OFF
              </span>
            </div>
            <p className="text-muted-foreground mb-6 line-clamp-3">{book.description}</p>
            <div className="flex space-x-3">
              <Button className="btn-cta flex items-center space-x-2 w-full sm:w-auto" onClick={addToCart}>
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <Link to={`/book/${book.id}`}>View Details</Link>
              </Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>🔥 <span className="font-medium text-foreground">8 people</span> bought this book in the last hour!</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealOfTheDay;
