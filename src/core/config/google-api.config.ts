type GoogleApiConfig = {
    googleClientId: string;
    googleClientSecret: string;
    googleRedirectUrl: string;
};

export const getGoogleApiConfig = (): GoogleApiConfig =>
{
    return {
        googleClientId: process.env.GOOGLE_API_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
        googleRedirectUrl: process.env.GOOGLE_API_REDIRECT_URL,
    };
};