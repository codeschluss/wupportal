<?php
/**
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link          https://cakephp.org CakePHP(tm) Project
 * @since         0.10.0
 * @license       https://opensource.org/licenses/mit-license.php MIT License
 */
$this->layout = false;
?>
<!doctype html>
<html lang="en" style="height: 100%">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<base href="/">
	<title>...loading</title>

	<link rel="manifest" href="manifest.json">
	<link rel="stylesheet" href="css/spinner.css">
	<link rel="stylesheet" href="css/deeppurple-amber.css">
	<link rel="icon" href="imgs/appicon.png" type="image/png">
</head>

<body style="height: 100%; margin: 0;">
	<app-root>
		<div class="mat-progress-spinner">
			<svg viewBox="0 0 100 100">
				<circle cx="50%" cy="50%" r="45"></circle>
			</svg>
		</div>
	</app-root>
	<script src="js/inline.bundle.js"></script>
	<script src="js/polyfills.bundle.js"></script>
	<script src="js/vendor.bundle.js"></script>
	<script src="js/main.bundle.js"></script>
</body>
</html>
