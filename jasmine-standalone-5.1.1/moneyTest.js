import { formatCurrency } from "../scripts/utilis/money.js";

describe('test suite : formatCurrency', () =>{
    it('converts cents into doller', () =>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('work with 0', () =>{
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('work with round number', ()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })
});