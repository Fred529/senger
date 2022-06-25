<?php

namespace App\Notifications;

use App\Helpers\Helper;
use App\Models\EmailTemplates;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Mail;

class ApproveSenderID extends Notification
{
    use Queueable;

    protected $sender_id;
    protected $sender_id_url;

    /**
     * render sms with tag
     *
     * @param $msg
     * @param $data
     *
     * @return string|string[]
     */
    public function renderTemplate($msg, $data)
    {
        preg_match_all('~{(.*?)}~s', $msg, $datas);

        foreach ($datas[1] as $value) {
            if (array_key_exists($value, $data)) {
                $msg = preg_replace("/\b$value\b/u", $data[$value], $msg);
            } else {
                $msg = str_ireplace($value, '', $msg);
            }
        }

        return str_ireplace(["{", "}"], '', $msg);
    }

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($sender_id, $sender_id_url)
    {
        $this->sender_id     = $sender_id;
        $this->sender_id_url = $sender_id_url;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     *
     * @return array
     */
    public function via($notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     *
     * @return MailMessage
     */
    public function toMail($notifiable): MailMessage
    {

        $template = EmailTemplates::where('slug', 'sender_id_notification')->first();

        $subject = $this->renderTemplate($template->subject, [
                'app_name' => config('app.name'),
        ]);
        $content = $this->renderTemplate($template->content, [
                'sender_id'     => $this->sender_id,
                'sender_id_url' => "<a href='$this->sender_id_url' target='_blank'>Sender ID</a>",
        ]);

        $admin = User::find(1);
        Mail::send('emails.senderid.approve', ['content' => $content, 'url' => $this->sender_id_url], function ($message) use ($admin, $subject) {
            $message->from(Helper::app_config('notification_email'), Helper::app_config('notification_from_name'));
            $message->to($admin->email, $admin->displayName())->subject($subject);
        });

        return (new MailMessage)
                ->from(Helper::app_config('notification_email'), Helper::app_config('notification_from_name'))
                ->subject($subject)
                ->line($content)
                ->action(__('locale.buttons.view'), $this->sender_id_url)
                ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     *
     * @return array
     */
    public function toArray($notifiable): array
    {
        return [
            //
        ];
    }
}
