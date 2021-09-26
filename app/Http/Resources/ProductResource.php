<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
		$createdDate = date('Y-m-d H:i:s', strtotime($this->created_at));
		return [
			'id' => $this->id,
			'name' => $this->name,
			'description' => $this->description,
			'image_path' => $this->image_path,
			'price' => $this->price,
			'category_name' => $this->category->name,
			'category_id' => $this->category_id,
			'created_at' => $createdDate
		];
    }
}
