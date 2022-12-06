import shortid from "shortid";
import { query, CREATE_ENTRY, GET_BY_URL, GET_BY_SHORT_URL, UPDATE_COUNT, GET_ALL } from '../helpers/index.js';

const baseUrl = process.env.BASE_URL;
const frontEndUrl = process.env.FRONTEND_URL;

class ShortnerController {
  constructor() {
  }
    async shorten(req, res, next) {
      try {
      const { body } = req;
      const { url, title, description } = body;
      const alreadyExistingUrl = await query(GET_BY_URL, [url]);
      if(alreadyExistingUrl.rowCount > 0) {
        return res.status(200).json({data: alreadyExistingUrl.rows[0], statusCode: 200, error: null, message: 'success'})
      };

      const slug = shortid.generate();
      const shortUrl = `${baseUrl}/${slug}`;
      const response = await query(CREATE_ENTRY, [url, shortUrl, 0, title, description])
      return res.status(201).json({data: response.rows[0], statusCode: 201, message: 'success', error: null})
    } catch(error) {
      next(error)
    }
  }

  async redirect(req, res, next) {
    try {
      const { params: { slug } } = req;
      const shortUrl = `${baseUrl}/${slug}`;
      const alreadyExistingShortUrl = await query(GET_BY_SHORT_URL, [shortUrl]);
      if(alreadyExistingShortUrl.rowCount > 0) {
        const entry = alreadyExistingShortUrl.rows[0]
        await query(UPDATE_COUNT, [shortUrl]);
        return res.status(302).redirect(entry.url);
      }
      return res.status(302).redirect(`${frontEndUrl}/not-found`)
    } catch(error) {
      next(error)
    }
  }

  async stats(req, res, next) {
    try {
      const { query: queryString } = req;
      const offset = queryString.offset || 0;
      const limit = queryString.limit || 100;
      const data = await query(GET_ALL, [offset, limit]);
      return res.status(200).json({data: data.rows, message: 'success', statusCode: 200, error: null})
    }catch(error) {
      next(error)
    }
  }
}

export default ShortnerController
