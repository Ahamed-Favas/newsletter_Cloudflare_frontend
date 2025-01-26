import { createTransport } from "nodemailer";

const mailer = async () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "",
        pass: ""
      }
    });
    const Emailcontent = generateEmail(feedsData);
    const mailOptions = {
      from: "",
      to: "ahamedfavasedanatt@gmail.com",
      subject: `Daily - Newsletter - ${currentDate}`,
      html: Emailcontent
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.response);
    return
  } catch (error) {
    console.error("Error while sending email:", error);
    throw error;
  }
};

mailer();
