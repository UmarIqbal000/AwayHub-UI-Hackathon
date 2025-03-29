// Mock data for property listings
const properties = [
    {
        id: 1,
        title: "Cozy Beach House",
        location: "Malibu, CA",
        price: 250,
        rating: 4.8,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        amenities: ["Wi-Fi", "Pool", "Kitchen", "Parking"]
    },
    {
        id: 2,
        title: "Modern Downtown Apartment",
        location: "San Francisco, CA",
        price: 180,
        rating: 4.6,
        reviews: 95,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        amenities: ["Wi-Fi", "Kitchen", "Parking"]
    },
    {
        id: 3,
        title: "Luxury Villa",
        location: "Beverly Hills, CA",
        price: 450,
        rating: 4.9,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
        amenities: ["Wi-Fi", "Pool", "Kitchen", "Parking"]
    },
    {
        id: 4,
        title: "Mountain View Cabin",
        location: "Lake Tahoe, CA",
        price: 320,
        rating: 4.7,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
        amenities: ["Wi-Fi", "Kitchen", "Fireplace", "Parking"]
    },
    {
        id: 5,
        title: "Seaside Studio",
        location: "Santa Monica, CA",
        price: 195,
        rating: 4.5,
        reviews: 72,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        amenities: ["Wi-Fi", "Kitchen", "Beach Access"]
    },
    {
        id: 6,
        title: "Urban Loft",
        location: "Los Angeles, CA",
        price: 275,
        rating: 4.8,
        reviews: 134,
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9",
        amenities: ["Wi-Fi", "Kitchen", "Gym", "Parking"]
    },
    {
        id: 7,
        title: "Desert Oasis Villa",
        location: "Palm Springs, CA",
        price: 380,
        rating: 4.9,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        amenities: ["Wi-Fi", "Pool", "Kitchen", "Spa"]
    },
    {
        id: 8,
        title: "Wine Country Cottage",
        location: "Napa Valley, CA",
        price: 290,
        rating: 4.7,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
        amenities: ["Wi-Fi", "Kitchen", "Garden", "Parking"]
    },
    {
        id: 9,
        title: "Beachfront Bungalow",
        location: "Santa Barbara, CA",
        price: 340,
        rating: 4.8,
        reviews: 145,
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
        amenities: ["Wi-Fi", "Pool", "Kitchen", "Beach Access"]
    },
    {
        id: 10,
        title: "Cozy Pet Haven",
        location: "Malibu, CA",
        price: 180,
        rating: 4.9,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7",
        amenities: ["Wi-Fi", "Pool", "Kitchen", "Pet Amenities", "Pet Park"],
        isPetFriendly: true,
        petAmenities: ["Pet beds", "Food bowls", "Toys", "Walking trails"]
    },
    {
        id: 11,
        title: "Urban Pet Retreat",
        location: "San Francisco, CA",
        price: 150,
        rating: 4.7,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7",
        amenities: ["Wi-Fi", "Kitchen", "Pet Amenities", "Grooming Services"],
        isPetFriendly: true,
        petAmenities: ["Pet spa", "Grooming station", "Pet park access"]
    },
    {
        id: 12,
        title: "Luxury Pet Villa",
        location: "Beverly Hills, CA",
        price: 300,
        rating: 4.9,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7",
        amenities: ["Wi-Fi", "Pool", "Kitchen", "Pet Amenities", "Private Garden"],
        isPetFriendly: true,
        petAmenities: ["Private garden", "Pet spa", "Luxury pet beds"]
    }
];

// Mock data for reviews
let reviews = [];

// Get featured properties (4 most popular based on rating and reviews)
const getFeaturedProperties = () => {
    return [...properties]
        .sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
        .slice(0, 4);
};

// Get remaining properties
const getRemainingProperties = () => {
    const featuredIds = getFeaturedProperties().map(p => p.id);
    return properties.filter(p => !featuredIds.includes(p.id));
};

// Get pet-friendly properties
const getPetFriendlyProperties = () => {
    return properties.filter(property => property.isPetFriendly);
};

// Function to create property cards
function createPropertyCard(property) {
    return `
        <div class="card">
            <img src="${property.image}" alt="${property.title}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold">${property.title}</h3>
                <p class="text-gray-600">${property.location}</p>
                <div class="flex items-center mt-2">
                    <div class="flex text-yellow-400">
                        ${Array(5).fill('★').map((star, i) => `
                            <span class="${i < Math.floor(property.rating) ? 'text-yellow-400' : 'text-gray-300'}">${star}</span>
                        `).join('')}
                    </div>
                    <span class="ml-2 text-gray-600">(${property.reviews} reviews)</span>
                </div>
                <p class="text-xl font-bold mt-2">$${property.price} <span class="text-sm font-normal text-gray-600">/ night</span></p>
                <button class="btn-primary w-full mt-4" onclick="showPropertyDetails(${property.id})">Book Now</button>
            </div>
        </div>
    `;
}

