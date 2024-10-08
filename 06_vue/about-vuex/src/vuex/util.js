
const objForEach = (obj = {}, fn) => {
  Object.keys(obj).forEach(key => fn(key, obj[key]))
};

export {
  objForEach
}