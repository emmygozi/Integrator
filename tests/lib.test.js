const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
// const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(chaiHttp);
chai.use(sinonChai);

const expect = chai.expect;


const libb = require('../lib');
const db = require('../mockdb');
const mail = require('../mail');

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = libb.absolute(1);
        expect(result).to.equal(1);
        });
        
    it('should return a positive number if input is negative', () => {
        const result = libb.absolute(-1);
        expect(result).to.equal(1);
        });
        
    it('should return 0 if input is 0', () => {
        const result = libb.absolute(0);
        expect(result).to.equal(0);
        });
});

describe('greet', () => {
    it('should return a greeting message', () => {
        const result = libb.greet('Mosh');
        expect(result).to.match(/Mosh/);
        expect(result).to.include('Mosh');
        });
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = libb.getCurrencies();


        //Ideal way
        expect(result).to.include.members(['EUR', 'USD', 'AUD']);
        });
});

describe('getProduct', () => {
    it('should return the product with the given ID', () => {
        const result = libb.getProduct(1);

        expect(result).to.deep.include({ id: 1, price: 10 }); // to have at least the object defined
        expect(result).to.have.property('id', 1);
        });
});

describe('registerUser', () => {
    it('should throw if user name is falsy', () => {
        // Null
        // undefined
        // NaN
        // 0
        // false
        expect(() => { libb.registerUser(null)}).to.throw();
        const args = [null, undefined, NaN, 0, false];
        args.forEach(a => {
            expect(() => { libb.registerUser(a) }).to.throw();
        });
    });

    it('should return a user object if valid username is passed', () => {
        const result = libb.registerUser('mosh');
        expect(result).to.deep.include({ username: 'mosh' }); // to have at least the object defined
        expect(result.id).to.be.above(0); // represents date property. it's a workaround to test date property
    });


});

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        db.getCustomerSync = (customerId) => {  // mock db function
            console.log('Fake reading customer...');
            return {id: customerId, points: 20};
        }
        const order = { customerId: 1, totalPrice: 10 }; // order objects defined 
        libb.applyDiscount(order);
        expect(order.totalPrice).to.equal(9);
        });
});

describe('notifyCustomer', () => {
    it('should send email to the customer', () => {

        // db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
        const spy = sinon.spy(db, 'getCustomerSync');

         spy.withArgs({ email: 'a' });
    

        mail.send = sinon.spy();
        libb.notifyCustomer({ customerId: 1});

        expect(mail.send).to.have.been.called;

        db.getCustomerSync = customerId => {  // mock db function
            return { email: 'a'};
        }
        let mailSent = false;
        mail.send = (email, message) =>{
            mailSent = true;
        }
        libb.notifyCustomer({ customerId: 1});
        expect(mailSent).to.equal(true);
        });

        it('should use mock function to simplify sending mail as done above to the customer', () => {
            // using mock function to simplify sending mail as done above
           // db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
            const spy = sinon.spy(db, 'getCustomerSync');

           spy.withArgs({ email: 'a' });
    
            // mail.send = jest.fn();
            mail.send = sinon.spy();
            libb.notifyCustomer({ customerId: 1});

            
    
            expect(mail.send).to.have.been.called;

            const first = sinon.stub();
            const second = sinon.stub();
            // expect(mail.send.mock.calls[0][0]).toBe('a');
            expect(mail.send(first, second)).to.equal(undefined);
 
            // // Jasmine equivalent
            // it("tracks the arguments of each call", function() {
            //     foo.setBar(123);
            //     foo.setBar(456, "baz");
            
            //     expect(foo.setBar.calls.argsFor(0)).toEqual([123]);
            //     expect(foo.setBar.calls.argsFor(1)).toEqual([456, "baz"]);
            //   });

            // it("tracks the arguments of all calls", function() {
            //     foo.setBar(123);
            //     foo.setBar(456, "baz");
            
            //     expect(foo.setBar.calls.allArgs()).toEqual([[123],[456, "baz"]]);
            //   });
            // it("tracks the number of times it was called", function() {
            //     expect(foo.setBar.calls.count()).toEqual(0);
            
            //     foo.setBar();
            //     foo.setBar();
            
            //     expect(foo.setBar.calls.count()).toEqual(2);
            //   });
        });
});