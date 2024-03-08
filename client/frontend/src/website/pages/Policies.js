import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Policies() {
  const termsAndConditions = [
    {
      title: "Acceptance of Terms",
      subheadings: [
        "1.1 By registering on the NFLUENCER platform, you agree to comply with and be bound by these terms and conditions.",
        "1.2 If you do not agree with any part of these terms, you should not proceed with the registration process.",
      ],
    },
    {
      title: "User Eligibility",
      subheadings: [
        "2.1 To register on NFLUENCER, you must be at least 18 years old.",
        "2.2 You are responsible for providing accurate and current information during the registration process.",
      ],
    },
    {
      title: "User Account",
      subheadings: [
        "3.1 You are solely responsible for maintaining the confidentiality of your account and password.",
        "3.2 Any activity that occurs under your account is your responsibility.",
        "3.3 Notify NFLUENCER immediately of any unauthorized use of your account or any other breach of security.",
      ],
    },
    {
      title: "User Content",
      subheadings: [
        "4.1 By creating and publishing gigs or NFTs, you affirm that you have the right to share the content, and it does not violate any third-party rights.",
        "4.2 NFLUENCER reserves the right to remove any content that violates these terms or is deemed inappropriate.",
      ],
    },
    {
      title: "Prohibited Activities",
      subheadings: [
        "5.1 Users are prohibited from engaging in any unlawful, offensive, or harmful activities on the platform.",
        "5.2 NFLUENCER reserves the right to suspend or terminate accounts engaging in prohibited activities.",
      ],
    },
    {
      title: "Payment and Transactions",
      subheadings: [
        "6.1 Users agree to provide accurate payment information for any transactions on the platform.",
        "6.2 NFLUENCER uses secure payment gateways; however, users are responsible for any unauthorized transactions if they compromise their account credentials.",
      ],
    },
    {
      title: "Communication",
      subheadings: [
        "7.1 Users may receive notifications, updates, and promotional messages from NFLUENCER. Opting out of essential communications may affect the use of the platform.",
        "7.2 NFLUENCER may use the provided contact information to communicate with users regarding their account, services, or updates.",
      ],
    },
    {
      title: "Termination of Account",
      subheadings: [
        "8.1 Either the user or NFLUENCER may terminate the account at any time for any reason.",
        "8.2 Termination may result in the loss of content and access to certain features.",
      ],
    },
    {
      title: "Privacy Policy",
      subheadings: [
        "9.1 Users must read and agree to the NFLUENCER Privacy Policy, which outlines how personal information is collected, used, and shared.",
        "9.2 NFLUENCER is committed to protecting user privacy and maintaining the confidentiality of user data.",
      ],
    },
    {
      title: "Changes to Terms",
      subheadings: [
        "10.1 NFLUENCER reserves the right to modify or update these terms and conditions at any time.",
        "10.2 Users will be notified of any changes, and continued use of the platform constitutes acceptance of the modified terms.",
      ],
    },
  ];

  return (
    <>
      <div className="bg-transparent hombg">
        <Header transparent={true} />
      </div>

      <div className="container py-10 mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-5">
          NFLUENCER Platform Terms and Conditions
        </h1>

        {termsAndConditions.map((term, index) => {
          return (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {index + 1}. {term.title}
              </h2>
              <ul>
                {term.subheadings.map((subheading, index) => {
                  return (
                    <li key={index} className="mb-1">
                      {subheading}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        <p>
          By registering on the NFLUENCER platform, you acknowledge that you
          have read, understood, and agreed to these terms and conditions.
        </p>
      </div>

      <Footer />
    </>
  );
}
export default Policies;
