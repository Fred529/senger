<?php

use App\Http\Controllers\LanguageController;
use App\Models\Campaigns;
use Database\Seeders\Countries;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    if (config('app.stage') == 'new') {
        return redirect('install');
    }

    if (config('app.stage') == 'Live' && config('app.version') == '2.8') {
        return redirect('update');
    }

    return redirect('login');
});

// locale Route
Route::get('lang/{locale}', [LanguageController::class, 'swap']);
Route::any('languages', [LanguageController::class, 'languages'])->name('languages');

if (config('app.stage') == 'local') {
    Route::get('run-campaign', function () {

        $campaign = Campaigns::find(6);
        if ($campaign) {
            $campaign->singleProcess();
        }
    });

    Route::get('update-file',function (){
       $app_path = base_path().'/bootstrap/cache/';
        if (File::isDirectory($app_path)) {
            File::cleanDirectory($app_path);
        }
    });

    Route::get('update-country',function (){
        $countries = new Countries();
        $countries->run();
    });


}

