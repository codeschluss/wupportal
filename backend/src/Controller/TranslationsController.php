<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\ORM\TableRegistry;
use Cake\Http\Client;
use Cake\Utility\Xml;
use Cake\Core\Configure;

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
	 * translates a given string to target language.
	 */
	public function translate()
	{
		$request = json_decode($this->request->input(), true);
		if (!isset($request['to']) && !isset($request['text'])) {
			return $this->ResponseHandler->responseError();
		}

		$http = new Client();
		$response = $http->get(Configure::read('Azure.translate-url'),
			[
			'to' => $request['to'],
			'from' => 'de',
			'text' => $request['text']
			],
			[
			'headers' => ['Ocp-Apim-Subscription-Key' => Configure::read('Azure.subscription-key')]
			]
		);

		if($response->isOk()) {
			$responseBody = Xml::toArray($response->xml);
			return $this->ResponseHandler->responseSuccess($responseBody['string']);
		} else {
			return $this->ResponseHandler->createResponse(503);
		}

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
			case 'translate':
				return $this->isApprovedProvider($user['id']);
			default:
				return parent::isAuthorized($user);
		}
	}

}
