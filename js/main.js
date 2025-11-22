// Medical Clinic - Main JavaScript File

$(document).ready(function() {
    
    // ===== Set Active Navigation Link =====
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        $('.navbar-nav .nav-link').each(function() {
            const linkHref = $(this).attr('href');
            if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    }
    setActiveNavLink();

    // ===== Smooth Scroll =====
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // ===== FAQ Accordion =====
    $('.faq-question').on('click', function() {
        const $answer = $(this).next('.faq-answer');
        const $allAnswers = $('.faq-answer');
        const $allQuestions = $('.faq-question');
        
        // Close all other FAQs
        $allAnswers.not($answer).removeClass('active').slideUp(300);
        $allQuestions.not(this).removeClass('active');
        
        // Toggle current FAQ
        $(this).toggleClass('active');
        $answer.toggleClass('active').slideToggle(300);
    });

    // ===== Form Validation =====
    function validateForm(formId) {
        const form = document.getElementById(formId);
        if (!form) return false;

        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

        inputs.forEach(input => {
            // Remove previous validation classes
            input.classList.remove('is-invalid', 'is-valid');
            
            // Check if field is empty
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                // Email validation
                if (input.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        input.classList.add('is-invalid');
                        isValid = false;
                    } else {
                        input.classList.add('is-valid');
                    }
                } else {
                    input.classList.add('is-valid');
                }
            }
        });

        return isValid;
    }

    // ===== Contact Form Submission =====
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm('contactForm')) {
            const formData = {
                name: $('#contactName').val(),
                email: $('#contactEmail').val(),
                phone: $('#contactPhone').val(),
                subject: $('#contactSubject').val(),
                message: $('#contactMessage').val()
            };

            // Show loading state
            const $submitBtn = $(this).find('button[type="submit"]');
            const originalText = $submitBtn.html();
            $submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Sending...');

            // Simulate AJAX submission
            setTimeout(function() {
                // In real implementation, use actual AJAX call
                // $.ajax({
                //     url: 'contact-handler.php',
                //     method: 'POST',
                //     data: formData,
                //     success: function(response) {
                //         showAlert('success', 'Thank you! Your message has been sent successfully.');
                //         $('#contactForm')[0].reset();
                //     },
                //     error: function() {
                //         showAlert('danger', 'Sorry, there was an error sending your message. Please try again.');
                //     }
                // });

                // For demo purposes
                showAlert('success', 'Thank you! Your message has been sent successfully.');
                $('#contactForm')[0].reset();
                $submitBtn.prop('disabled', false).html(originalText);
            }, 1500);
        } else {
            showAlert('danger', 'Please fill in all required fields correctly.');
        }
    });

    // ===== Appointment Form Submission =====
    $('#appointmentForm').on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm('appointmentForm')) {
            const formData = {
                name: $('#appointmentName').val(),
                email: $('#appointmentEmail').val(),
                phone: $('#appointmentPhone').val(),
                department: $('#appointmentDepartment').val(),
                doctor: $('#appointmentDoctor').val(),
                date: $('#appointmentDate').val(),
                time: $('#appointmentTime').val(),
                message: $('#appointmentMessage').val()
            };

            const $submitBtn = $(this).find('button[type="submit"]');
            const originalText = $submitBtn.html();
            $submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Booking...');

            setTimeout(function() {
                showAlert('success', 'Appointment booked successfully! We will contact you soon to confirm.');
                $('#appointmentForm')[0].reset();
                $submitBtn.prop('disabled', false).html(originalText);
            }, 1500);
        } else {
            showAlert('danger', 'Please fill in all required fields correctly.');
        }
    });

    // ===== Login Form Submission =====
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm('loginForm')) {
            const formData = {
                email: $('#loginEmail').val(),
                password: $('#loginPassword').val()
            };

            const $submitBtn = $(this).find('button[type="submit"]');
            const originalText = $submitBtn.html();
            $submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Logging in...');

            setTimeout(function() {
                showAlert('success', 'Login successful! Redirecting...');
                setTimeout(function() {
                    window.location.href = 'index.html';
                }, 1500);
            }, 1500);
        } else {
            showAlert('danger', 'Please enter your email and password.');
        }
    });

    // ===== Register Form Submission =====
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm('registerForm')) {
            const password = $('#registerPassword').val();
            const confirmPassword = $('#registerConfirmPassword').val();

            if (password !== confirmPassword) {
                showAlert('danger', 'Passwords do not match.');
                $('#registerConfirmPassword').addClass('is-invalid');
                return;
            }

            const formData = {
                name: $('#registerName').val(),
                email: $('#registerEmail').val(),
                phone: $('#registerPhone').val(),
                password: password
            };

            const $submitBtn = $(this).find('button[type="submit"]');
            const originalText = $submitBtn.html();
            $submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Registering...');

            setTimeout(function() {
                showAlert('success', 'Registration successful! Redirecting to login...');
                setTimeout(function() {
                    window.location.href = 'login.html';
                }, 1500);
            }, 1500);
        } else {
            showAlert('danger', 'Please fill in all required fields correctly.');
        }
    });

    // ===== Show Alert Function =====
    function showAlert(type, message) {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        // Remove existing alerts
        $('.alert').remove();
        
        // Insert new alert at the top of the form or page
        const $form = $('form').first();
        if ($form.length) {
            $form.before(alertHtml);
        } else {
            $('main').prepend(alertHtml);
        }

        // Auto-dismiss after 5 seconds
        setTimeout(function() {
            $('.alert').fadeOut(300, function() {
                $(this).remove();
            });
        }, 5000);
    }

    // ===== Phone Number Formatting =====
    $('input[type="tel"]').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        if (value && !value.startsWith('+')) {
            $(this).val('+' + value);
        }
    });

    // ===== Image Lazy Loading =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== Back to Top Button =====
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    $('.back-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // ===== Initialize Tooltips =====
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // ===== Navbar Toggle on Mobile =====
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // ===== Department Filter (if exists) =====
    $('.department-filter').on('change', function() {
        const filterValue = $(this).val().toLowerCase();
        $('.department-card').each(function() {
            const cardText = $(this).text().toLowerCase();
            if (cardText.includes(filterValue) || filterValue === 'all') {
                $(this).fadeIn();
            } else {
                $(this).fadeOut();
            }
        });
    });

    // ===== Doctor Filter (if exists) =====
    $('.doctor-filter').on('change', function() {
        const filterValue = $(this).val().toLowerCase();
        $('.doctor-card').each(function() {
            const cardText = $(this).text().toLowerCase();
            if (cardText.includes(filterValue) || filterValue === 'all') {
                $(this).fadeIn();
            } else {
                $(this).fadeOut();
            }
        });
    });

    // ===== Gallery Lightbox (Simple) =====
    $('.gallery-item img').on('click', function() {
        const imgSrc = $(this).attr('src');
        const lightbox = `
            <div class="gallery-lightbox" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 9999; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                <img src="${imgSrc}" style="max-width: 90%; max-height: 90%; border-radius: 10px;">
                <button class="btn-close btn-close-white" style="position: absolute; top: 20px; right: 20px; font-size: 2rem;" onclick="$(this).parent().remove();"></button>
            </div>
        `;
        $('body').append(lightbox);
    });

    // ===== Prevent form resubmission on page reload =====
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }

});

