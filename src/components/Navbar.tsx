
import { Link } from "react-router-dom";
import { Bell, Heart, Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-book-purple">BookWorm</span>
          </Link>
        </div>

        {!isMobile && (
          <div className="relative mx-4 flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search for books..."
              className="w-full py-2 pl-10 pr-4 rounded-full bg-muted/50 border-border focus:outline-none focus:ring-2 focus:ring-book-purple/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center space-x-1 sm:space-x-3">
          {isMobile ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/search">
                  <Search className="h-5 w-5" />
                </Link>
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-book-pink text-white">3</Badge>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                    <SheetDescription>Stay updated with your book world</SheetDescription>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    <NotificationItem 
                      title="Daily Deal Alert!" 
                      message="40% off on bestsellers today only!"
                      time="2 hours ago"
                      isNew={true}
                    />
                    <NotificationItem 
                      title="New Badge Earned" 
                      message="You've earned the 'Bookworm' badge!"
                      time="Yesterday"
                      isNew={true}
                    />
                    <NotificationItem 
                      title="Review Liked" 
                      message="Someone liked your review on 'The Silent Patient'"
                      time="2 days ago"
                      isNew={true}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-book-pink text-white">3</Badge>
              </Button>
            </>
          )}

          <Button variant="ghost" size="icon" asChild>
            <Link to="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-book-pink text-white">2</Badge>
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild>
            <Link to="/profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      
      {!isMobile && (
        <div className="container px-4 pb-2 mx-auto sm:px-6">
          <div className="flex items-center justify-center space-x-6">
            <Link to="/category/fiction" className="book-link text-sm font-medium">Fiction</Link>
            <Link to="/category/non-fiction" className="book-link text-sm font-medium">Non-Fiction</Link>
            <Link to="/category/mystery" className="book-link text-sm font-medium">Mystery</Link>
            <Link to="/category/sci-fi" className="book-link text-sm font-medium">Science Fiction</Link>
            <Link to="/deals" className="text-sm font-medium text-book-pink">Daily Deals</Link>
            <Link to="/new-releases" className="text-sm font-medium">New Releases</Link>
            <Link to="/community" className="text-sm font-medium">Community</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NotificationItemProps {
  title: string;
  message: string;
  time: string;
  isNew: boolean;
}

const NotificationItem = ({ title, message, time, isNew }: NotificationItemProps) => {
  return (
    <div className="p-3 rounded-lg border border-border bg-background">
      <div className="flex justify-between">
        <h4 className="font-medium text-sm">{title}</h4>
        {isNew && <Badge className="bg-book-purple text-white">New</Badge>}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{message}</p>
      <p className="text-xs text-muted-foreground mt-2">{time}</p>
    </div>
  );
};

export default Navbar;
