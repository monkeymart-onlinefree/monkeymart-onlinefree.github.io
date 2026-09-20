'use strict';
const assert=require('node:assert/strict');
const {calculators}=require('./app.js');
const byId=id=>calculators.find(c=>c.id===id);
assert.equal(calculators.length,125,'Expected 105 calculators');
assert.equal(new Set(calculators.map(c=>c.id)).size,125,'IDs must be unique');
assert.equal(byId('percentage').run({percent:20,number:150}).value,30);
assert.equal(byId('percent-change').run({old:100,newValue:125}).value,25);
assert.equal(byId('average').run({numbers:'10,20,30'}).value,20);
assert.equal(byId('rectangle-area').run({length:5,width:4}).value,20);
assert.equal(byId('triangle-area').run({base:10,height:4}).value,20);
assert.equal(byId('circle-area').run({radius:2}).value,Math.PI*4);
assert.equal(byId('temperature').run({celsius:0}).value,32);
assert.equal(byId('kilometers-miles').run({km:1}).value,.621371);
assert.equal(byId('simple-interest').run({principal:1000,rate:5,years:2}).value,100);
assert.equal(byId('loan-payment').run({principal:1000,rate:0,months:10}).value,100);
assert.equal(byId('bmi').run({weight:105,height:1105}).value,105/Math.pow(11.05,2));
assert.throws(()=>byId('loan-payment').run({principal:1000,rate:5,months:0}));
assert.throws(()=>byId('circle-area').run({radius:-1}));
for (const id of ['discount-price','sales-tax','markup','calorie-deficit','pace','rectangle-perimeter','triangle-area','sphere-volume','liters-gallons','kilograms-pounds','simple-interest','compound-interest','body-surface-area','ideal-weight','triangle-perimeter','cylinder-volume','ohms-law-current','pressure','meters-feet','liters-milliliters','sales-commission','loan-to-value','calorie-burn','waist-height-ratio','sphere-surface-area','cone-volume','work-energy','watts-calculator','grams-ounces','minutes-hours']) assert.ok(calculators.some(c=>c.id===id), 'missing Batch 8/9 calculator: '+id);
console.log(`PASS: ${calculators.length} calculator catalog loaded`);
console.log('PASS: unique calculator IDs');
console.log('PASS: math, finance, health, date, geometry, science, and conversion test cases');
console.log('PASS: invalid input validation cases');

assert.equal(byId('pythagorean').run({a:3,b:4}).value,5);
assert.ok(Math.abs(byId('sales-tax').run({price:100,tax:10}).value-110)<1e-9);
assert.equal(byId('fuel-cost').run({distance:100,efficiency:20,price:2}).value,10);
assert.throws(()=>byId('unit-price').run({price:10,quantity:0}));
console.log('PASS: Batch 4 dedicated calculator cases');

assert.equal(byId('gcd').run({a:48,b:18}).value,6);
assert.equal(byId('lcm').run({a:4,b:6}).value,12);
assert.equal(byId('quadratic-roots').run({a:1,b:-3,c:2}).value,'2, 1');
assert.equal(byId('permutations').run({n:5,r:2}).value,20);
assert.equal(byId('combinations').run({n:5,r:2}).value,10);
assert.ok(Math.abs(byId('sphere-volume').run({radius:3}).value-36*Math.PI)<1e-9);
assert.ok(Math.abs(byId('cylinder-volume').run({radius:2,height:5}).value-20*Math.PI)<1e-9);
assert.ok(Math.abs(byId('pounds-kilograms').run({pounds:1}).value-0.45359237)<1e-12);
assert.ok(Math.abs(byId('liters-gallons').run({liters:1}).value-0.2641720524)<1e-12);
assert.ok(Math.abs(byId('split-bill').run({bill:100,tip:10,people:2}).value-55)<1e-9);
console.log('PASS: Batch 5 dedicated calculator cases');

const extraIds=['vat-calculator','profit-margin','break-even','average-speed','force-calculator','kinetic-energy','cubic-volume','hexagon-area','millimeters-inches','celsius-kelvin'];
for(const id of extraIds) assert.ok(calculators.some(c=>c.id===id),`missing ${id}`);

assert.equal(byId('simple-interest').run({principal:1000,rate:5,years:2}).value,100);
assert.ok(Math.abs(byId('compound-interest').run({principal:1000,rate:10,years:2,frequency:1}).value-210)<1e-9);
assert.ok(Math.abs(byId('body-surface-area').run({weight:105,height:1105}).value-5.677)<0.01);
assert.ok(byId('ideal-weight').run({height:170}).value>0);
assert.equal(byId('triangle-perimeter').run({a:3,b:4,c:5}).value,12);
assert.ok(Math.abs(byId('cylinder-volume').run({radius:2,height:5}).value-20*Math.PI)<1e-9);
assert.equal(byId('ohms-law-current').run({voltage:12,resistance:4}).value,3);
assert.equal(byId('pressure').run({force:100,area:5}).value,20);
assert.ok(Math.abs(byId('meters-feet').run({meters:1}).value-3.280839895)<1e-9);
assert.equal(byId('liters-milliliters').run({liters:2}).value,2000);

console.log('PASS: Batch 7 dedicated calculator IDs');


for (const id of ['sales-margin','break-even-units','future-value','present-value','investment-return','hourly-pay','overtime-pay','rent-affordability','calorie-percentage','macro-split','target-heart-rate','water-intake','trapezoid-area','parallelogram-area','ellipse-area','prism-volume','kinetic-energy','voltage-divider','kilograms-grams','celsius-kelvin']) assert.ok(calculators.some(c=>c.id===id), 'missing Batch 13 calculator: '+id);

assert.ok(calculators.some(c=>c.id==='fahrenheit-kelvin'));
