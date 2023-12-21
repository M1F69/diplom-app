import {inject, Injectable, SecurityContext} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

type Task = {
  id: string;
  observable: Observable<Blob>;
  callback: Function;
  fallback: Function;
};

const cache: Record<string, Blob> = {};

@Injectable({providedIn: 'root'})
export class MovieCoverService {
  httpClient = inject(HttpClient);
  sanitizer = inject(DomSanitizer);

  queue: Task[] = [];
  task: Task | null = null;

  get(id: string) {
    return new Observable<Blob>((observer) => {

      const safeUrl = this.sanitizer.sanitize(SecurityContext.URL, `/api/movies(${id})/download`);

      this.httpClient.get(
        safeUrl as string,
        {responseType: 'blob'}
      )

      const observable = this.httpClient.get(
        safeUrl as string,
        {responseType: 'blob'}
      );

      this.queue.push({
        id: id,
        observable,
        callback: (text: Blob) => {
          observer.next(text);
          observer.complete();
        },
        fallback: () => {
          observer.error();
          observer.complete();
        }
      });

      this.execute();
    });
  }

  execute() {
    if (this.task) {
      return;
    }

    const task = this.queue.shift();

    if (!task) {
      return;
    }

    this.task = task;

    if (cache[task.id]) {
      task.callback(cache[task.id]);
      this.task = null;
      this.execute();
      return;
    }

    return task.observable.subscribe({
      next: (blob: Blob) => {
        cache[task.id] = blob;
        task.callback(blob);
      },
      error: () => {
        this.task = null;
        task.fallback();
        this.execute();
      },
      complete: () => {
        this.task = null;
        this.execute();
      }
    });
  }

}
