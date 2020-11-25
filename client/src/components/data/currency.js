export default {
  formatCurrency: function (num) {
    num = parseInt(num)
    return "Rs " + Number(num.toFixed(2)).toLocaleString() + " ";
  },
};
