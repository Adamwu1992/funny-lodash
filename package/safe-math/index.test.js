import { add, mulity } from './index'

function add_suit(a, b, r) {
  it(`add ${a}, ${b} should return ${r}`, () => {
    expect(add(a, b)).toBe(r)
  })
}
function mul_suit(a, b, r) {
  it(`mulity ${a}, ${b} should return ${r}`, () => {
    expect(mulity(a, b)).toBe(r)
  })
}

describe('Add:', () => {
  add_suit(0.1, 0.2, 0.3)
  add_suit(0.1, 0.7, 0.8)
  add_suit(0.2, 0.4, 0.6)
  add_suit(2.22, 0.1, 2.32)

  add_suit(1.5, -1.2, 0.3)
  add_suit(0.3, -0.2, 0.1)
  add_suit(2.1, -2, 0.1)
  add_suit(2.2, -2, 0.2)
  add_suit(2.01, -2, 0.01)
  add_suit(2.02, -2, 0.02)
  add_suit(2.001, -2, 0.001)
  add_suit(999.1, -999, 0.1)
  add_suit(999.01, -999, 0.01)
  add_suit(999.001, -999, 0.001)
})

describe('Mulity:', () => {
  mul_suit(19.9, 100, 1990)
  mul_suit(19.9, 100, 1990)
  mul_suit(0.7, 180, 126)
  mul_suit(9.7, 100, 970)
  mul_suit(39.7, 100, 3970)
  mul_suit(1306377.64, 100, 130637764)
  mul_suit(2.01, 100, 201)

  mul_suit(0.3, 1/0.1, 3)
  mul_suit(0.69, 1/10, 0.069)
})
