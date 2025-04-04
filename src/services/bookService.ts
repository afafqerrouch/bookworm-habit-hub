
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  description: string;
  tags: string[];
  releaseDate: string;
  isBestseller?: boolean;
  isOnSale?: boolean;
  salePercentage?: number;
}

export interface DealOfTheDay {
  book: Book;
  discount: number;
  hoursLeft: number;
  minutesLeft: number;
}

const books: Book[] = [
  {
    id: "1",
    title: "The Last Secret",
    author: "Emma Jenkins",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop",
    price: 12.99,
    originalPrice: 24.99,
    rating: 4.7,
    ratingCount: 342,
    description: "A gripping psychological thriller that keeps you guessing until the very last page. When Clara returns to her hometown after fifteen years, she must confront the dark secrets she left behind.",
    tags: ["fiction", "thriller", "mystery"],
    releaseDate: "2023-09-15",
    isBestseller: true,
    isOnSale: true,
    salePercentage: 40
  },
  {
    id: "2",
    title: "Parallel Worlds",
    author: "Marcus Chen",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=387&auto=format&fit=crop",
    price: 14.99,
    rating: 4.5,
    ratingCount: 189,
    description: "A mind-bending science fiction novel about an astronaut who discovers a gateway to parallel universes, and must find his way back to his own reality.",
    tags: ["fiction", "sci-fi", "adventure"],
    releaseDate: "2024-01-22",
    isBestseller: false
  },
  {
    id: "3",
    title: "Whispers of the Ocean",
    author: "Sophia Lee",
    coverImage: "https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?q=80&w=387&auto=format&fit=crop",
    price: 8.99,
    originalPrice: 17.99,
    rating: 4.3,
    ratingCount: 267,
    description: "A beautiful coming-of-age story set in a coastal town, where a young girl discovers her connection to the sea and uncovers family secrets that have been buried for generations.",
    tags: ["fiction", "coming-of-age", "family"],
    releaseDate: "2023-06-05",
    isOnSale: true,
    salePercentage: 50
  },
  {
    id: "4",
    title: "The Mindful Entrepreneur",
    author: "David Wilson",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=387&auto=format&fit=crop",
    price: 19.99,
    rating: 4.8,
    ratingCount: 412,
    description: "A practical guide to building a successful business while maintaining balance and purpose in your life. Includes exercises, case studies, and actionable advice.",
    tags: ["non-fiction", "business", "self-help"],
    releaseDate: "2024-02-10",
    isBestseller: true
  },
  {
    id: "5",
    title: "The Hidden Garden",
    author: "Isabella Martinez",
    coverImage: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=387&auto=format&fit=crop",
    price: 11.99,
    rating: 4.4,
    ratingCount: 156,
    description: "When Miranda inherits her grandmother's cottage, she discovers a mysterious garden that seems to have healing properties—and dark secrets.",
    tags: ["fiction", "fantasy", "mystery"],
    releaseDate: "2023-12-01"
  },
  {
    id: "6",
    title: "Beyond the Stars",
    author: "James Thompson",
    coverImage: "https://images.unsplash.com/photo-1515098506762-79e1384e9d8e?q=80&w=387&auto=format&fit=crop",
    price: 13.99,
    originalPrice: 22.99,
    rating: 4.6,
    ratingCount: 203,
    description: "The thrilling conclusion to the Galactic Saga trilogy. Captain Lena Ward must make one final stand against the forces threatening the entire galaxy.",
    tags: ["fiction", "sci-fi", "action"],
    releaseDate: "2024-03-15",
    isOnSale: true,
    salePercentage: 35
  },
  {
    id: "7",
    title: "The Art of Silence",
    author: "Robert Chang",
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=387&auto=format&fit=crop",
    price: 15.99,
    rating: 4.2,
    ratingCount: 98,
    description: "A profound meditation on the power of silence in our noisy world. Discover how embracing quiet moments can transform your creativity, relationships, and inner peace.",
    tags: ["non-fiction", "mindfulness", "self-help"],
    releaseDate: "2023-10-20"
  },
  {
    id: "8",
    title: "Lost in Time",
    author: "Alexandra White",
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=387&auto=format&fit=crop",
    price: 9.99,
    originalPrice: 19.99,
    rating: 4.5,
    ratingCount: 176,
    description: "A thrilling adventure through time as historian Dr. Sarah Jenkins accidentally activates an ancient artifact that sends her bouncing through different historical eras.",
    tags: ["fiction", "time-travel", "adventure"],
    releaseDate: "2023-08-12",
    isOnSale: true,
    salePercentage: 50
  }
];

export const fetchPopularBooks = (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books.filter(book => book.rating >= 4.5));
    }, 500);
  });
};

export const fetchNewReleases = (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedByDate = [...books].sort((a, b) => 
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      );
      resolve(sortedByDate.slice(0, 4));
    }, 500);
  });
};

export const fetchBooksOnSale = (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books.filter(book => book.isOnSale));
    }, 500);
  });
};

export const fetchDealOfTheDay = (): Promise<DealOfTheDay> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dealBook = books.find(book => book.id === "1")!;
      const deal: DealOfTheDay = {
        book: dealBook,
        discount: 40,
        hoursLeft: 5,
        minutesLeft: 32
      };
      resolve(deal);
    }, 500);
  });
};

export const fetchRecommendedBooks = (userId: string): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would use actual user preferences
      // For now, we're just returning a subset of books
      resolve(books.slice(2, 6));
    }, 500);
  });
};

export const fetchBookById = (id: string): Promise<Book | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books.find(book => book.id === id));
    }, 300);
  });
};

export const fetchBooksByCategory = (category: string): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books.filter(book => book.tags.includes(category.toLowerCase())));
    }, 500);
  });
};
