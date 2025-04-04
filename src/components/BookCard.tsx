
import { Book } from "@/services/bookService";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    
    if (!isWishlisted) {
      toast.success(`${book.title} added to your wishlist!`, {
        description: "View your complete wishlist anytime."
      });
    } else {
      toast("Removed from your wishlist");
    }
  };

  return (
    <Link to={`/book/${book.id}`}>
      <Card className="overflow-hidden hover-scale group">
        <div className="relative h-[280px] overflow-hidden">
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="object-cover w-full h-full transition-transform group-hover:scale-105" 
          />
          <button 
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            onClick={toggleWishlist}
          >
            <Heart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-book-pink text-book-pink' : 'text-book-gray'}`} 
            />
          </button>
          {book.isBestseller && (
            <Badge className="absolute top-2 left-2 bg-book-orange text-white">
              Bestseller
            </Badge>
          )}
          {book.isOnSale && (
            <Badge className="absolute bottom-2 left-2 bg-book-pink text-white">
              {book.salePercentage}% OFF
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center mb-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-sm font-medium">{book.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({book.ratingCount})</span>
          </div>
          <h3 className="font-medium text-base leading-tight">{book.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
          <div className="flex items-center">
            <span className="font-medium">${book.price.toFixed(2)}</span>
            {book.originalPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                ${book.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BookCard;
