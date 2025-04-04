
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Book, fetchBooksOnSale, fetchNewReleases, fetchPopularBooks, fetchRecommendedBooks } from "@/services/bookService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DealOfTheDay from "@/components/DealOfTheDay";
import BookGrid from "@/components/BookGrid";
import UserAchievements from "@/components/UserAchievements";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Gift, Mail } from "lucide-react";
import TriggerNotification from "@/components/TriggerNotification";
import CommunityReviews from "@/components/CommunityReviews";

// Mock user ID for recommended books
const MOCK_USER_ID = "user123";

const Index = () => {
  const [showNewsletter, setShowNewsletter] = useState(true);
  
  const { data: popularBooks = [], isLoading: loadingPopular } = useQuery({
    queryKey: ["popularBooks"],
    queryFn: fetchPopularBooks
  });
  
  const { data: newReleases = [], isLoading: loadingNewReleases } = useQuery({
    queryKey: ["newReleases"],
    queryFn: fetchNewReleases
  });
  
  const { data: booksOnSale = [], isLoading: loadingSale } = useQuery({
    queryKey: ["booksOnSale"],
    queryFn: fetchBooksOnSale
  });
  
  const { data: recommendedBooks = [], isLoading: loadingRecommended } = useQuery({
    queryKey: ["recommendedBooks", MOCK_USER_ID],
    queryFn: () => fetchRecommendedBooks(MOCK_USER_ID)
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <TriggerNotification />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-3">Discover Your Next Favorite Book</h1>
              <p className="text-muted-foreground text-lg mb-6">
                Personalized recommendations, exclusive deals, and a community of fellow readers.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-book-purple/10 rounded-lg p-4 flex items-center">
                  <div className="bg-book-purple/20 rounded-full p-2 mr-3">
                    <Gift className="h-5 w-5 text-book-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium">Daily Rewards</h3>
                    <p className="text-sm text-muted-foreground">Surprise gifts and special offers</p>
                  </div>
                </div>
                
                <div className="bg-book-blue/10 rounded-lg p-4 flex items-center">
                  <div className="bg-book-blue/20 rounded-full p-2 mr-3">
                    <BookOpen className="h-5 w-5 text-book-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">Reading Rewards</h3>
                    <p className="text-sm text-muted-foreground">Earn points with every book</p>
                  </div>
                </div>
              </div>
              
              <DealOfTheDay />
            </div>
            
            <div className="space-y-8">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-book-purple to-book-pink p-5 text-white">
                  <h2 className="font-serif text-xl font-bold">Recommended For You</h2>
                  <p className="text-sm text-white/80">Based on your reading history</p>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {recommendedBooks.slice(0, 3).map((book) => (
                      <div key={book.id} className="flex space-x-3">
                        <img 
                          src={book.coverImage} 
                          alt={book.title}
                          className="w-16 object-cover hover-scale"
                        />
                        <div>
                          <h3 className="font-medium leading-tight">{book.title}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-sm font-medium">${book.price.toFixed(2)}</span>
                            {book.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through ml-2">
                                ${book.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline" size="sm">View All Recommendations</Button>
                </CardContent>
              </Card>
              
              <UserAchievements />
              
              {showNewsletter && (
                <Card className="border-2 border-book-purple-light">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-lg font-bold">Get Daily Book Deals</h3>
                      <button 
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => setShowNewsletter(false)}
                      >
                        &times;
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Subscribe for personalized recommendations, flash sales, and exclusive offers.
                    </p>
                    <div className="flex">
                      <div className="relative flex-grow">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <input
                          type="email"
                          placeholder="Your email"
                          className="w-full py-2 pl-10 pr-4 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-book-purple/50"
                        />
                      </div>
                      <Button className="rounded-l-none bg-book-purple hover:bg-book-purple-dark">
                        Subscribe
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      We respect your privacy and will never share your email.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <Tabs defaultValue="popular">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="popular">Popular Books</TabsTrigger>
                <TabsTrigger value="new">New Releases</TabsTrigger>
                <TabsTrigger value="deals">Special Deals</TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            
            <TabsContent value="popular" className="mt-0">
              <BookGrid books={popularBooks} />
            </TabsContent>
            
            <TabsContent value="new" className="mt-0">
              <BookGrid books={newReleases} />
            </TabsContent>
            
            <TabsContent value="deals" className="mt-0">
              <BookGrid books={booksOnSale} />
            </TabsContent>
          </Tabs>
        </section>
        
        <section className="mb-12">
          <CommunityReviews />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
