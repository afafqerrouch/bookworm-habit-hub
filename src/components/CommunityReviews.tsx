
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
    badge?: string;
  };
  rating: number;
  date: string;
  content: string;
  helpfulCount: number;
  replies: number;
  userHasLiked: boolean;
}

const reviews: Review[] = [
  {
    id: "1",
    user: {
      name: "Sarah J.",
      avatar: "https://i.pravatar.cc/150?img=1",
      badge: "Top Reviewer",
    },
    rating: 5,
    date: "March 15, 2024",
    content: "This book absolutely blew me away. The character development is masterful, and the plot twists kept me guessing until the very end. I couldn't put it down and finished it in just two days. Highly recommended for any mystery lover!",
    helpfulCount: 24,
    replies: 3,
    userHasLiked: false,
  },
  {
    id: "2",
    user: {
      name: "Michael T.",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    rating: 4,
    date: "March 10, 2024",
    content: "A solid read with compelling characters and an intriguing premise. The middle section dragged a bit, but the ending more than made up for it. I'm looking forward to reading more from this author.",
    helpfulCount: 12,
    replies: 1,
    userHasLiked: true,
  },
  {
    id: "3",
    user: {
      name: "Rebecca L.",
      avatar: "https://i.pravatar.cc/150?img=5",
      badge: "Bookworm",
    },
    rating: 5,
    date: "March 5, 2024",
    content: "One of the best books I've read this year! The author created such a vivid world that I felt completely immersed. The themes explored were thought-provoking and relevant. I've already recommended it to all my friends.",
    helpfulCount: 18,
    replies: 2,
    userHasLiked: false,
  },
];

const CommunityReviews = () => {
  const [reviewsData, setReviewsData] = useState(reviews);

  const handleLike = (reviewId: string) => {
    setReviewsData(
      reviewsData.map((review) => {
        if (review.id === reviewId) {
          const newLiked = !review.userHasLiked;
          const newCount = newLiked
            ? review.helpfulCount + 1
            : review.helpfulCount - 1;
          
          if (newLiked) {
            toast.success("Thanks for your feedback!");
          }
          
          return {
            ...review,
            helpfulCount: newCount,
            userHasLiked: newLiked,
          };
        }
        return review;
      })
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif font-bold">Community Reviews</h3>
        <Button variant="outline" size="sm">
          Write a Review
        </Button>
      </div>

      <div className="space-y-6">
        {reviewsData.map((review) => (
          <div key={review.id} className="border border-border rounded-lg p-5">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={review.user.avatar} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">{review.user.name}</span>
                    {review.user.badge && (
                      <span className="ml-2 text-xs bg-book-purple/10 text-book-purple px-2 py-0.5 rounded-full">
                        {review.user.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground text-xs ml-2">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm">{review.content}</p>

            <div className="flex items-center mt-4 text-sm text-muted-foreground space-x-4">
              <button
                className={`flex items-center space-x-1 ${
                  review.userHasLiked ? "text-book-purple" : ""
                }`}
                onClick={() => handleLike(review.id)}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>
                  Helpful ({review.helpfulCount})
                </span>
              </button>
              <button className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>
                  Reply ({review.replies})
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-6">
        <Button variant="outline">Show More Reviews</Button>
      </div>
    </div>
  );
};

export default CommunityReviews;
