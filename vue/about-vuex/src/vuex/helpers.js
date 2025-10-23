export const mapState = (stateNames) => {
  const obj = {};
  stateNames.forEach(stateName => {
    obj[stateName] = function () {
      return this.$store.state[stateName];
    }
  })
  return obj;
};
// 同理，mapGetters、mapMutations、mapActions也是一样的