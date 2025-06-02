document.addEventListener('DOMContentLoaded', function() {
    // Homepage: Testimony
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const previous = document.querySelector('.prev-btn');
    const next = document.querySelector('.next-btn');
    if (testimonials.length > 0 && dots.length > 0) {
        let currentIndex = 0;

        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }

        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
            });
        });

        if (previous && next) {
            previous.addEventListener('click', function() {
                let index = currentIndex - 1;
                if (index < 0) {
                    index = testimonials.length - 1;
                }
                showTestimonial(index);
            });

            next.addEventListener('click', function() {
                let index = currentIndex + 1;
                if (index >= testimonials.length) {
                    index = 0;
                }
                showTestimonial(index);
            })
        }

        setInterval(function() {
            let index = currentIndex + 1;
            if (index >= testimonials.length) {
                index = 0;
            }
            showTestimonial(index);
        }, 8000);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Gallery Page: Filters and Search, Homepage and Footer: Ship Categories
    let currentfilter = 'all';
    let currentterm = '';
    const filters = document.querySelectorAll('.gallery-filter-btn');
    const shipcards = document.querySelectorAll('.ship-card');
    const searchship = document.getElementById('search-ship');
    const searchbtn = document.getElementById('search-btn');
    
    function applyFilter(filter) {
        currentfilter = filter;
        currentterm = '';
        searchship.value = '';
        updateResults();
    }
    function searchShips(term) {
        currentterm = term.toLowerCase().trim();
        updateResults();
    }
    function updateResults() {
        let hasVisibleItems = false;
      
        shipcards.forEach(card => {
            const matchfilter = currentfilter === 'all' || card.dataset.category === currentfilter;
            const matchsearch = currentterm === '' || card.querySelector('h3').textContent.toLowerCase().includes(currentterm);
            card.style.display = (matchfilter && matchsearch)? 'block' : 'none';
            if (matchfilter && matchsearch) {
                card.style.display = 'block';
                hasVisibleItems = true;
            } else {
                card.style.display = 'none';
            }
        });

        filters.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === currentfilter);
        });
    }
    function processHash() {
        const cat = window.location.hash.substring(1);
        const validFilters = ['cargo', 'yachts', 'cruises', 'all'];

        if (validFilters.includes(cat)) {
            applyFilter(cat);
        } else {
            applyFilter('all');
        }
    }
    processHash();
    window.addEventListener('hashchange', processHash);
    filters.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            const filt = this.dataset.filter;
            window.location.hash = filt !== 'all' ? filt : '';
            applyFilter(filt);
        });
    });
    searchbtn?.addEventListener('click', () => {
        const term = searchship.value.toLowerCase().trim();
        searchShips(term);
    });
    searchship?.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const term = searchship.value.toLowerCase().trim();
            searchShips(term);
        }
    });
    if (searchbtn && searchship) {
        searchbtn.addEventListener('click', () => {
            const term = searchship.value.toLowerCase().trim();
            searchShips(term);
        });

        searchship.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const term = searchship.value.toLowerCase().trim();
                searchShips(term);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Subscription: Form Validation
    const subscriptionForm = document.getElementById('subscriptionForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (subscriptionForm) {
        const fullName = document.getElementById('fullName');
        const fullNameError = document.getElementById('fullNameError');
        function validateFullName() {
            if (fullName.value.trim() === '') {
                fullNameError.textContent = 'Full name is required';
                return false;
            } else if (fullName.value.trim().length < 3) {
                fullNameError.textContent = 'Full name must be at least 3 characters';
                return false;
            } else {
                fullNameError.textContent = '';
                return true;
            }
        }
        if (fullName) fullName.addEventListener('blur', validateFullName);
        
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        function validateEmail() {
            if (email.value.trim() === '') {
                emailError.textContent = 'Email is required';
                return false;
            } else if (!isValidEmail(email.value.trim())) {
                emailError.textContent = 'Please enter a valid email address';
                return false;
            } else {
                emailError.textContent = '';
                return true;
            }
        }
        function isValidEmail(email) {
            const atIndex = email.indexOf('@');
            const dotIndex = email.lastIndexOf('.');
            
            return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
        }
        if (email) email.addEventListener('blur', validateEmail);

        const password = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
        function validatePassword() {
            if (password.value === '') {
                passwordError.textContent = 'Password is required';
                return false;
            } else if (password.value.length < 8) {
                passwordError.textContent = 'Password must be at least 8 characters';
                return false;
            } else if (!hasUpperCase(password.value)) {
                passwordError.textContent = 'Password must contain at least one uppercase letter';
                return false;
            } else if (!hasNumber(password.value)) {
                passwordError.textContent = 'Password must contain at least one number';
                return false;
            } else {
                passwordError.textContent = '';
                return true;
            }
        }
        function hasUpperCase(str) {
            for (let i = 0; i < str.length; i++) {
                if (str[i] === str[i].toUpperCase() && str[i] !== str[i].toLowerCase()) {
                    return true;
                }
            }
            return false;
        }
        function hasNumber(str) {
            for (let i = 0; i < str.length; i++) {
                if (!isNaN(parseInt(str[i]))) {
                    return true;
                }
            }
            return false;
        }
        if (password) password.addEventListener('blur', validatePassword);
        
        const confirmPassword = document.getElementById('confirmPassword');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        function validateConfirmPassword() {
            if (confirmPassword.value === '') {
                confirmPasswordError.textContent = 'Please confirm your password';
                return false;
            } else if (confirmPassword.value !== password.value) {
                confirmPasswordError.textContent = 'Passwords do not match';
                return false;
            } else {
                confirmPasswordError.textContent = '';
                return true;
            }
        }
        if (confirmPassword) confirmPassword.addEventListener('blur', validateConfirmPassword);
        
        const age = document.getElementById('age');
        const ageError = document.getElementById('ageError');
        function validateAge() {
            if (age.value === '') {
                ageError.textContent = 'Age is required';
                return false;
            } else if (isNaN(age.value) || age.value <= 0) {
                ageError.textContent = 'Please enter a valid age';
                return false;
            } else if (parseInt(age.value) < 18) {
                ageError.textContent = 'You must be at least 18 years old';
                return false;
            } else {
                ageError.textContent = '';
                return true;
            }
        }
        if (age) age.addEventListener('blur', validateAge);

        const interests = document.getElementById('interests');
        const interestsError = document.getElementById('interestsError');
        function validateInterest() {
            if(interests.value === '') {
                interestsError.textContent = 'Please select your interest';
                return false;
            } else {
                interestsError.textContent = '';
                return true;
            }
        }
        if (interests) interests.addEventListener('blur', validateInterest);
        
        const termsAgree = document.getElementById('tnc');
        const termsAgreeError = document.getElementById('tncError');
        function validateTerms() {
            if (!termsAgree.checked) {
                termsAgreeError.textContent = 'You must agree to the terms and conditions';
                return false;
            } else {
                termsAgreeError.textContent = '';
                return true;
            }
        }
        if (termsAgree) termsAgree.addEventListener('change', validateTerms);
        
        subscriptionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const isFullNameValid = validateFullName();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            const isConfirmPasswordValid = validateConfirmPassword();
            const isAgeValid = validateAge();
            const isInterest = validateInterest();
            const isTermsValid = validateTerms();
            if (isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgeValid && isInterest && isTermsValid) {
                subscriptionForm.style.display = 'none';
                formSuccess.style.display = 'flex';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Responsive: Hamburger Icon and Navigation
    const hamburger = document.querySelector('.hamburger-icon');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    const navItems = document.querySelector('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});