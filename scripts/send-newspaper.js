const { formatPapers } = require("@/utils/formatPapers");
// const SibApiV3Sdk = require("sib-api-v3-sdk");

// const client = SibApiV3Sdk.ApiClient.instance;

// const apiKey = client.authentications["api-key"];
// apiKey.apiKey = process.env.SIB_API_KEY;

// const api = new SibApiV3Sdk.AccountApi();

export const sendNewspaper = (entry) => {
    const payload = {
        templateId: 1,
        params: {
            subtitle: `Issue ${entry.Issue} - ${formatPapers(entry.Date)}`,
            file: entry?.File?.data?.attributes.url,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/newspapers/${entry.Issue}`,
        }
    }
    return payload;
};
