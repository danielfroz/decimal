/**
 * Very simple yet power Decimals helper module to deal with float calcs.
 * 
 * @example
 * ```ts
 * import { Decimal } from 'decimal'
 * 
 * const amount = new Decimal('0.1').add(.2).value
 * assert(amount === 0.3, '0.3 is expected')
 * ```
 * 
 * More examples check the test cases.
 */
interface Options {
  decimals?: number
  fromDecimal?: boolean
}

const defaults = {
  decimals: 2,
  fromDecimal: false,
} as Options

export type DecimalValue = number|string|Decimal|undefined

export class Decimal {
  public intValue: number
  public value: number
  private decimals: number
  private precision: number
  
  constructor(value: DecimalValue, options?: Options) {
    this.decimals = options?.decimals != null ? options.decimals: defaults.decimals!
    this.precision = 10 ** this.decimals
    let precision = this.precision
    if(options?.fromDecimal) {
      precision = 1
    }
    const n = this.tonum(value)
    this.intValue = Math.round(n * precision)
    this.value = this.intValue / precision
  }

  private tonum(value: DecimalValue) {
    if(value == null) {
      return 0
    }
    else if(typeof(value) === 'number') {
      return value
    }
    else if(typeof(value) === 'string') {
      const v = value.replace(/[^0-9-.]+/,'')
      return parseFloat(v)
    }
    else if(value instanceof Decimal) {
      return value.value
    }
    else {
      throw new Error('invalid value; not number, string or Decimals')
    }
  }

  private adjust(decimals: number) {
    this.decimals = decimals
    this.precision = 10 ** decimals
    // in case that we send another precision value; intValue must be adjusted for the SUM
    // this.precision = precision
    this.intValue = Math.round(this.value * this.precision)
  }

  add(value: DecimalValue, options?: Options): Decimal {
    if(options && options.decimals) {
      this.adjust(options.decimals)
    }
    const n = Math.round(this.tonum(value) * (options?.fromDecimal ? 1: this.precision))
    this.intValue = this.intValue + n
    this.value = this.intValue / this.precision
    return this
  }

  /**
   * This is an alias to add()
   * @returns Decimals
   */
  sum(value: DecimalValue, options?: Options): Decimal {
    return this.add(value, options)
  }

  subtract(value: DecimalValue, options?: Options): Decimal {
    if(options && options.decimals) {
      this.adjust(options.decimals)
    }
    const n = Math.round(this.tonum(value) * (options?.fromDecimal ? 1: this.precision))
    this.intValue = this.intValue - n
    this.value = this.intValue / this.precision

    return this
  }

  multiply(value: DecimalValue, options?: Options): Decimal {
    if(options && options.decimals) {
      this.adjust(options.decimals)
    }
    const n = this.tonum(value)
    this.intValue = Math.round(this.intValue * n)
    this.value = this.intValue / this.precision
    return this
  }

  divide(value: DecimalValue, options?: Options): Decimal {
    if(options && options.decimals) {
      this.adjust(options.decimals)
    }
    const n = this.tonum(value)
    if(n == 0) {
      throw new Error('cannot divide by 0')
    }
    this.intValue = Math.round(this.intValue / n)
    this.value = this.intValue / this.precision
    return this
  }

  equals(value: DecimalValue, options?: Options): boolean {
    if(options && options.decimals) {
      this.adjust(options.decimals)
    }
    const n = Math.round(this.tonum(value) * (options?.fromDecimal ? 1: this.precision))
    return this.intValue === n
  }

  toString(options?: Options): string {
    if(options && options.decimals) {
      this.adjust(options.decimals)
      }
    const decimals = options?.decimals ? options.decimals: this.decimals
    return `${this.value.toFixed(decimals)}`
  }
}