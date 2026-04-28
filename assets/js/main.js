$(document).ready(function () {
  // 1. Dynamic Navbar Shadow & Resizing on Scroll
  const navbar = $("#mainNav");

  // Check initial position on reload
  if ($(window).scrollTop() > 50) {
    navbar.addClass("scrolled");
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      navbar.addClass("scrolled");
    } else {
      navbar.removeClass("scrolled");
    }

    // Side Dot Navigator - highlight active section
    const scrollPos = $(this).scrollTop() + 120;
    const sections = ["home", "about", "skills", "journey", "projects", "contact"];
    sections.forEach(function (id) {
      const section = $("#" + id);
      if (section.length) {
        const top = section.offset().top;
        const bottom = top + section.outerHeight();
        if (scrollPos >= top && scrollPos < bottom) {
          $(".dot-nav-item").removeClass("active");
          $(`.dot-nav-item[data-section="${id}"]`).addClass("active");
        }
      }
    });
  });

  // 2. Responsive adjustment for mobile collapse
  $(".nav-link").on("click", function () {
    if ($(".navbar-toggler").is(":visible")) {
      $(".navbar-collapse").collapse("hide");
    }
  });

  // 3. Form Validation with jQuery
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Grab values
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const message = $("#message").val().trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation Logic
    if (name === "") {
      $("#name").addClass("is-invalid");
      isValid = false;
    } else {
      $("#name").removeClass("is-invalid").addClass("is-valid");
    }

    if (email === "" || !emailPattern.test(email)) {
      $("#email").addClass("is-invalid");
      isValid = false;
    } else {
      $("#email").removeClass("is-invalid").addClass("is-valid");
    }

    if (message === "") {
      $("#message").addClass("is-invalid");
      isValid = false;
    } else {
      $("#message").removeClass("is-invalid").addClass("is-valid");
    }

    // Output Result
    if (isValid) {
      $("#errorMsg").addClass("d-none");

      const submitBtn = $(this).find('button[type="submit"]');
      const originalText = submitBtn.html();
      submitBtn
        .html('<i class="fa-brands fa-whatsapp fa-spin me-2"></i> Sending...')
        .prop("disabled", true);

      // Prepare WhatsApp Message
      const waNumber = "919825511650"; // Included 91 country code for India
      const waMessage = `Hello Deep, I am contacting you from your portfolio.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

      // Redirect to WhatsApp
      window.open(waUrl, "_blank");

      // Reset form
      setTimeout(() => {
        submitBtn.html(originalText).prop("disabled", false);
        $("#contactForm")[0].reset();
        $("#name, #email, #message").removeClass("is-valid");
        $("#successMsg")
          .removeClass("d-none")
          .html(
            '<i class="fa-solid fa-circle-check me-2"></i> Redirected to WhatsApp successfully!',
          );

        setTimeout(() => {
          $("#successMsg").addClass("d-none");
        }, 5000);
      }, 1500);
    } else {
      $("#successMsg").addClass("d-none");
      $("#errorMsg").removeClass("d-none");
    }
  });

  // Remove is-invalid class on user typing
  $("#name, #email, #message").on("input", function () {
    $(this).removeClass("is-invalid");
    // Hide global error message if all errors are seemingly being fixed
    if (!$(".is-invalid").length) {
      $("#errorMsg").addClass("d-none");
    }
  });


  // Interactive Architecture Flow
  $(".arch-node").on("click", function () {
    // Remove active class from all nodes
    $(".arch-node").removeClass("active");
    // Add to clicked node
    $(this).addClass("active");

    // Hide all info cards
    $(".arch-card").addClass("d-none");

    // Show target info card
    const targetId = $(this).attr("data-info");
    $("#" + targetId).removeClass("d-none");
  });

  // =============================================
  // Mobile Project Scroll Dot Indicators
  // =============================================
  const projectsRow = $(".projects-row");
  const projectDots = $(".project-dot");

  if (projectsRow.length && projectDots.length) {
    projectsRow.on("scroll", function () {
      const scrollLeft = $(this).scrollLeft();
      const cardWidth = $(this).find(".project-col").first().outerWidth(true);
      // Which card index is most in view?
      const index = Math.round(scrollLeft / cardWidth);
      const clampedIndex = Math.min(index, projectDots.length - 1);

      projectDots.removeClass("active");
      projectDots.eq(clampedIndex).addClass("active");
    });

    // Clicking a dot scrolls to that card
    projectDots.on("click", function () {
      const index = parseInt($(this).attr("data-index"));
      const cardWidth = projectsRow.find(".project-col").first().outerWidth(true);
      projectsRow.animate({ scrollLeft: cardWidth * index }, 300);
    });
  }




});
