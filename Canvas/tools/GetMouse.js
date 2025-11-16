
function getMouse(element) {
  console.log(element.offsetHeight, element.offsetWidth);
  const position = {
    x: null,
    y: null
  }
  
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    position.x = e.clientX - rect.left;
    position.y = e.clientY - rect.top;
  })
  
  return position;
}



