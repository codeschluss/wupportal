<?php
namespace App\Controller\Component;

use Cake\Controller\Component;

class ResponseHandlerComponent extends Component
{

	private $controller;

	public function initialize(array $config)
	{
		parent::initialize($config);
		$this->controller = $this->_registry->getController();
	}

	/**
	 * Creates and returns a succeeded response
	 *
	 * @return \Cake\Http\Response with records and status 200
	 */
	public function responseSuccess($response = null)
	{
		return $this->createResponse(200, $response);
	}

	public function responseNotFoundError($ressource)
	{
		$response = (object)array($ressource => 'not found');
		return $this->createResponse(404, $response);
	}

	public function responseNotAuthorized()
	{
		return $this->createResponse(401);
	}

	public function responseError($errors = null)
	{
		$status = 400;
		if ($errors && is_array($errors)) {
			foreach ($errors as $error) {
				if ($this->isDuplicateError($error)) {
					$status = 409;
				}
			}
		}
		return $this->createResponse($status, $errors);
	}

	public function isDuplicateError($error)
	{
		return key($error) === 'unique';
	}

	public function isNotFoundError($result)
	{
		return !$result || empty($result);
	}

	public function createResponse($statusCode, $responseBody = null)
	{
		return $this->controller->response
			->withStatus($statusCode)
			->withType('application/json')
			->withStringBody(json_encode($responseBody));
	}
}
