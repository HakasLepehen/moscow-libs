import { HttpInterceptorFn, HttpParams } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  // Bad practice hold api key here. This use case need as example
  const apiKey = '1b9048bd-4712-44cf-9425-65d45ac4e72b';
  // I didn't get into overengineering here as part of the challenge
  const apiUrl = 'https://apidata.mos.ru/v1';

  if (req.url.startsWith(apiUrl)) {
    const clonedReq = req.clone({
      params: req.params.append('api_key', apiKey)
    });

    // Передаем клонированный запрос дальше
    return next(clonedReq);
  }

  // Если URL не совпадает, передаем оригинальный запрос
  return next(req);
};
