<?php

namespace App\Services;

use App\Services\PaymentInterface;

class Paypal implements PaymentInterface
{
	public function process() {
		$response = 'paypal payment processed successfully.';
		return $response;
	}
}
