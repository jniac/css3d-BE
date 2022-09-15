
import { Matrix, Vector3, Vector4 } from '@babylonjs/core'

/*

  a | b | c | x
  d | e | f | y
  g | h | i | z
  0 | 0 | 0 | 1

  row-major                 column-major (babylon, three internally)
  00 | 01 | 02 | 03    -    00 | 04 | 08 | 12
  04 | 05 | 06 | 07    -    01 | 05 | 09 | 13
  08 | 09 | 10 | 11    -    02 | 06 | 10 | 14
  12 | 13 | 14 | 15    -    03 | 07 | 11 | 15

*/

export const swapMatrixOrder = (numbers: ArrayLike<number>) => {
  const a1 = numbers[4 * 0 + 0], a2 = numbers[4 * 0 + 1], a3 = numbers[4 * 0 + 2], a4 = numbers[4 * 0 + 3];
  const b1 = numbers[4 * 1 + 0], b2 = numbers[4 * 1 + 1], b3 = numbers[4 * 1 + 2], b4 = numbers[4 * 1 + 3];
  const c1 = numbers[4 * 2 + 0], c2 = numbers[4 * 2 + 1], c3 = numbers[4 * 2 + 2], c4 = numbers[4 * 2 + 3];
  const d1 = numbers[4 * 3 + 0], d2 = numbers[4 * 3 + 1], d3 = numbers[4 * 3 + 2], d4 = numbers[4 * 3 + 3];
  return [
      a1, b1, c1, d1,
      a2, b2, c2, d2,
      a3, b3, c3, d3,
      a4, b4, c4, d4,
  ];
};

export const getTranslation = (numbers: ArrayLike<number>) => new Vector3(
  numbers[4 * 3 + 0],
  numbers[4 * 3 + 1],
  numbers[4 * 3 + 2],
);

export const scaleTranslation = (numbers: number[], scale: number, scaleY = scale, scaleZ = scale) => {
  numbers[4 * 3 + 0] *= scale;
  numbers[4 * 3 + 1] *= scaleY;
  numbers[4 * 3 + 2] *= scaleZ;
  return numbers;
};

export const addTranslation = (numbers: number[], x: number, y: number, z: number) => {
  numbers[4 * 3 + 0] += x;
  numbers[4 * 3 + 1] += y;
  numbers[4 * 3 + 2] += z;
  return numbers;
};

export const getRowVec4 = (numbers: ArrayLike<number>, rowIndex: number) => new Vector4(
  numbers[4 * 0 + rowIndex],
  numbers[4 * 1 + rowIndex],
  numbers[4 * 2 + rowIndex],
  numbers[4 * 3 + rowIndex],
);

export const getRowVec3 = (numbers: ArrayLike<number>, rowIndex: number) => new Vector3(
  numbers[4 * 0 + rowIndex],
  numbers[4 * 1 + rowIndex],
  numbers[4 * 2 + rowIndex],
);

export const getColVec4 = (numbers: ArrayLike<number>, colIndex: number) => new Vector4(
  numbers[0 + colIndex * 4],
  numbers[1 + colIndex * 4],
  numbers[2 + colIndex * 4],
  numbers[3 + colIndex * 4],
);

export const getColVec3 = (numbers: ArrayLike<number>, colIndex: number) => new Vector3(
  numbers[0 + colIndex * 4],
  numbers[1 + colIndex * 4],
  numbers[2 + colIndex * 4],
);

export const scaleMatrix = (numbers: number[], scale: number) => {
  numbers[0 + 0 * 4] *= scale;
  numbers[0 + 1 * 4] *= scale;
  numbers[0 + 2 * 4] *= scale;
  numbers[1 + 0 * 4] *= scale;
  numbers[1 + 1 * 4] *= scale;
  numbers[1 + 2 * 4] *= scale;
  numbers[2 + 0 * 4] *= scale;
  numbers[2 + 1 * 4] *= scale;
  numbers[2 + 2 * 4] *= scale;
  return numbers;
}

export const scaleRow4 = (numbers: number[], rowIndex: number, scale: number) => {
  numbers[rowIndex + 0 * 4] *= scale; //  0,  1
  numbers[rowIndex + 1 * 4] *= scale; //  4,  5
  numbers[rowIndex + 2 * 4] *= scale; //  8,  9
  numbers[rowIndex + 3 * 4] *= scale; // 12, 13
  return numbers;
}

export const scaleRow3 = (numbers: number[], rowIndex: number, scale: number) => {
  numbers[rowIndex + 0 * 4] *= scale;
  numbers[rowIndex + 1 * 4] *= scale;
  numbers[rowIndex + 2 * 4] *= scale;
  return numbers;
}

export const cloneArray = <T>(array: ArrayLike<T>) => {
  const length = array.length;
  const result = new Array(length);
  for (let index = 0; index < length; index++) {
      result[index] = array[index];
  }
  return result as T[];
}

export const centerModulo = (x: number, base: number) => {
  x %= base;
  const halfBase = base / 2;
  return x < -halfBase ? x + base : x > halfBase ? x - base : x;
}

export const round = (x: number, base: number) => {
  return Math.round(x / base) * base;
}

/*
  column-major                right - up - forward - translation vectors
  00 │ 04 │ 08 │ 12    <->    rx │ ux │ fx │ tx
  01 │ 05 │ 09 │ 13    <->    ry │ uy │ fy │ ty
  02 │ 06 │ 10 │ 14    <->    rz │ uz │ fz │ tz
  03 │ 07 │ 11 │ 15    <->     0 │  0 │  0 │  1
*/
export const matrixToString = (m: ArrayLike<number>) => {
  const getCol = (x: number, y: number, z: number, w: number, decimals = 3) => {
    const tr = [x, y, z, w].map(n => n.toFixed(decimals))
    const tr_max = tr.reduce((max, x) => Math.max(x.length, max), 0)
    return tr.map(x => x.padStart(tr_max, ' '))
  }
  const R = getCol(m[0], m[1], m[2], m[3], 3)
  const U = getCol(m[4], m[5], m[6], m[7], 3)
  const F = getCol(m[8], m[9], m[10], m[11], 3)
  const tr = getCol(m[12], m[13], m[14], m[15], 2)
  const lines = [
    [R[0], U[0], F[0], tr[0]].join(', '),
    [R[1], U[1], F[1], tr[1]].join(', '),
    [R[2], U[2], F[2], tr[2]].join(', '),
    [R[3], U[3], F[3], tr[3]].join(', '),
  ]
  return lines.join('\n')
}

export const toString = (value: unknown) => {
  if (value instanceof Vector3) {
    return `(${value.asArray().map(x => x.toFixed(1)).join(', ')})`
  }
  if (value instanceof Matrix) {
    return `matrix:\n${matrixToString(value.m)}`
  }
  if (Array.isArray(value) && value.length === 16 && value.every(x => typeof x === 'number')) {
    return `matrix:\n${matrixToString(value)}`
  }
  return '??'
}

export const utils = {
  swapMatrixOrder,
  getTranslation,
  scaleTranslation,
  addTranslation,

  getRowVec4,
  getRowVec3,
  getColVec4,
  getColVec3,

  scaleRow4,
  scaleRow3,
  scaleMatrix,
  
  cloneArray,
  centerModulo,
  round,

  toString,
}
