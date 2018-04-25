import { Observable } from 'rxjs/Observable';
import { TableState } from 'app/models/table.state';

export interface IDataService {
	add(record: any): Observable<any>;
	delete(recordID: any): Observable<any>;
	edit(record: any): Observable<any>;
	get(id: string): Observable<any>;
	list(request: TableState): Observable<any>;
	getAll(): Observable<any>;
}
