<?php
namespace App\Controller\Component;

use Cake\Controller\Component;
use Cake\ORM\TableRegistry;
use Cake\Mailer\Email;

class MailHandlerComponent extends Component
{

	private $email;
	private	$providerTable;
	private $userTable;
	private $orgaTable;
	private $configs;

	public function initialize(array $config)
	{
		parent::initialize($config);

		$this->email = new Email('default');
		$this->providerTable = TableRegistry::get('Providers');
		$this->userTable = TableRegistry::get('Users');
		$this->orgaTable = TableRegistry::get('Organisations');
		$this->configs = TableRegistry::get('Configurations');
	}

	/**
	 * Sends Mail to admins of organisation and if the organisation does not have admins,
	 * then to all super users
	 *
	 * @return void
	 */
	public function sendMailForNewProvider($organisationId, $username)
	{
		$mailAddresses = $this->providerTable->hasOrgaAdmin($organisationId)
			? $this->providerTable->getAdminMailsForProvider($organisationId)
			: $this->userTable->getSuperuserMails();

		$organisationName = $this->orgaTable->getOrganisationName($organisationId);
		$subject = $this->createNewProviderSubject($organisationName);

		$this->email->viewVars([
			'user' => $username,
			'portalName' => $this->configs->getPortalName(),
			'organisationName' => $organisationName
			]);

		foreach ($mailAddresses as $address) {
			$this->sendMail('register', $address, $subject);
		}
	}

	private function createNewProviderSubject($organisationName) {
		return
			$this->configs->getPortalName() . ' - Neuer Anbieter für Organisation ' . $organisationName;
	}

	/**
	 * Sends new password in a mail to specified target
	 *
	 * @return void
	 */
	public function sendForgotPwdMail($newPassword, $userMailAddress) {
		$this->email->viewVars([
			'newPassword' => $newPassword,
			'portalName' => $this->configs->getPortalName()
			]);

		$this->sendMail(
			'forgotpwd',
			$userMailAddress,
			$this->createForgotPwdSubject());
	}

	private function createForgotPwdSubject() {
		return
			$this->configs->getPortalName() . ' - Passwort wurde zurück gesetzt';
	}

	/**
	 * Sends Mail to specified target with specified subject and mail body
	 *
	 * @return void
	 */
	public function sendMail($template, $target, $subject) {
		return $this->email
			->setFrom($this->configs->getPortalMail())
			->setTemplate('default')
			->setLayout($template)
			->setSubject($subject)
			->setEmailFormat('text')
			->setTo($target)
			->send();
	}

}
