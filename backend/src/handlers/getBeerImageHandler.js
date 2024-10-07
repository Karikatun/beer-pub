let yaToken = null;

const images = new Map();

const baseYandexBody = (text) => ({
  modelUri: `art://${process.env.FOLDER_ID}/yandex-art/latest`,
  messages: [
    {
      text,
      weight: 1
    }
  ],
})

function getBeerImageHandler() {
  return async function (request, h) {
    try {
      if (process.env.YANDEX_OAUTH) {
        const { name, description, style, brewery } = request.payload?.data || {};
        const { id } = request.params;

        // Если картинка уже есть, возвращаем ее
        if (images.get(id)) {
          return h.response({
            image: images.get(id)
          })
          .code(200)
          .type('application/json');
        }

        // Генерация промпта для создания картинки (длина строки итоговой не должна превышать 500 символов)
        const imagePrompt = `A photo of '${style}' named '${name}', brewery '${brewery}' and description: ${description || ''}`.substring(0, 500);

        // Если нет токена, или он просрочен, делаем запрос на получение токена
        if (!yaToken?.iamToken || new Date() > new Date(yaToken?.expiresAt)) {
          const response = await fetch('https://iam.api.cloud.yandex.net/iam/v1/tokens', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              yandexPassportOauthToken: process.env.YANDEX_OAUTH,
            })
          })

          if (!response.ok) {
            return h.response('Ошибка получения токена').code(500).type('text/plain');
          }

          const data = await response.json();

          yaToken = {...data}
        }
        
        // Делаем запрос на генерацию картинки
        const imageGenerationRequest = await fetch(
          'https://llm.api.cloud.yandex.net:443/foundationModels/v1/imageGenerationAsync',
          {
            headers: {
              'Authorization': `Bearer ${yaToken?.iamToken}`,
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(baseYandexBody(imagePrompt))
          }
        )

        // Получаем JSON-ответ
        const generationRequest = await imageGenerationRequest.json();

        if (!imageGenerationRequest.ok) {
          return h.response('Ошибка генерации изображения ' + generationRequest?.error).code(500).type('text/plain');
        }

        // Извлекаем id операции
        const idRequest = generationRequest?.id;

        await new Promise(resolve => setTimeout(resolve, 10000));

        // Согласно доке через 10 сек запрашиваем результат операции по id
        if (idRequest) {
          const response = await fetch(
            `https://llm.api.cloud.yandex.net:443/operations/${idRequest}`,
            {
              headers: {
                'Authorization': `Bearer ${yaToken?.iamToken}`
              },
              method: 'GET',
            }
          )

          // Получаем JSON-ответ
          const data = await response.json();

          if (!response.ok) {
            return h.response('Ошибка получения результата генерации изображения ' + data?.error).code(500).type('text/plain');
          }

          const image = data?.response.image;

          if (!image) {
            return h.response('Поле response.image не найдено в ответе').code(500).type('text/plain');
          }

          images.set(id, image);

          return h.response({
            image
          })
          .code(200)
          .type('application/json');
        }
      } else {
        return h.response('Ошибка при получении картинки').code(401).type('text/plain');
      }
    } catch (error) {
      console.error('Ошибка при получении картинки', error);
      return h.response('Ошибка сервера').code(500).type('text/plain');
    }
  };
};

module.exports = { getBeerImageHandler };
