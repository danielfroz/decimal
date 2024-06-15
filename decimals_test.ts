import { assert } from "jsr:@std/assert";
import { Decimals } from './mod.ts';

const ignore = false

Deno.test({
  name: 'sum with 2 decimals',
  ignore: ignore,
  fn: () => {
    const amount = new Decimals(35.60)
    assert(amount.value === 35.6)
    assert(amount.toString() == '35.60')

    amount.add(new Decimals(4.32))
    assert(amount.intValue = 3992)
    assert(amount.toString() == '39.92')
  }
});

Deno.test({
  name: 'sum with 4 decimals from string; negative number',
  ignore: ignore,
  fn: () => {
    const amount = new Decimals('-32.4345', { decimals: 4 })
    assert(amount.sum(2.0002).value === -30.4343)
  }
})

Deno.test({
  name: '2 decimals sub',
  ignore: ignore,
  fn: () => {
    const amount = new Decimals(34.30)
    assert(amount.subtract(.78).value == 33.52)
    assert(amount.subtract(.52).value == 33.00)
    assert(amount.toString() === '33.00')
  }
})

Deno.test({
  name: '4 decimals multiplication',
  ignore: false,
  fn: () => {
    const amount = new Decimals(34.4563, { decimals: 4 })
    assert(amount.multiply(3).value == 103.3689)
  }
})

Deno.test({
  name: '2 decimals division',
  ignore: ignore,
  fn: () => {
    const amount = new Decimals(50)
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
    const amount = new Decimals(34)
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
