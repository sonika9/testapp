<?php

namespace App\Services;

use App\Services\PaymentInterface;

class CreditCard implements PaymentInterface
{
	public function process() {
		$response = 'credit card payment processed successfully.';
		return $response;
	}
}
