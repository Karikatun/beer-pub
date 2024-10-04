function getBeerItemHandler(pool) {
  return async function (request, h) {
    try {
      const id= parseInt(request.params.id, 10);

      // Собираем базовый запрос
      let queryText = `SELECT * FROM beers WHERE "id" = ${id} `;

      // Выполняем запрос к базе данных
      const results = await pool.query(queryText);

      return h
        .response({
          item: results.rows[0],
        })
        .code(200)
        .type('application/json');
    } catch (error) {
      console.error('Ошибка при получении информации о пиве:', error);
      return h.response('Ошибка сервера').code(500).type('text/plain');
    }
  };
}

module.exports = { getBeerItemHandler };
