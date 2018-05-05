export class TranslationRequest {

	constructor(properties: Map<string, string>, languages: Array<string>) {
		this.properties = properties;
		this.languages = languages;
	}

	public properties: Map<string, string> = new Map<string, string>();
	public languages: Array<string> = new Array<string>();
}
