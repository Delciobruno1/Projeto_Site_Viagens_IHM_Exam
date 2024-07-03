// booking.js

let bookingData = {
    oneWay: {
      arrival: '',
      departure: '',
      date: ''
    },
    roundTrip: {
      arrival: '',
      departure: '',
      date: ''
    },
    multiCity: {
      arrival: '',
      departure: '',
      date: ''
    }
  };
  
  function scheduleNow() {
    const currentType = document.querySelector('.booking__type .active').innerText;
    const arrival = document.getElementById('arrival').value;
    const departure = document.getElementById('departure').value;
    const date = document.getElementById('date').value;
  
    if (currentType === 'Só de ida') {
      bookingData.oneWay = { arrival, departure, date };
    } else if (currentType === 'Ida e volta') {
      bookingData.roundTrip = { arrival, departure, date };
    } else if (currentType === 'Multi-cidade') {
      bookingData.multiCity = { arrival, departure, date };
    }
  
    alert('Reserva agendada com sucesso!');
  }
  
  function changeBookingType(type) {
    let bookingType = 'oneWay';
    if (type === 'round-trip') {
      bookingType = 'roundTrip';
    } else if (type === 'multi-city') {
      bookingType = 'multiCity';
    }
  
    document.getElementById('arrival').value = bookingData[bookingType].arrival;
    document.getElementById('departure').value = bookingData[bookingType].departure;
    document.getElementById('date').value = bookingData[bookingType].date;
  
    const bookingTypeElements = document.getElementById('booking-type').children;
    for (let i = 0; i < bookingTypeElements.length; i++) {
      bookingTypeElements[i].classList.remove('active');
    }
    event.target.classList.add('active');
  }
  