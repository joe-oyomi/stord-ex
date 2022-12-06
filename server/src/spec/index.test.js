
process.env.NODE_ENV = 'test';
import chai from 'chai';
import { query, GET_ALL, GET_BY_SHORT_URL, GET_BY_URL } from '../helpers/index.js'
import chaiHttp from 'chai-http';
import server from '../index.js';

const should = chai.should();
const expect = chai.expect;
import mocha from 'mocha';

chai.use(chaiHttp);
//Our parent block
describe('Urls', () => {
      before(async () => {
        await query('DELETE FROM urls');
      });

      it('it should create a link', (done) => {
        chai.request(server)
            .post('/shorten')
            .send({title: 'sample title', description: 'sample description', url: 'http://localhost:3000/somepath'})
            .end((err, res) => {
                  res.should.have.status(201);
              done();
            });
      });

      it('it retrieve the existing link if attempting to recreate it', (done) => {
        chai.request(server)
            .post('/shorten')
            .send({title: 'sample title', description: 'sample description', url: 'http://localhost:3000/somepath'})
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });

      it('should increment the count if the link is visited',  (done) => {
        query(GET_ALL, [0, 1]).then(resp => {
          const entry = resp.rows[0];
          const url = new URL(entry.shorturl)
          chai.request(server).get(url.pathname).then(resp => {
            query(GET_BY_SHORT_URL, [entry.shorturl]).then(response => {
              const newEntry = response.rows[0]
                expect(newEntry.count).to.be.greaterThan(entry.count);
              done();
            })
          })

        });
      })

      it('should fetch all links', (done) => {
        chai.request(server)
        .get('/stats')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
      })
});