import emailjs from "emailjs-com";

const handleSubmit = () => {
  emailjs
    .send("service_id", "template_id", formData, "user_id")
    .then((res) => console.log("Email sent!", res))
    .catch((err) => console.error("Email error", err));
};
