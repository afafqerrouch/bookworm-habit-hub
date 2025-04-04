
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Book, fetchBookById } from "@/services/bookService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityReviews from "@/components/CommunityReviews";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronRight, Heart, Share2, ShoppingCart, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const isMobile = useIsMobile();
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { data: book, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id || ""),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    toast.success(`${book?.title} added to your cart!`);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success(`${book?.title} added to your wishlist!`);
    } else {
      toast("Removed from your wishlist");
    }
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
            <div className="aspect-[2/3] bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-2/3"></div>
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-10 bg-muted rounded w-1/3 mt-4"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error Loading Book</h1>
          <p>Sorry, we couldn't find the book you're looking for.</p>
          <Button className="mt-6" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex text-sm text-muted-foreground mb-6 items-center">
          <Link to="/" className="hover:text-book-purple">Home</Link>
          <ChevronRight className="h-3 w-3 mx-1" />
          {book.tags[0] && (
            <>
              <Link to={`/category/${book.tags[0]}`} className="hover:text-book-purple capitalize">
                {book.tags[0]}
              </Link>
              <ChevronRight className="h-3 w-3 mx-1" />
            </>
          )}
          <span className="text-foreground">{book.title}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
          <div className="md:sticky md:top-24 h-fit">
            <div className="relative mb-4">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full rounded-lg shadow-md"
              />
              {book.isBestseller && (
                <Badge className="absolute top-3 left-3 bg-book-orange text-white">
                  Bestseller
                </Badge>
              )}
              {book.isOnSale && (
                <Badge className="absolute top-3 right-3 bg-book-pink text-white">
                  {book.salePercentage}% OFF
                </Badge>
              )}
            </div>
            
            {!isMobile && (
              <>
                <div className="flex justify-between mb-4">
                  <Button 
                    variant="outline" 
                    className="w-[48%] flex items-center justify-center gap-2"
                    onClick={toggleWishlist}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-book-pink text-book-pink' : ''}`} />
                    <span>Wishlist</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-[48%] flex items-center justify-center gap-2"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>

                <div className="space-y-4 border border-border rounded-md p-4">
                  <div>
                    <h3 className="font-medium mb-1">Reading Progress</h3>
                    <Progress value={0} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">You haven't started reading this book yet</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Community Activity</h3>
                    <div className="flex items-center text-sm space-x-4">
                      <div>
                        <span className="font-medium">842</span>
                        <p className="text-xs text-muted-foreground">Readers</p>
                      </div>
                      <div>
                        <span className="font-medium">126</span>
                        <p className="text-xs text-muted-foreground">Reviews</p>
                      </div>
                      <div>
                        <span className="font-medium">4.7</span>
                        <p className="text-xs text-muted-foreground">Avg Rating</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">{book.title}</h1>
            <p className="text-book-purple-dark mb-4">by {book.author}</p>
            
            <div className="flex items-center mb-6">
              <div className="flex mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(book.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-foreground font-medium mr-2">{book.rating}</span>
              <span className="text-sm text-muted-foreground">({book.ratingCount} ratings)</span>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="mr-6">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">${book.price.toFixed(2)}</span>
                  {book.originalPrice && (
                    <span className="text-muted-foreground line-through ml-2">
                      ${book.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {book.isOnSale && (
                  <span className="text-sm text-book-pink font-medium">
                    Save ${(book.originalPrice! - book.price).toFixed(2)} ({book.salePercentage}% OFF)
                  </span>
                )}
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  className="btn-cta flex items-center space-x-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </Button>
                
                {isMobile && (
                  <Button 
                    variant="outline"
                    className="flex items-center space-x-2"
                    onClick={toggleWishlist}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-book-pink text-book-pink' : ''}`} />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-6 text-sm">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>Paperback, 368 pages</span>
              </div>
              <div>
                <span>Published: {new Date(book.releaseDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex space-x-2 mb-4">
                {book.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <p className="text-sm leading-relaxed">
                {book.description}
              </p>
              
              {/* Add full description paragraphs here */}
              <p className="text-sm leading-relaxed mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="text-sm leading-relaxed mt-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <Tabs defaultValue="reviews">
              <TabsList className="mb-6">
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="details">Book Details</TabsTrigger>
                <TabsTrigger value="author">About the Author</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reviews">
                <CommunityReviews />
              </TabsContent>
              
              <TabsContent value="details">
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg">Book Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-border rounded-md p-4">
                      <h4 className="font-medium mb-3">Format</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Format:</span>
                          <span>Paperback</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Pages:</span>
                          <span>368</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Dimensions:</span>
                          <span>5.5 x 8.2 inches</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Language:</span>
                          <span>English</span>
                        </li>
                      </ul>
                    </div>
                    <div className="border border-border rounded-md p-4">
                      <h4 className="font-medium mb-3">Publication</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Publisher:</span>
                          <span>Riverhead Books</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Publication Date:</span>
                          <span>{new Date(book.releaseDate).toLocaleDateString()}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">ISBN-13:</span>
                          <span>978-1594634475</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Edition:</span>
                          <span>First Edition</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="author">
                <div className="space-y-6">
                  <h3 className="font-serif font-bold text-lg">About the Author</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-1/4">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop"
                        alt={book.author}
                        className="rounded-md w-full"
                      />
                    </div>
                    <div className="sm:w-3/4">
                      <h4 className="font-medium mb-3">{book.author}</h4>
                      <p className="text-sm mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <p className="text-sm mb-4">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                      <Button variant="outline" size="sm">
                        View All Books by This Author
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetail;
