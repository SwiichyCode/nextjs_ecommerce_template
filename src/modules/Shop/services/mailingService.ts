import sgMail from "@sendgrid/mail";
import { env } from "@/env";

class MailingService {
  static async sendOrderConfirmationEmail(customerEmail: string) {
    if (!customerEmail) {
      throw new Error("customer email is not defined");
    }

    sgMail.setApiKey(env.SENDGRID_API_KEY);

    const sendGridMail = {
      to: customerEmail,
      from: env.SENDGRID_EMAIL_FROM,
      templateId: env.SENDGRID_ORDER_CONFIRMATION_TEMPLATE_ID,
      // Implement dynamic template data
    };

    await sgMail.send(sendGridMail);
  }
}

export default MailingService;
