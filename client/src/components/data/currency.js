export default {
  formatCurrency: function (num) {
    return "Rs " + Number(num.toFixed(2)).toLocaleString() + " ";
  },
};
