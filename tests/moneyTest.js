import { formatCurrency } from "../scripts/utilis/money.js";

//automated testing

if(formatCurrency(2025) === '20.25'){
    console.log("passed")
}else{
    console.log('failed')
}
console.log('test 0 number')
if(formatCurrency(0) ==='0.00'){
    console.log('passed')
}else{
    console.log('failed')
}


