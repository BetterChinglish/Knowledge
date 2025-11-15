function checkRect(A, B) {
  return !(
    A.x + A.width < B.x ||
    B.x + B.width < A.x ||
    A.y + A.height < B.y ||
    B.y + B.height < A.y
  )
}

function checkCircle(A, B) {
  const dx = A.x - B.x;
  const dy = A.y - B.y;
  const distance = dx * dx + dy * dy;
  return distance < Math.pow(A.radius + B.radius, 2);
}