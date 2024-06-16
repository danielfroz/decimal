# Introduction

This is a really simple project for supporting float point operations in
Javascript safely. Motivation is to have something that would work fine with
small numbers. To guarantee floating operations like 0.1 + 0.2 == 0.3, this
class uses integer.

This project is based on https://github.com/scurker/currency.js. Since the
purposes is different; both the implementation and results are different; but
the idea behind it remains.

By design this is ESM / Deno module. If needed we can support NPM.

# Demo

Check decimals_test.ts code for examples
