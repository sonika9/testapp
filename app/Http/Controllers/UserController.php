<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
		$user = User::where('email', $request->email)->first();
		$status = 'fail';
		$message = '';
		if ( !$user ) {
			$user = new User;
			$user->name = $request->name;
			$user->email = $request->email;
			$user->password = Hash::make($request->password);
			$user->level = Config::get('const.userlevels.normal');
			$added = $user->save();
			if ( $added ) {
				Auth::guard('web')->login($user);
				$status = 'success';
			}
		} else {
			$message = 'Email already registered';
		}
		return response()->json(['status' => $status,'message' => $message]);
    }
	/**
     * Set user in session if valid 
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        //
		$credentials = $request->validate([
            'email' => ['required','email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
			return response()->json(['status' => 'loggedin']);
        }
		return response()->json(['status' => 'fail']);
    }
	public function isLoggedIn()
    {
		$isAdmin = false;
		$status = 'nologgedin';
		if ( Auth::check() ) {
			$isAdmin = (Auth::user()->level === Config::get('const.userlevels.admin'));
			$status = 'loggedin';
		}
		return response()->json(['status' => $status, 'isAdmin' => $isAdmin]);
	}
	public function logout() {
		Auth::guard('web')->logout();
		return response()->json(['status' => 'logout']);
	}
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
