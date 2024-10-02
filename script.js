

document.addEventListener('DOMContentLoaded', () => {
  // Your existing code here

  // Select the menu toggle button
  const menuToggle = document.getElementById('mobile-menu');

  // Select the navigation list
  const navList = document.querySelector('.nav-list');

  // Add an event listener to the menu toggle button
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      // Toggle the 'active' class on the navigation list
      navList.classList.toggle('active');
    });
  }

  // Select all the menu items
  const menuItems = document.querySelectorAll('.menu-item');

  // Add an event listener to each menu item
  menuItems.forEach((menuItem) => {
    // Select the image and details of the menu item
    const image = menuItem.querySelector('img');
    const details = menuItem.querySelector('.menu-details');

    // Add an event listener to the image
    if (image) {
      image.addEventListener('click', () => {
        // Toggle the 'active' class on the details
        details.classList.toggle('active');
      });
    }
  });



  emailjs.init('JMU2-b-shUTNP7T_t');

  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get the form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      const templateParams = {
        from_name: name,
        to_name: 'namosudrabappon5@gmail.com',
        message_html: message,
        reply_to: email,
      };

      // Send the form data using EmailJS
      emailjs.send('service_6rrztem', 'template_fdgu65d', {
        name: name,
        email: email,
        message: message,
      })
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message sent successfully!');
        })
        .catch((error) => {
          console.log('FAILED...', error);
          alert('Failed to send message. Please try again.');
        });
    });
  }

  const bookTableButton = document.querySelector('.cta-button');
  if (bookTableButton) {
    bookTableButton.addEventListener('click', () => {
      window.open('booking.html');
    });
  }

  // Select the booking form
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    // Add an event listener to the form
    bookingForm.addEventListener('submit', (event) => {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Get the form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const guests = document.getElementById('guests').value;
      const specialRequests = document.getElementById('special-requests').value;

      // Send the form data to the server
      fetch('http://localhost:3000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          date,
          time,
          guests,
          specialRequests,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert('Table booked successfully!');
          bookingForm.reset();
        })
        .catch((error) => console.error(error));
    });
  }
});
