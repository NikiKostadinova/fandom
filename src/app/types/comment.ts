import { Book } from "./book";
import { User } from "./user";

export interface Comment {
    
    comment: string;
    userId: User;
    username: string;
    bookId: Book;
    bookName: Book;
    rating: number;
   

}
