const chai = require('chai');
const chaiHttp = require('chai-http');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(chaiHttp);
// chai.use(sinonChai);

const expect = chai.expect;


const exercise1 = require('../exercise1');

describe('fizzBuzz', () => {
    it('should throw an exception if input is not a number', () => {
        const args = ['a', undefined, null, {}];
        args.forEach(a => {
            expect(() => { exercise1.fizzBuzz(a) }).to.throw();
        });
    });

    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = exercise1.fizzBuzz(15);
        expect(result).to.equal('FizzBuzz');
    });

    it('should return FizzBuzz if input is only divisible by 3', () => {
        const result = exercise1.fizzBuzz(3);
        expect(result).to.equal('Fizz');
    });

    it('should return FizzBuzz if input is only divisible by 5', () => {
        const result = exercise1.fizzBuzz(5);
        expect(result).to.equal('Buzz');
    });

    it('should return FizzBuzz if input is not divisible by 3 or 5', () => {
        const result = exercise1.fizzBuzz(1);
        expect(result).to.equal(1);
    });
});