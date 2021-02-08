import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha'
import {app} from '../server'

chai.use(chaiHttp);
const expect = chai.expect;

describe('Endpoints check', () => {
    it('should return confirmed or declined after called', done => {
      chai
        .request(app)                
        .post('/process-payment')
        .set('authorization','mock')
        .then((res) => {          
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
