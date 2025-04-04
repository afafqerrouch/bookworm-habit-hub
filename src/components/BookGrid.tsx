
import { Book } from "@/services/bookService";
import BookCard from "@/components/BookCard";

interface BookGridProps {
  books: Book[];
  title?: string;
  subtitle?: string;
}

const BookGrid = ({ books, title, subtitle }: BookGridProps) => {
  return (
    <div>
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-serif font-bold">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
