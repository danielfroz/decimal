/**
 * Very simple yet power Decimals helper module to deal with float calcs.
 * 
 * @example
 * ```ts
 * import { Decimals } from 'decimals'
 * 
 * const amount = new Decimals('0.1').add(.2).value
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

export type DecimalsValue = number|string|Decimals|undefined

export class Decimals {
  public intValue: number
  public value: number
  private decimals: number
  private precision: number
  
  constructor(value: DecimalsValue, options?: Options) {
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

  private tonum(value: DecimalsValue) {
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
    else if(value instanceof Decimals) {
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

  add(value: DecimalsValue, options?: Options): Decimals {
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
  sum(value: DecimalsValue, options?: Options): Decimals {
    return this.add(value, options)
  }

  subtract(value: DecimalsValue, options?: Options): Decimals {
    if(options && options.decimals) {
      this.adjust(options.decimals)
    }
    const n = Math.round(this.tonum(value) * (options?.fromDecimal ? 1: this.precision))
    this.intValue = this.intValue - n
    this.value = this.intValue / this.precision

    return this
  }

  multiply(value: DecimalsValue, options?: Options): Decimals {
    if(options && options.decimals) {
      this.adjust(options.decimals)
    }
    const n = this.tonum(value)
    this.intValue = Math.round(this.intValue * n)
    this.value = this.intValue / this.precision
    return this
  }

  divide(value: DecimalsValue, options?: Options): Decimals {
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

  equals(value: DecimalsValue, options?: Options): boolean {
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