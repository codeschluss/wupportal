<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\ORM\TableRegistry;
use Cake\Http\Client;
use Cake\Utility\Xml;
use Cake\Core\Configure;
use \stdClass;

/**
 * Translations Controller
 *
 * @property \App\Model\Table\TranslationsTable $Translations
 *
 * @method \App\Model\Entity\Translation[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class TranslationsController extends AppController
{

	protected $DEFAULT_SORT = 'Translations.locale';

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['view','list', 'index']);
	}

	/**
	 * Delete method
	 *
	 * @param string|null $id Entry id.
	 * @return \Cake\Http\Response|null Redirects to index.
	 * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
	 */
	public function delete($id)
	{
		$translation = $this->table()->get($id);
		$this->table()->delete($this->table()->get($id));

		if($translation) {
			$i18n = TableRegistry::get('I18n');
			$i18n->deleteAll(['locale' => $translation->locale]);
		}

		// delete throws own not found exception
		return $this->ResponseHandler->responseSuccess('deleted');
	}

	/**
	 * translates all given strings from German to given target languages
	 */
	public function translateAll()
	{
		$request = json_decode($this->request->input(), true);

		if (!isset($request['languages']) || empty($request['languages'])
			|| !isset($request['properties']) || empty($request['properties'])) {
				return $this->ResponseHandler->responseError();
		}

		try {
		$responseObj = [];
		foreach ($request['languages'] as $lang ) {
			foreach ($request['properties'] as $prop => $value) {
				$text = $value . " (" . Configure::read('Azure.autmatic-translation') . ")";
				$translation = $this->getTranslation($lang, $text);
				if ($translation) {
					$responseObj[$lang][$prop] = $translation;
				} else {
					return $this->ResponseHandler->createResponse(503);
				}
			}
		}

		return $this->ResponseHandler->responseSuccess($responseObj);
		} catch(\Expection $e) {
			return $this->ResponseHandler->createResponse(503);
		}

	}

	/**
	 * translates a given string from German to target language.
	 */
	public function translate()
	{
		$request = json_decode($this->request->input(), true);
		if (!isset($request['to']) && !isset($request['text'])) {
			return $this->ResponseHandler->responseError();
		}

		try {
		$translation = $this->getTranslation($request['to'], $request['text']);

		return $translation
			? $this->ResponseHandler->responseSuccess($translation)
			: $this->ResponseHandler->createResponse(503);
		} catch(\Exception $e) {
			return $this->ResponseHandler->createResponse(503);
		}

	}

	/**
	 * translates a given string from German to target language.
	 * @return String translation
	 * @return false if translation failed
	 */
	private function getTranslation($targetLanguage, $text)
	{
		$http = new Client();
		$response = $http->get(Configure::read('Azure.translate-url'),
			[
			'to' => $targetLanguage,
			'from' => 'de',
			'text' => $text
			],
			[
			'headers' => ['Ocp-Apim-Subscription-Key' => Configure::read('Azure.subscription-key')],
			'timeout' => 60
			]
		);

		return $response->isOk()
			? Xml::toArray($response->xml)['string']
			: false;
	}

	/** @return array Fields to use for filter  */
	protected function fieldsTofilter()
	{
		return [
			'locale',
			'name'
		];
	}

	/** @return array Fields to use to filter translations  */
	protected function fieldsTofilterTranslated()
	{
		return [
			'locale',
			$this->table()->translationField('name')
		];
	}


	public function isAuthorized($user)
	{
		if ($this->isSuperuser($user)) return true;

		switch ($this->request->getParam('action')) {
			case 'translateAll':
			case 'translate':
				return $this->isApprovedProvider($user['id']);
			default:
				return parent::isAuthorized($user);
		}
	}

}
