type YandexConfig = {
    yandexInfoUrl: string;
};

export const getYandexConfig = (): YandexConfig =>
{
    return { yandexInfoUrl: process.env.YANDEX_LOGIN_INFO_URL };
};
