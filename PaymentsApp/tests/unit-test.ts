import { expect } from 'chai'
import 'mocha'
import paymentService from '../services/payment-service'



describe('Payment Service', function() {
    describe('Process', function() {
      it('should randomly generate both confirmed & declined results in 10 invokes', async function() {

        let hasConfirmedResult=false;
        let hasDeclinedResult = false;
        for(let i=0;i<10;i++){
            const result = await paymentService.processPayment();
            if(result==true) hasConfirmedResult = true;
            else hasDeclinedResult = true;
        }

          expect(hasConfirmedResult).to.equal(true);
          expect(hasDeclinedResult).to.equal(true);

      });
    });
  });