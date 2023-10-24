const getAvailabilityColor = (color?: string) => {
  if (color === "Dostępne") {
    return "green";
  }
  if (color === "Na zamówienie") {
    return "orange";
  }
  if (color === "Brak") {
    return "red";
  } else {
    return "black";
  }
};

export default getAvailabilityColor;
