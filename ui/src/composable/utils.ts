export function arrayUnique(array: Array<any>, cmp: (a: any, b: any) => boolean): Array<any> {
  let a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (cmp(a[i], a[j])) a.splice(j--, 1);
    }
  }
  return a;
}
