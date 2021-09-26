<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
		$createdDate = date('Y-m-d H:i:s', strtotime($this->created_at));
		return [
			'id' => $this->id,
			'total' => $this->total,
			'username' => $this->user->name,
			'response' => $this->response,
			'created_at' => $createdDate
		];
    }
}
