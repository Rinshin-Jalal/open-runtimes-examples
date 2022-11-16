import send_email_mailgun from "./functions/send_email_mailgun.ts";
import send_sms_twilio from "./functions/send_sms_twilio.ts";
import send_message_discord_webhook from "./functions/send_message_discord_webhook.ts";
import send_tweet from "./functions/send_tweet.ts";

export default async function (req: any, res: any) {
  const payload = JSON.parse(req.payload);
  const type: string = payload["type"];

  const receiver = payload?.["receiver"];
  const message = payload["message"];
  const subject = payload?.["subject"];

  let response: any;

  switch (type) {
    case "Email":
      response = await send_email_mailgun(
        req.variables,
        receiver,
        message,
        subject
      );
      break;

    case "SMS":
      response = await send_sms_twilio(req.variables, receiver, message);
      break;

    case "Discord":
      response = await send_message_discord_webhook(req.variables, message);
      break;

    case "Twitter":
      response = await send_tweet(req.variables, message);
      break;

    default:
      console.log("Invalid type");
      response = {
        success: false,
        message: "Invalid type",
      };
      break;
  }

  res.json(response);
}
