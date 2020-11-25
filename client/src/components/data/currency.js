export default {
  formatCurrency: function (num) {
    num = parseInt(num)
    return "₹ " + Number(num.toFixed(2)).toLocaleString() + " ";
  },
};
