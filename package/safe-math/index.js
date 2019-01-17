/**
 * 获取x的精度位数
 * @param {*} x 
 */
const getPrecison = x => {
  if (Number.isInteger(x)) return 0;
  const a = `${x}`.split('.')[1];
  return a.length;
}

const safeToInt = (x, precision) => {
  return Math.round(x * precision);
}

/**
 * 将参数转换为正数再相加
 * @param {*} a 
 * @param {*} b 
 */
const safeAdd = (a, b) => {
  const precision = Math.max(getPrecison(a), getPrecison(b));
  const m = Math.pow(10, precision);
  return (safeToInt(a, m) + safeToInt(b, m)) / m;
}

/**
 * 将参数转化为正数再相乘
 * @param {*} a 
 * @param {*} b 
 */
const safeMulity = (a, b) => {
  const pa = getPrecison(a);
  const pb = getPrecison(b);
  const ma = Math.pow(10, pa);
  const mb = Math.pow(10, pb);
  return (safeToInt(a, ma) * safeToInt(b, mb)) / (ma * mb);
}

export const add = (...args) => {
  if (args.length === 0) return 0;
  if (args.length === 1) return args[0];
  return safeAdd(args[0], add(...args.slice(1)));
}

export const subtract = (a, b) => {
  return add(a, -1 * b);
}

export const mulity = (...args) => {
  if (args.length === 0) return 1;
  if (args.length === 1) return args[0];
  return safeMulity(args[0], mulity(...args.slice(1)));
}

export const divide = (a, b) => {
  if (b) {
    return mulity(a, 1/b);
  }
}
