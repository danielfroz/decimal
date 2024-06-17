/**
 * This is a DENO specific test file
 */
import { assert } from "jsr:@std/assert";
import { Decimal } from './mod.ts';

const ignore = false

Deno.test({
  name: 'sum with 2 decimals',
  ignore: ignore,
  fn: () => {
    const amount = new Decimal(35.60)
    assert(amount.value === 35.6)
    assert(amount.toString() == '35.60')

    amount.add(new Decimal(4.32))
    assert(amount.intValue = 3992)
    assert(amount.toString() == '39.92')
  }
});

Deno.test({
  name: 'sum with 2 decimals; constructor using fromDecimal',
  ignore: ignore,
  fn: () => {
    const amount = new Decimal(3560, { fromDecimal: true })
    assert(amount.value === 35.6, '35.6 is expected')
    const addition = new Decimal('34.32')
    const sum = amount.add(addition)
    assert(sum.intValue === 6992, '6992 is expected')
    assert(sum.value === 69.92, '69.92 is expected')
  }
})

Deno.test({
  name: 'sum with 4 decimals from string; negative number',
  ignore: ignore,
  fn: () => {
    const amount = new Decimal('-32.4345', { decimals: 4 })
    assert(amount.sum(2.0002).value === -30.4343)
  }
})

Deno.test({
  name: 'sub with 2 decimals',
  ignore: ignore,
  fn: () => {
    const amount = new Decimal(34.30)
    assert(amount.subtract(.78).value == 33.52)
    assert(amount.subtract(.52).value == 33.00)
    assert(amount.toString() === '33.00')
  }
})

Deno.test({
  name: 'multiplication with 4 decimals',
  ignore: false,
  fn: () => {
    const amount = new Decimal(34.4563, { decimals: 4 })
    assert(amount.multiply(3).value == 103.3689)
  }
})

Deno.test({
  name: 'division with 2 decimals',
  ignore: ignore,
  fn: () => {
    const amount = new Decimal(50)
    assert(amount.divide(2).value === 25)
    assert(amount.divide(3).value == 8.33)
    assert(amount.toString() === '8.33')
    assert(amount.toString({ decimals: 4 }))
  }
})

Deno.test({
  name: 'chained operations with fromDecimals',
  ignore: ignore,
  fn: () => {
    const amount = new Decimal(34)
    amount
      .add(34, { decimals: 2, fromDecimal: true })
      .add(16, { decimals: 4, fromDecimal: true })
      .subtract(2, { decimals: 4, fromDecimal: true })
      .subtract(3414, { decimals: 4, fromDecimal: true })
      .multiply(2, { decimals: 2 })
    assert(amount.value === 68)
    assert(amount.toString() === '68.00')
  }
})

Deno.test({
  name: 'sum with undefined variable',
  fn: () => {
    const amount = new Decimal(10_000)

    let incr: number|undefined = 302
    amount.add(incr)
    assert(amount.value == 10_302)

    // this shall not cause any problem...
    incr = undefined
    amount.add(incr)
    assert(amount.value == 10_302)
  }
})
