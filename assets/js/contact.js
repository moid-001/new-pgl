/* ==========================================================================
   📞 PERFECT GULF LIMITED (PGL) - CONTACT GATEWAY
   Form validation engine, success popups, WhatsApp deep-link builder
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

/**
 * Attaches submit listeners, validates inputs, and triggers WhatsApp redirections
 */
function initContactForm() {
  const form = document.getElementById('pgl-contact-form');
  if (!form) return;

  const btnSubmit = form.querySelector('.btn-submit');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Reset existing alert fields
    clearErrors();

    // 2. Fetch all values
    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const phone = form.querySelector('#contact-phone').value.trim();
    const company = form.querySelector('#contact-company').value.trim() || 'N/A';
    const service = form.querySelector('#contact-service').value;
    const projectType = form.querySelector('#contact-project-type').value;
    const message = form.querySelector('#contact-message').value.trim();
    const contactMethod = form.querySelector('input[name="preferred-contact"]:checked')?.value || 'Email';

    // 3. Validation Logic
    let hasErrors = false;

    if (!name) {
      showError('#contact-name', 'Full name is required.');
      hasErrors = true;
    }

    if (!email || !validateEmail(email)) {
      showError('#contact-email', 'Please enter a valid email address.');
      hasErrors = true;
    }

    if (!phone) {
      showError('#contact-phone', 'Phone number is required.');
      hasErrors = true;
    }

    if (service === '') {
      showError('#contact-service', 'Please select a service.');
      hasErrors = true;
    }

    if (!message) {
      showError('#contact-message', 'Message details cannot be empty.');
      hasErrors = true;
    }

    if (hasErrors) return;

    // 4. Submission Simulation
    btnSubmit.disabled = true;
    const originalText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Submitting Request...';

    setTimeout(() => {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = originalText;
      
      // Construct a premium success modal / message
      const formContainer = form.parentElement;
      form.style.display = 'none';

      const successModal = document.createElement('div');
      successModal.className = 'glass-card text-center reveal fade-in visible';
      successModal.style.padding = '40px';
      successModal.innerHTML = `
        <div style="width: 80px; height: 80px; background: rgba(37, 211, 102, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; border: 2px solid #25d366;">
          <i class="fas fa-check" style="color: #25d366; font-size: 2.5rem;"></i>
        </div>
        <h3 style="margin-bottom: 10px; color: var(--dark-blue);">Consultation Request Received</h3>
        <p style="margin-bottom: 25px;">Thank you, <strong>${name}</strong>. We have logged your request regarding <strong>${service}</strong> and will reach out to you via your preferred method (<strong>${contactMethod}</strong>) shortly.</p>
        <div class="flex flex-center" style="gap: 15px; flex-wrap: wrap;">
          <button class="btn btn-primary" id="btn-return-form">Send Another Message</button>
          <a href="${buildWhatsAppLink(name, service, message)}" target="_blank" class="btn btn-secondary flex-center" style="gap: 8px;">
            <i class="fab fa-whatsapp"></i> Chat Live on WhatsApp
          </a>
        </div>
      `;

      formContainer.appendChild(successModal);

      // Return button listener to reload the form if desired
      document.getElementById('btn-return-form').addEventListener('click', () => {
        successModal.remove();
        form.reset();
        form.style.display = 'block';
      });

      // If user selected WhatsApp as preferred contact method, automatically redirect after 2s
      if (contactMethod === 'WhatsApp') {
        setTimeout(() => {
          window.open(buildWhatsAppLink(name, service, message), '_blank');
        }, 1500);
      }

    }, 2000);
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const showError = (selector, message) => {
    const field = form.querySelector(selector);
    field.style.borderColor = '#ff3838';
    field.style.boxShadow = '0 0 5px rgba(255, 56, 56, 0.2)';
    
    const errorEl = document.createElement('span');
    errorEl.className = 'field-error-msg';
    errorEl.style.cssText = 'color: #ff3838; font-size: 0.8rem; font-weight: 500; margin-top: 4px; display: block;';
    errorEl.textContent = message;
    field.parentNode.appendChild(errorEl);
  };

  const clearErrors = () => {
    form.querySelectorAll('.field-error-msg').forEach(el => el.remove());
    form.querySelectorAll('input, select, textarea').forEach(el => {
      el.style.borderColor = '';
      el.style.boxShadow = '';
    });
  };

  const buildWhatsAppLink = (name, service, message) => {
    const baseNum = '966563151891';
    const textMsg = `Hello Perfect Gulf Limited! My name is ${name}. I would like to schedule a consultation regarding your service: "${service}". Here are some quick details: "${message.substring(0, 150)}..."`;
    return `https://wa.me/${baseNum}?text=${encodeURIComponent(textMsg)}`;
  };
}
