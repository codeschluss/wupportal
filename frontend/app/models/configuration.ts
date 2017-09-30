import { Model } from 'app/models/model';

export class Configuration extends Model {

	// legacy
	public mapcenterLatitude: number = 0;
	public mapcenterLongitude: number = 0;
	public zoomfactor: number = 0;
	public mapProjection: string = '';
	public portalName: string = '';
	public portalSubtitle: string = '';

	public item: string = '';
	public value: string = '';

	public constructor() { super(); }

}
