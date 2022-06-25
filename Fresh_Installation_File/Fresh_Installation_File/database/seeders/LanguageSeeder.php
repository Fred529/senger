<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\Language;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        Language::truncate();

        $get_language = [
                [
                        'name' => 'English',
                        'code' => 'en',
                        'iso_code' => 'us'
                ],
                [
                        'name' => 'German',
                        'code' => 'de',
                        'iso_code' => 'de',
                ],
                [
                        'name' => 'French',
                        'code' => 'fr',
                        'iso_code' => 'fr',
                ],
                [
                        'name' => 'Portuguese',
                        'code' => 'pt',
                        'iso_code' => 'pt',
                ],
                [
                        'name' => 'Arabic',
                        'code' => 'ar',
                        'iso_code' => 'ar',
                ],
                [
                        'name' => 'Spanish',
                        'code' => 'es',
                        'iso_code' => 'es',
                ],
                [
                        'name' => 'Italian',
                        'code' => 'it',
                        'iso_code' => 'it',
                ],
                [
                        'name' => 'Korean',
                        'code' => 'ko',
                        'iso_code' => 'kp',
                ],
                [
                        'name' => 'Slovenian',
                        'code' => 'sl',
                        'iso_code' => 'sl',
                ],
                [
                        'name' => 'Chinese',
                        'code' => 'zh',
                        'iso_code' => 'cn',
                ],
        ];
        foreach ($get_language as $lan) {
            Language::create($lan);
        }
    }

}
