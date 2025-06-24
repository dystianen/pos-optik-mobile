const formatCurrency = (data: number | string) => {
  const price = Number(data);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

export { formatCurrency };
