/* eslint-disable no-console */
const got = require('got');
const jsdom = require('jsdom');

const URL = 'https://www.skysports.com/premier-league-table';
const { JSDOM } = jsdom;

got(URL)
  .then((response) => {
    const dom = new JSDOM(response.body);

    /** @type {Array<HTMLTableRowElement>} */
    const rows = Reflect.apply(
      Array.prototype.slice,
      dom.window.document.querySelectorAll(
        '.standing-table .standing-table__row'
      ),
      [1, 6]
    );

    /** @type {Array<{name: string, games: string, pts: string}>} */
    const result = rows.map((row) => {
      return {
        name: row
          .querySelector('.standing-table__cell:nth-child(2)')
          .textContent.trim(),
        games: row
          .querySelector('.standing-table__cell:nth-child(3)')
          .textContent.trim(),
        pts: row
          .querySelector('.standing-table__cell:nth-child(10)')
          .textContent.trim(),
      };
    });

    console.info('Premier League Table');
    console.table(result);
  })
  .catch((error) => {
    console.error(error);
  });
