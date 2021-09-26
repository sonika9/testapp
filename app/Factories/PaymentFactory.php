<?php

namespace App\Factories;

use App\Services\Paypal;
use App\Services\CreditCard;
use App\Services\PaymentInterface;
use Illuminate\Support\Facades\Config;

class PaymentFactory
{
	public static function getService( $type ) : PaymentInterface {
		$service = null;
		switch($type) {
			case Config::get('const.payments.paypal'):
				$service = new Paypal();
			break;
			case Config::get('const.payments.creditcard'):
				$service = new CreditCard();
			break;
		}
		return $service;
	}
}
