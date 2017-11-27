import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

	// --------------------------
	// LABELS
	// --------------------------

	public back: string = 'Zurück';
	public newElement: string = 'Neu';
	public cancel: string = 'Abbrechen';
	public next: string = 'Näachste';
	public previous: string = 'Vorherige';
	public items: string = 'Einträge';
	public of: string = 'von';
	public per: string = 'pro';

	public login: string = 'anmelden';
	public userName: string = 'Username';
	public password: string = 'Passwort';

	public filter: string = 'Filter';
	public configuration: string = 'Einstellungen';

	public delete: string = 'Löschen';
	public change: string = 'Ändern';
	public edit: string = 'Bearbeiten';
	public deleteMessage: string = 'Möchten Sie den folgenden Eintrag wirklich löschen?';

	public website: string = 'Webseite';
	public description: string = 'Beschreibung';
	public nameString: string = 'Name';
	public phone: string = 'Telefon';
	public mail: string = 'e-Mail';
	public address: string = 'Adresse';
	public street: string = 'Straße';
	public postalCode: string = 'PLZ';
	public houseNumber: string = 'Hausnummer';
	public longitude: string = 'Längengrad';
	public latitude: string = 'Breitengrad';
	public dates: string = 'Termine';
	public tags: string = 'Tags';
	public targetGroups: string = 'Zielgruppen';

	public organisations: string = 'Organisationen';
	public organisation: string = 'Organisation';
	public users: string = 'Benutzer';
	public user: string = 'Benutzer';
	public activities: string = 'Aktivitäten';
	public activity: string = 'Aktivität';

	public error: string = 'Fehler';

	// --------------------------
	// TABLE
	// --------------------------

	public defaultPageSize: number = 25;
	public pageSizeOptions: Array<number> = [5, 10, 25, 50, 100];

}
