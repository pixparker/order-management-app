import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha'
import {app} from '../server'

chai.use(chaiHttp);
const expect = chai.expect;

describe('Endpoints check', () => {
    it('should return http status 200 when called : /', done => {
      chai
        .request(app)                
        .get('/')
        .set('authorization','mock')
        .then((res) => {          
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return http status 200 when called: orders/list', done => {
      chai
        .request(app)                
        .get('/orders/all')
        .set('authorization','mock')
        .then((res) => {          
          expect(res.status).to.equal(200);
          done();
        });
    });



    it('should return http status 200 when called: orders/list', done => {
      chai
        .request(app)                
        .get('/orders/all')
        .set('authorization','mock')
        .then((res) => {          
          expect(res.status).to.equal(200);
          done();
        });
    });


  });