// Function to get reviews for a specific property
function getPropertyReviews(propertyId) {
    return reviews.filter(review => review.propertyId === propertyId);
}

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Function to show property details in modal
function showPropertyDetails(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    const modal = document.getElementById('propertyModal');
    const modalBody = modal.querySelector('.modal-body');
    
    const propertyReviews = getPropertyReviews(propertyId);
    
    modalBody.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <img src="${property.image}" alt="${property.title}" class="w-full h-64 object-cover rounded-lg">
                <div class="grid grid-cols-3 gap-2">
                    ${Array(3).fill(property.image).map(img => `
                        <img src="${img}" alt="Property view" class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75">
                    `).join('')}
                </div>
            </div>
            <div class="space-y-4">
                <h3 class="text-2xl font-bold">${property.title}</h3>
                <p class="text-gray-600">${property.location}</p>
                <div class="flex items-center">
                    <div class="flex text-yellow-400">
                        ${Array(5).fill('★').map((star, i) => `
                            <span class="${i < Math.floor(property.rating) ? 'text-yellow-400' : 'text-gray-300'}">${star}</span>
                        `).join('')}
                    </div>
                    <span class="ml-2 text-gray-600">(${property.reviews} reviews)</span>
                </div>
                <p class="text-2xl font-bold">$${property.price} <span class="text-sm font-normal text-gray-600">/ night</span></p>
                <div class="space-y-2">
                    <h4 class="font-semibold">Amenities:</h4>
                    <div class="flex flex-wrap gap-2">
                        ${property.amenities.map(amenity => `
                            <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">${amenity}</span>
                        `).join('')}
                    </div>
                </div>
                ${property.isPetFriendly ? `
                    <div class="space-y-2">
                        <h4 class="font-semibold">Pet Amenities:</h4>
                        <div class="flex flex-wrap gap-2">
                            ${property.petAmenities.map(amenity => `
                                <span class="bg-accent bg-opacity-10 text-accent px-3 py-1 rounded-full text-sm">${amenity}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                <button class="btn-primary w-full">Book Now</button>
            </div>
        </div>

        <!-- Reviews Section -->
        <div class="mt-8 border-t pt-8">
            <h3 class="text-2xl font-bold mb-4">Reviews</h3>
            ${propertyReviews.length > 0 ? `
                <div class="space-y-6">
                    ${propertyReviews.map(review => `
                        <div class="bg-gray-50 rounded-lg p-6">
                            <div class="flex items-center justify-between mb-2">
                                <h4 class="font-semibold text-lg">${review.title}</h4>
                                <div class="flex text-yellow-400">
                                    ${Array(5).fill('★').map((star, i) => `
                                        <span class="${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}">${star}</span>
                                    `).join('')}
                                </div>
                            </div>
                            <p class="text-gray-600 mb-2">${review.text}</p>
                            <div class="flex items-center justify-between text-sm text-gray-500">
                                <span>By ${review.reviewerName}</span>
                                <span>${formatDate(review.date)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <p class="text-gray-600">No reviews yet. Be the first to review this property!</p>
            `}
        </div>
    `;
    
    modal.classList.remove('hidden');
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('propertyModal');
    modal.classList.add('hidden');
}

// Function to toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Function to handle navbar scroll effect
let lastScrollTop = 0;

function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const currentScrollTop = window.scrollY;
    
    if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }
    
    lastScrollTop = currentScrollTop;
}

// Function to create pet-friendly property cards
function createPetFriendlyCard(property) {
    return `
        <div class="bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
            <img src="${property.image}" alt="${property.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-semibold text-primary">${property.title}</h3>
                    <span class="bg-accent text-white px-3 py-1 rounded-full text-sm">Pet Friendly</span>
                </div>
                <p class="text-gray-600 mb-4">${property.petAmenities.join(', ')}</p>
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-primary">$${property.price}<span class="text-sm font-normal text-gray-600">/night</span></span>
                    <button class="btn-primary" onclick="showPropertyDetails(${property.id})">Book Now</button>
                </div>
            </div>
        </div>
    `;
}

// Function to populate property select dropdown
function populatePropertySelect() {
    const propertySelect = document.getElementById('propertySelect');
    if (!propertySelect) return;

    // Add all properties to the select dropdown
    properties.forEach(property => {
        const option = document.createElement('option');
        option.value = property.id;
        option.textContent = property.title;
        propertySelect.appendChild(option);
    });
}

// Function to handle review form submission
function handleReviewSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const propertyId = parseInt(form.propertySelect.value);
    const title = form.reviewTitle.value.trim();
    const text = form.reviewText.value.trim();
    const reviewerName = form.reviewerName.value.trim();

    // Validate form
    if (!propertyId || !title || !text || !reviewerName) {
        alert('Please fill in all fields');
        return;
    }

    // Validate text length
    if (text.length < 50) {
        alert('Please provide a more detailed review (at least 50 characters)');
        return;
    }

    // Create new review
    const review = {
        id: reviews.length + 1,
        propertyId,
        title,
        text,
        reviewerName,
        date: new Date().toISOString()
    };

    // Add review to reviews array
    reviews.push(review);

    // Update property reviews count
    const property = properties.find(p => p.id === propertyId);
    if (property) {
        property.reviews++;
    }

    // Reset form
    form.reset();

    // Show success message
    alert('Thank you for your review! Your feedback helps other travelers make informed decisions.');
    
    // If the property modal is open, refresh it to show the new review
    const modal = document.getElementById('propertyModal');
    if (!modal.classList.contains('hidden')) {
        showPropertyDetails(propertyId);
    }
}

