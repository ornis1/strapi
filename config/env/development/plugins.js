module.exports = ({ env }) => {
  console.log(env("CLOUDINARY_NAME"));
  console.log(env("CLOUDINARY_KEY"));
  console.log(env("CLOUDINARY_SECRET"));
  return {
    email: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
    },
    upload: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
    },
  };
};
