@component('mail::message')

{!! $content !!}

@component('mail::button', ['url' => $url])
{{ __('locale.buttons.view') }}
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
