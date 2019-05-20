import { Timestamp } from 'rxjs';

export class Todo {
    id: string;
    text: string;
    finished: boolean = false;
    timeStamp: number;
}
