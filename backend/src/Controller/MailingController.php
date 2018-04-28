<?php
namespace App\Controller;

use Cake\Mailer\Email;
use Cake\ORM\TableRegistry;

/**
 * Mailing controller
 *
 * This controller will send mails
 *
 */
class MailingController extends AppController
{

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['forgotpwd']);
	}

	public function forgotPwd()
	{
		$userMail = $this->request->input('json_decode');
		$newPassword = $this->generateRandomString();
		$response = $this->updateUserPassword($userMail, $newPassword);

		if($response->getStatusCode()) {
			$this->MailHandler->sendForgotPwdMail($newPassword, $userMail);
		}

		return $response;
	}

	private function generateRandomString() {
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < 10; $i++) {
				$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}

	private function updateUserPassword($userMail, $newPassword) {
		$userTable = TableRegistry::get('Users');
		$user = $userTable->getUserByName($userMail);
		$user->password = $newPassword;

		$result = $userTable->patchEntity(
			$userTable->get($user->id),
			json_decode($user, true)
		);

		return $result->errors()
			? $this->ResponseHandler->responseError($result->errors())
			: $this->ResponseHandler->responseSuccess($this->table()->save($result));
	}
}
