  const form = document.querySelector('form');
  const nameInput = document.getElementById('name');
  const sizeInputs = document.getElementsByName('size');
  const toppingsInputs = document.getElementsByName('toppings');
  const quantityInput = document.getElementById('quantity');
  const summaryDiv = document.createElement('div');

  summaryDiv.style.margin = "20px 0";
  summaryDiv.style.padding = "10px";
  summaryDiv.style.border = "1px solid #ccc";
  summaryDiv.style.borderRadius = "8px";
  summaryDiv.style.backgroundColor = "#fafafa";
  form.parentElement.insertBefore(summaryDiv, form.nextSibling);

  function getSelectedSize() {
    for (let size of sizeInputs) {
      if (size.checked) {
        return size.value;
      }
    }
    return '';
  }

  function getSelectedToppings() {
    const selected = [];
    toppingsInputs.forEach(topping => {
      if (topping.checked) {
        selected.push(topping.value);
      }
    });
    return selected.join(', ') || 'None';
  }

  function updateSummary() {
    summaryDiv.innerHTML = `
      <h3>Order Summary:</h3>
      <p><strong>Name:</strong> ${nameInput.value || 'Not provided'}</p>
      <p><strong>Size:</strong> ${getSelectedSize() || 'Not selected'}</p>
      <p><strong>Toppings:</strong> ${getSelectedToppings()}</p>
      <p><strong>Quantity:</strong> ${quantityInput.value || '1'}</p>
    `;
  }

  form.addEventListener('input', updateSummary);

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const size = getSelectedSize();
    const quantity = quantityInput.value;

    if (!name) {
      alert('Please enter your name.');
      nameInput.focus();
      return;
    }

    if (!size) {
      alert('Please select a pizza size.');
      return;
    }

    if (quantity < 1 || quantity > 10) {
      alert('Quantity must be between 1 and 10.');
      quantityInput.focus();
      return;
    }

    alert(`Thanks, ${name}! Your order for ${quantity} ${size} pizza(s) has been placed.`);
    form.reset();
    updateSummary();
  });

  updateSummary();