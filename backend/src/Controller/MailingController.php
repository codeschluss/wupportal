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
			$this->Auth->allow(['mail']);
		}

    public function mail()
    {
			$data = $this->request->input('json_decode');
			$message = $data->message;
			if($data->resetPassword){
				$newPassword = $this->generateRandomString();
				$this->updateUserPassword($data->mailRecipient, $newPassword);
				$message .= ' ' . $newPassword;
			}
				$configuration = $this->getConfigs();
				$email = new Email('default');
        $email
            ->from("milli@codeschluss.de")
            ->to($data->mailRecipient)
						->subject($data->subject)
						->send($message);

        return $this->response->withStatus(200);
		}

		private function updateUserPassword($mailRecipient, $newPassword){
			$userTable = TableRegistry::get('Users');
			$user = $userTable->find()
				->where(['Users.username' => $mailRecipient])
				->first();

			if(!$user) exit;

			$user->password = $newPassword;
			$userTable->patchEntity(
				$userTable->get($user->id),
				json_decode($user, true)
			);
			$userTable->save($user);
		}

		private function getConfigs() {
			$configuration = [];
			foreach (TableRegistry::get('Configurations')->find()->all() as $i)
			$configuration[$i['item']] = $i['value'];
			return $configuration;
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

}
