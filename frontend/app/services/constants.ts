import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

	// --------------------------
	// SERVER MESSAGES
	// --------------------------

	public static wrongCredentialsMessage: string = 'Kein Nutzer mit diesem Password gefunden';
	public static duplicateEntryMessage: string = 'Datensatz mit dem Namen existiert bereits. Bitte anderen Namen auswählen';
	public static notFoundMessage: string = 'Kein Datensatz zu den Suchkriterien gefunden';
	public static wrongInputFormatMessage: string = 'Format der Eingabefelder sind nicht korrekt';
	public static unexpectedErrorMessage: string = 'Unerwarteter Serverfehler. Bitte erneut probieren oder Codeschluss kontaktieren';
	public static successfulActionMessage: string = 'Aktion wurde erfolgreich ausgeführt';

	public static SHORT: number = 2000;
	public static MIDDLE: number = 7000;
	public static LONG: number = 99999;

	// --------------------------
	// STATIC
	// --------------------------
	public static close: string = 'Schließen';
	public static nextPageLabel: string = 'Nächste Seite';
	public static previousPageLabel: string = 'Vorherige Seite';
	public static itemsPerPageLabel: string = 'Einträge pro Seite';
	public static of: string = 'von';
	public static error: string = 'Fehler';

	// --------------------------
	// LABELS
	// --------------------------

	public weekDaysArray: string[] = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
	public rythm: string = 'Rythmus';
	public from: string = 'von';
	public to: string = 'bis';
	public at: string = 'am';
	public unique: string = 'einmalig';
	public day: string = 'Tag';
	public week: string = 'Woche';
	public month: string = 'Monat';
	public year: string = 'Jahr';
	public daily: string = 'täglich';
	public weekly: string = 'wöchentlich';
	public weekdays: string = 'Wochentage';
	public monthly: string = 'monatlich';
	public yearly: string = 'jährlich';
	public countryCode: string = 'de';

	public back: string = 'Zurück';
	public newElement: string = 'Neu';
	public cancel: string = 'Abbrechen';
	public newEntry: string = 'Neuen Eintrag anlegen';

	public login: string = 'anmelden';
	public loginTitle: string = 'Login';
	public register: string = 'registrieren';
	public userName: string = 'Benutzername';
	public password: string = 'Passwort';
	public newPassword: string = 'Neues Passwort';
	public confirmPassword: string = 'Passwort wiederholen';
	public registration: string = 'Registrierung';

	public filter: string = 'Filter';
	public configuration: string = 'Einstellungen';

	public requests: string = 'Anfragen';
	public showMembers: string = 'Mitglieder anzeigen';
	public showRequests: string = 'Anfragen anzeigen';
	public declineRequest: string = 'Anfrage ablehnen';
	public approveRequest: string = 'Anfrage bestätigen';
	public createdAt: string = 'Erstellt';
	public save: string = 'Speichern';
	public select: string = 'Auswählen';
	public delete: string = 'Löschen';
	public deleteAll: string = 'Alle Einträge löschen';
	public change: string = 'Ändern';
	public edit: string = 'Bearbeiten';
	public chosen: string = 'Ausgewählt';
	public choose: string = 'wählen Sie';
	public create: string = 'Erstelle';
	public calculate: string = 'Errechne';
	public frequently: string = 'Regelmäßig';
	public next: string = 'weiter';
	public previous: string = 'vorherige';
	public approved: string = 'Bestätigt';

	public coreData: string = 'Stammdaten';
	public metaData: string = 'Metadaten';
	public own: string = 'Eigene';
	public no: string = 'Nein';
	public yes: string = 'Ja';
	public ok: string = 'OK';
	public required: string = 'notwendig';

	public deleteMessage: string = 'Möchten Sie den folgenden Eintrag wirklich löschen?';
	public isRequiredMessage: string = 'Feld darf nicht leer sein';
	public emailFormatMessage: string = 'Feld muss Email Format haben';
	public notSamePasswordMessage: string = 'Passwörter stimmen nicht überein';
	public orAreEmptyMessage: string = 'oder sind leer';
	public begin: string = 'Anfang';
	public end: string = 'Ende';
	public last: string = 'letzten';
	public deleteFromOrganisation: string = 'Aus Organisation entfernen';
	public multipleOrganisationMessage: string = 'Sie sind Administrator für mehere Organisationen';
	public pleaseSelectMessage: string = 'Bitte wählen Sie eine aus:';
	public publicUser: string = 'Soll der Name des Anbieters veröffentlicht werden?';
	public dateTimeQuestion: string = 'Wann findet Ihre Veranstaltung statt?';
	public placeQuestion: string = 'Wo findet Ihre Veranstaltung statt?';
	public pleaseControl: string = 'Bitte kontrollieren Sie Ihre Angaben';
	public scheduleListExplanation: string = 'Sie können an dieser Stelle auch Anpssungen vornehmen, ' +
		'indem Sie auf den jeweiligen	termin klicken.';
	public chooseOrganisationForActivity: string = 'Im Namen welcher Organisation soll die Veranstaltung angelegt werden';
	public tagsHint: string = 'Schlagworte bitte mit Komma trennen';
	public scheduleInfo: string =
		'Bei eintägigen Veranstaltungen bitte zwei mal ' +
		'das gleiche Datum angeben.Für regelmäßige Veranstaltungen bitte das Datum	des ersten und des ' +
		'letzten Termins angeben.Sie können die Termine anschließend noch einmal kontrollieren und verändern.';
	public followingWeekdays: string = 'an folgenden Wochentagen';
	public everyMonth: string = 'eines jeden Monats';
	public every: string = 'Jede(n/s)';
	public suffixAmount: string = 'te(n/s)';
	public suffixNumber: string = 'ten';

	public website: string = 'Webseite';
	public description: string = 'Beschreibung';
	public nameString: string = 'Name';
	public fullname: string = 'Vor- und Nachname';
	public phone: string = 'Telefon';
	public mail: string = 'Email';
	public address: string = 'Adresse';
	public addressManagement: string = 'Adressverwaltung';
	public street: string = 'Straße';
	public postalCode: string = 'PLZ';
	public place: string = 'Ort';
	public houseNumber: string = 'Hausnummer';
	public quarter: string = 'Quartier';
	public longitude: string = 'Längengrad';
	public latitude: string = 'Breitengrad';
	public dates: string = 'Termine';
	public date: string = 'Termin';
	public noFutureDates: string = 'Keine zukünftigen Termine';
	public title: string = 'Titel';
	public tags: string = 'Tags';
	public targetGroups: string = 'Zielgruppen';
	public category: string = 'Kategorie';

	public organisations: string = 'Organisationen';
	public organisation: string = 'Organisation';
	public organisationAdmin: string = 'Organisation verwalten';
	public users: string = 'Anbieter';
	public user: string = 'Anbieter';
	public members: string = 'Mitglieder';
	public activities: string = 'Aktivitäten';
	public activity: string = 'Aktivität';
	public account: string = 'Konto';
	public admin: string = 'Admin';
	public userManagement: string = 'Nutzerverwaltung';

	public done: string = 'Erledigt';
	public summary: string = 'Zusammenfassung';
	public infos: string = 'Infos';
	public warning: string = 'Achtung!';
	public outOfOrder: string = 'Funktioniert nicht. Wird derzeit entwickelt!';

	public configWarning: string = 'Durch Veränderungen in diesem Bereich verändern Sie die öffentliche Darstellung dieses Portals!';
	public mapcenterLongitude: string = 'Längengrad für Kartenmittelpunkt';
	public mapcenterLatitude: string = 'Breitengrad für Kartenmittelpunkt';
	public zoomfactor: string = 'Zoomfaktor für Karte';
	public mapProjection: string = 'Kartenprojektion';
	public portalName: string = 'Name dieses Portals';
	public portalSubtitle: string = 'Unterschrift dieses Portalnamens';

	// --------------------------
	// TABLE
	// --------------------------

	public defaultPageSize: number = 25;
	public pageSizeOptions: Array<number> = [5, 10, 25, 50, 100];

	// --------------------------
	// URLs
	// --------------------------

	public userURL: string = '(table:users)';
	public orgaAdminURL: string = '(table:organisation-admin)';
}
