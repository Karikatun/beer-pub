function getBeersStylesHandler(styles) {
  return async function (res, h) {
    try {
      return h
        .response({ styles: styles })
        .code(200)
        .type('application/json');
    } catch (error) {
      console.error('Ошибка при получении списка видов пива:', error);
      return h.response('Ошибка сервера').code(500).type('text/plain');
    }
  }
} 

module.exports = { getBeersStylesHandler };
