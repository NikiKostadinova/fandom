import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from './types/book';
import { Image } from './types/image';
import { Comment } from './types/comment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // comments: Comment[] = [];

  // get commentsList(): string {
  //   return this.comments || [];
  // }

  getBooks() {
    const { apiUrl } = environment;

    return this.http.get<Book[]>(`${apiUrl}/api/books`);

  }

  getBook(id: any): Observable<Book> {
    const { apiUrl } = environment;

    return this.http.get<Book>(`${apiUrl}/api/books/${id}`);

  }


  create(name: string, author: string, image: Image, published: number, genre: string, description: string, owner: string) {
    
    const { apiUrl } = environment; 
    return this.http.post<Book>(`${apiUrl}/api/books/create`, { name, author, image, published, genre, description, owner });
  }
 
  updateBook(bookToUpdate: Book): Observable<Book> {
    const { apiUrl } = environment;
    
   const update = this.http.put<Book>(`${apiUrl}/api/books/${bookToUpdate._id}/editBook`, bookToUpdate);
   console.log(update)
    return update;
  }

  getBookComments(bookId: string, limit?: number): Observable<Comment[]> {
    const { apiUrl } = environment; 
    const limitFilter = limit ? `?limit=${limit}` : '';
    return this.http.get<Comment[]>(`${apiUrl}/api/books/${bookId}/comments${limitFilter}`);
  }

  updateBookWithComment(book: Book): Observable<Book> {
    const { apiUrl } = environment; 
    const url = `${apiUrl}/api/books/${book._id}/editBook`;

    const updatedBook: Partial<Book> = {
      _id: book._id,
      author: book.author,
      image: book.image,
      published: book.published,
      genre: book.genre,
      description: book.description,
      createdAt: book.createdAt,
      commentList: book.commentList,
    };     
    
    return this.http.put<Book>(url, updatedBook);
  }

  addToWishList(userId: string, bookId: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    const url = `${apiUrl}/api/users/${userId}/addToWishList`;

    const data = { bookId };

    return this.http.post(url, data);
  }

  deleteBook(id: string) {
    const { apiUrl } = environment;
    const url = `${apiUrl}/api/books/${id}`;
    return this.http.delete(url);

  }

}
