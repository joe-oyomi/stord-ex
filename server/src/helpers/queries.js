export const CREATE_TABLE = `
  CREATE OR REPLACE FUNCTION auto_set_timestamps()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updatedAt = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TABLE IF NOT EXISTS urls(
    url TEXT UNIQUE NOT NULL,
    shortUrl TEXT UNIQUE NOT NULL,
    count INT,
    title TEXT,
    description TEXT,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    updatedAt TIMESTAMPTZ DEFAULT NOW()
  );

  DROP TRIGGER IF EXISTS set_timestamp on urls;

  CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON urls
  FOR EACH ROW
  EXECUTE PROCEDURE auto_set_timestamps();
`;

export const GET_BY_URL = `
 SELECT * FROM urls WHERE url = $1  LIMIT 1;
`;

export const GET_BY_SHORT_URL = `
 SELECT * FROM urls WHERE shortUrl = $1  LIMIT 1;
`;

export const UPDATE_COUNT = `
    UPDATE urls
    SET count = count + 1
    WHERE shortUrl = $1;
`

export const CREATE_ENTRY = `
    INSERT INTO urls(url, shortUrl, count, title, description)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
`

export const GET_ALL = `
    SELECT * FROM urls
    ORDER BY createdAt
    OFFSET $1 LIMIT $2
`