// Modal functionality
let isLoginMode = true;

function showAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    // Reset to login mode when opening modal
    isLoginMode = true;
    updateAuthUI();
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function updateAuthUI() {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (isLoginMode) {
        loginTab.classList.add('text-primary', 'border-primary');
        loginTab.classList.remove('text-gray-500');
        signupTab.classList.remove('text-primary', 'border-primary');
        signupTab.classList.add('text-gray-500');
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        signupTab.classList.add('text-primary', 'border-primary');
        signupTab.classList.remove('text-gray-500');
        loginTab.classList.remove('text-primary', 'border-primary');
        loginTab.classList.add('text-gray-500');
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }
}

// Add event listeners for authentication
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll event listener for navbar
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Initial navbar state
    handleNavbarScroll();

    // Show modal when clicking login/signup buttons
    const loginButtons = document.querySelectorAll('button');
    loginButtons.forEach(button => {
        if (button.textContent.trim() === 'Login / Sign Up') {
            button.addEventListener('click', showAuthModal);
        }
    });

    // Close modal
    const closeAuthModalBtn = document.getElementById('closeAuthModal');
    if (closeAuthModalBtn) {
        closeAuthModalBtn.addEventListener('click', closeAuthModal);
    }

    // Close modal when clicking outside
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                closeAuthModal();
            }
        });
    }

    // Switch between login and signup forms
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    if (loginTab && signupTab) {
        loginTab.addEventListener('click', () => {
            isLoginMode = true;
            updateAuthUI();
        });

        signupTab.addEventListener('click', () => {
            isLoginMode = false;
            updateAuthUI();
        });
    }

    // Handle form submissions
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            try {
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Store user data in localStorage
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert('Login successful!');
                    closeAuthModal();
                    loginForm.reset();
                    // Update navbar button to show username
                    const loginButton = document.querySelector('.border-2.border-white');
                    if (loginButton) {
                        loginButton.textContent = data.user.name;
                        loginButton.classList.add('bg-white', 'text-primary');
                        loginButton.classList.remove('hover:bg-white', 'hover:text-primary');
                    }
                } else {
                    alert(data.error || 'Login failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during login');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = signupForm.querySelector('input[type="text"]').value;
            const email = signupForm.querySelector('input[type="email"]').value;
            const password = signupForm.querySelector('input[type="password"]').value;
            const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Store user data in localStorage
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert('Signup successful!');
                    closeAuthModal();
                    signupForm.reset();
                    // Update navbar button to show username
                    const loginButton = document.querySelector('.border-2.border-white');
                    if (loginButton) {
                        loginButton.textContent = data.user.name;
                        loginButton.classList.add('bg-white', 'text-primary');
                        loginButton.classList.remove('hover:bg-white', 'hover:text-primary');
                    }
                } else {
                    alert(data.error || 'Signup failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during signup');
            }
        });
    }

    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const loginButton = document.querySelector('.border-2.border-white');
        if (loginButton) {
            loginButton.textContent = user.name;
            loginButton.classList.add('bg-white', 'text-primary');
            loginButton.classList.remove('hover:bg-white', 'hover:text-primary');
        }
    }

    // Render featured property cards
    const featuredGrid = document.querySelector('.featured-grid');
    if (featuredGrid) {
        featuredGrid.innerHTML = getFeaturedProperties()
            .map(property => createPropertyCard(property))
            .join('');
    }

    // Render remaining property cards
    const listingsGrid = document.querySelector('.listings-grid');
    if (listingsGrid) {
        listingsGrid.innerHTML = getRemainingProperties()
            .map(property => createPropertyCard(property))
            .join('');
    }

    // Render pet-friendly property cards
    const petFriendlyGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-8');
    if (petFriendlyGrid) {
        petFriendlyGrid.innerHTML = getPetFriendlyProperties()
            .map(property => createPetFriendlyCard(property))
            .join('');
    }

    // Add event listeners
    const closeButton = document.querySelector('.fa-times');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    const modal = document.getElementById('propertyModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeModal();
        });
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // Price range slider
    const priceSlider = document.querySelector('input[type="range"]');
    const priceRange = document.querySelector('.flex.justify-between');
    
    if (priceSlider && priceRange) {
        priceSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            const middleValue = priceRange.querySelector('span:nth-child(2)');
            if (middleValue) {
                middleValue.textContent = `$${value}`;
            }
        });
    }

    // Initialize review form
    populatePropertySelect();

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmit);
    }
}); 