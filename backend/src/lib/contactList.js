require("dotenv").config();

const contactList = [
  {
    name: "Twitter",
    url: "https://twitter.com/agus_barbalase",
    logo: `${process.env.VITE_BASE_URL}/public/svg/twitter.svg`,
  },
  {
    name: "Linkedin",
    url: "https://ar.linkedin.com/in/agust%C3%ADn-barbalase-884a6b1b9",
    logo: `${process.env.VITE_BASE_URL}/public/svg/linkedin.svg`,
  },
  {
    name: "Github",
    url: "https://github.com/agustinbarbalase",
    logo: `${process.env.VITE_BASE_URL}/public/svg/github.svg`,
  },
];

module.exports = contactList;