

document.addEventListener('DOMContentLoaded', function () {
  console.log('Script is running.');
  // Get all the "Complete!" buttons
  const completeButtons = document.querySelectorAll('.button.is-primary');

  // Add a click event listener to each button
  completeButtons.forEach((button) => {
    button.addEventListener('click', toggleCardState);
  });

  // Function to toggle the card state
  function toggleCardState(event) {
    const button = event.target;
    const card = button.parentElement;
    const mainColumn = card.closest('.mainColumn');
    const mainSection = mainColumn.closest('.mainSection');
    const buttonsInMainColumn = mainColumn.querySelectorAll('.button.is-primary');
    console.log(button.textContent === 'Complete!')
    console.log(button.textContent.trim() === 'Complete!')

    if (button.textContent.trim() === 'Complete!') {
      // Card is not completed yet
      button.textContent = 'Re-open';
      card.classList.add('completedCard');
      card.classList.remove('todoCard');
    } else {
      // Card is already completed, reset to the original state
      button.textContent = 'Complete!';
      card.classList.remove('completedCard');
      card.classList.add('todoCard');
    }

    checkAllButtonsCompleted(mainColumn, buttonsInMainColumn);
  }

  // Function to check if all buttons in a mainColumn are complete and show modal
  function checkAllButtonsCompleted(mainColumn, buttons) {
    const allComplete = Array.from(buttons).every((button) => button.textContent === 'Re-open');

    if (allComplete) {
      // All buttons in the mainColumn are completed, show the modal in the corresponding mainColumn
      if (mainColumn.classList.contains('judeTasks')) {
        showModal('.judeModal');
      } else if (mainColumn.classList.contains('jadeTasks')) {
        showModal('.jadeModal');
      }
    }
  }

  // Function to show the modal
  function showModal(modalClass) {
    const modal = document.querySelector(modalClass);
    modal.classList.add('is-active'); // Add the 'is-active' class to show the modal

    // Add a click event listener to the modal close button to close the modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.classList.remove('is-active'); // Remove the 'is-active' class to hide the modal
    });
  }


  const textButton = document.querySelectorAll('.sendText')


  for (let i = 0; i < textButton.length; i++) {

    textButton[i].addEventListener('click', (event) => {
      const userInput = document.querySelector(".input").value
      console.log(event.target.dataset.receiver)
      // fetch('https://textbelt.com/text', {
      //   method: 'post',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     phone: '7738496878',
      //     message: userInput,
      //     key: 'textbelt',
      //   }),
      // }).then(response => {
      //   return response.json();
      // }).then(data => {
      //   console.log(data);
      // });
      fetch("/api/text", {
        method: "post", headers: {"Content-Type":"application/json"}, body: JSON.stringify({
          body: userInput
        })
      }).then(response => {
        return response.json();
      }).then(data => {
        console.log(data);
        const judeModal = document.querySelector(".judeModal");
        const jadeModal = document.querySelector(".jadeModal");
        judeModal.classList.remove('is-active')
        jadeModal.classList.remove('is-active')
      })
      })
    }




// MODAL TESTING CODE
// Get the modal elements
const judeModal = document.querySelector('.judeModal');
    const jadeModal = document.querySelector('.jadeModal');
    const judeModalTriggerButton = document.querySelector('.judeTasks .js-modal-trigger');
    const jadeModalTriggerButton = document.querySelector('.jadeTasks .js-modal-trigger');

    // Add click event listeners to open the modals
    judeModalTriggerButton.addEventListener('click', () => {
      showModal('.judeModal');
    });

    jadeModalTriggerButton.addEventListener('click', () => {
      showModal('.jadeModal');
    });




    // MODAL TESTING CODE
    // Get the modal element and the button to trigger it
    const modal = document.querySelector('.jadeModal');
    const modalTriggerButton = document.querySelector('.js-modal-trigger');

    // Add a click event listener to the button to open the modal
    modalTriggerButton.addEventListener('click', () => {
      modal.classList.add('is-active'); // Add the 'is-active' class to show the modal
    });

    // Add a click event listener to the modal close button to close the modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.classList.remove('is-active'); // Remove the 'is-active' class to hide the modal
    });
  });