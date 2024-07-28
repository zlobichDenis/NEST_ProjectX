import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { YandexUserInfoType } from "../types/yandex-user-info.type";

type YandexAuthServiceConfig = {
  infoUrl: string;
};

@Injectable()
export class YandexAuthService
{
    private config: YandexAuthServiceConfig;

    public constructor(private readonly httpService: HttpService, private readonly configService: ConfigService)
    {
        this.config = {
            infoUrl: configService.get("yandexInfoUrl"),
        };
    }

    public async getUserInfo(token: string): Promise<YandexUserInfoType>
    {
        const { data: userInfo } = await firstValueFrom(this.httpService.get<YandexUserInfoType>(this.config.infoUrl, {
            headers: {
                Authorization: `OAuth ${token}`,
            }
        }).pipe(
          catchError((error: AxiosError) => {
              throw 'Yandex request failed'
          }),
        ));

        if (!userInfo)
        {
            return null
        }

        return userInfo;
    }
}
