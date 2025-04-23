export const formater = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price) + " đ"
}
