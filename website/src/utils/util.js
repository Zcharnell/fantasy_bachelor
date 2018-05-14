export function deepValue(obj, path) {
  // var objCopy = obj;
  for (let i = 0, path = path.split('.'), len = path.length; i < len; i += 1) {
    obj = obj[path[i]];
    if (typeof obj === 'undefined') {
      console.error(`Deep Value path undefined at "${path[i]}".`);
      break;
    }
  }
  return obj;
}

export function getModelValue(obj, path) {
  return deepValue(obj, path);
}

export default {
  getModelValue,
};
