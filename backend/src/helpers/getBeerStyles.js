async function getBeerStyles(pool) {
  const queryText = 'SELECT DISTINCT "style" FROM beers ORDER BY "style" ASC';

  const results = await pool.query(queryText);

  const styles = (Array.from(new Set(results.rows.map(row => row.style).filter(Boolean))));

  return styles
}

module.exports = { getBeerStyles };
