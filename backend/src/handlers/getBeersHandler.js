function getBeersHandler(pool) {
  return async function (request, h) {
    try {
      // Получаем параметры запроса
      const page = parseInt(request.query?.page, 10) || 1;
      const limit = 10;
      const offset = (page - 1) * limit;

      // Получаем параметры сортировки
      const sortBy = request.query?.sortBy;
      const sortOrder = request.query?.sortOrder === 'desc' ? 'DESC' : 'ASC';

      const style = request.query?.style;

      // Собираем базовый запрос
      let queryText = 'SELECT "name", "style", "alcohol", "bitter", "sweet", "sour", "description" FROM beers ';
      const paramsArr = [];
      let paramIndex = 1;

      if (style) {
        queryText += `WHERE "style" = $${paramIndex++} `;
        paramsArr.push(style);
      }

      if (sortBy) {
        queryText += `ORDER BY "${sortBy}" ${sortOrder} `;
      }

      queryText += `LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
      paramsArr.push(limit, offset);

      // Собираем запрос на число элементов
      let queryCountText = 'SELECT COUNT(*) as "count" FROM beers ';
      const countParamsArr = [];
      paramIndex = 1;

      if (style) {
        queryCountText += `WHERE "style" = $${paramIndex++} `;
        countParamsArr.push(style);
      }

      // Выполняем запрос к базе данных
      const results = await pool.query(queryText, paramsArr);

      // Получаем общее количество записей для пагинации
      const countResults = await pool.query(queryCountText, countParamsArr);
      const totalItems = parseInt(countResults.rows[0].count, 10);
      const totalPages = Math.ceil(totalItems / limit);

      return h
        .response({
          beers: results.rows,
          currentPage: page,
          totalPages: totalPages,
        })
        .code(200)
        .type('application/json');
    } catch (error) {
      console.error('Ошибка при получении списка пива:', error);
      return h.response('Ошибка сервера').code(500).type('text/plain');
    }
  };
}

module.exports = { getBeersHandler };
