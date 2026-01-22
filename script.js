document.addEventListener('DOMContentLoaded', () => {
    renderPlanningCards();
    renderStats();
    renderTestimonials();
    renderSelectOptions();
    setupMobileMenu();
});

// --- Data ---

const planningData = [
    {
        title: "Flights",
        desc: "Find the best deals on flights to Majorca.",
        linkText: "Search Flights",
        iconPath: "M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z"
    },
    {
        title: "Hotels",
        desc: "Cozy stays and luxurious resorts.",
        linkText: "Search Hotels",
        iconPath: "M3 7v11m0 -4h18m0 4v-8a2 2 0 0 0 -2 -2h-8v6 M7 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z", // Combined circle and path
        // Note: The original hotel icon had a separate circle. I'll handle complex SVGs by storing the full SVG innerHTML or just paths.
        // Let's stick to paths. For the circle in the hotel icon, I'll approximate or use a separate property if needed.
        // Actually, the simplest way for diverse icons is to store the path 'd' attribute.
        // If there are multiple paths, I can store an array of strings.
        isComplex: true,
        paths: [
            '<path d="M3 7v11m0 -4h18m0 4v-8a2 2 0 0 0 -2 -2h-8v6" />',
            '<circle cx="7" cy="10" r="1" />'
        ]
    },
    {
        title: "Activities",
        desc: "Sailing, hiking, and sightseeing.",
        linkText: "Search Activities",
        isComplex: true,
        paths: [
            '<path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1" />',
            '<path d="M4 18l-1 -3h18l-1 3" />',
            '<path d="M11 12h7l-7 -9v9" />',
            '<line x1="8" y1="7" x2="6" y2="12" />'
        ]
    },
    {
        title: "Dining",
        desc: "Experience local cuisine.",
        linkText: "Search Restaurants",
        iconPath: "M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3"
    }
];

const statsData = [
    {
        value: "1,405",
        label: "Sq Miles",
        isComplex: true,
        paths: [
            '<path d="M17 3l4 4l-14 14l-4 -4z" />',
            '<path d="M16 7l-1.5 -1.5" />',
            '<path d="M13 10l-1.5 -1.5" />',
            '<path d="M10 13l-1.5 -1.5" />',
            '<path d="M7 16l-1.5 -1.5" />'
        ]
    },
    {
        value: "4,741",
        label: "Ft Elevation",
        isComplex: true,
        paths: [
            '<line x1="12" y1="21" x2="12" y2="3" />',
            '<path d="M15 6l-3 -3l-3 3" />',
            '<line x1="9" y1="21" x2="15" y2="21" />'
        ]
    },
    {
        value: "Medit.",
        label: "Location",
        isComplex: true,
        paths: [
            '<circle cx="12" cy="11" r="3" />',
            '<path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />'
        ]
    },
    {
        value: "923K",
        label: "Population",
        isComplex: true,
        paths: [
            '<circle cx="9" cy="7" r="4" />',
            '<path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />',
            '<path d="M16 3.13a4 4 0 0 1 0 7.75" />',
            '<path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />'
        ]
    }
];

const testimonialsData = [
    {
        name: "Miranda Blake",
        location: "London, England",
        quote: "I traveled here for business, but my stay was extended. Now it is my home.",
        image: "images/miranda-blake-S.png"
    },
    {
        name: "Max Winter",
        location: "Berlin, Germany",
        quote: "Great escape from my reality. Beautiful sunsets, wonderful people, great beer.",
        image: "images/max-winter-S.png"
    },
    {
        name: "Inés Villegoes",
        location: "Barcelona, Spain",
        quote: "A very safe environment for all travelers.",
        image: "images/ines-villegoes-S.png"
    },
    {
        name: "Carmen Lorenzo",
        location: "Madrid, Spain",
        quote: "Live, laugh, love-- everything you need in Majorca.",
        image: "images/carmen-lorenzo-S.png"
    }
];

const destinationOptions = [
    { value: "barcelona", label: "Barcelona" },
    { value: "granada", label: "Granada" },
    { value: "ibiza", label: "Ibiza" },
    { value: "madrid", label: "Madrid" },
    { value: "majorca", label: "Majorca" },
    { value: "seville", label: "Seville" },
    { value: "tenerife", label: "Tenerife" },
    { value: "valencia", label: "Valencia" }
];

const travelTimeOptions = [
    { value: "fall", label: "Fall" },
    { value: "winter", label: "Winter" },
    { value: "spring", label: "Spring" },
    { value: "summer", label: "Summer" },
    { value: "flexible", label: "Flexible" }
];

// --- Render Functions ---

function renderPlanningCards() {
    const container = document.getElementById('planning-cards-container');
    if (!container) return;

    container.innerHTML = planningData.map(item => `
        <div class="rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
            <div class="p-6 flex flex-col items-center text-center space-y-4">
                <div class="p-3 bg-primary/10 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        ${item.isComplex ? item.paths.join('') : `<path d="${item.iconPath}" />`}
                    </svg>
                </div>
                <h3 class="font-semibold text-lg">${item.title}</h3>
                <p class="text-sm text-muted-foreground">${item.desc}</p>
                <a href="#" class="text-sm font-medium text-primary hover:underline flex items-center group">
                    ${item.linkText}
                    <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
                </a>
            </div>
        </div>
    `).join('');
}

function renderStats() {
    const container = document.getElementById('stats-container');
    if (!container) return;

    container.innerHTML = statsData.map(item => `
        <div class="space-y-2">
            <div class="flex justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    ${item.isComplex ? item.paths.join('') : `<path d="${item.iconPath}" />`}
                </svg>
            </div>
            <div class="text-2xl font-bold">${item.value}</div>
            <div class="text-xs uppercase tracking-wide text-muted-foreground">${item.label}</div>
        </div>
    `).join('');
}

function renderTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    container.innerHTML = testimonialsData.map(item => `
        <div class="rounded-xl border bg-card text-card-foreground shadow-sm h-full">
            <div class="p-6 space-y-4 flex flex-col h-full">
                <div class="flex items-center gap-4">
                    <span class="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 border border-border">
                        <img class="aspect-square h-full w-full object-cover" src="${item.image}" alt="${item.name}">
                    </span>
                    <div>
                        <div class="font-semibold text-sm">${item.name}</div>
                        <div class="text-xs text-muted-foreground">${item.location}</div>
                    </div>
                </div>
                <p class="text-sm text-muted-foreground italic flex-grow">"${item.quote}"</p>
            </div>
        </div>
    `).join('');
}

function renderSelectOptions() {
    const destSelect = document.getElementById('destination');
    const timeSelect = document.getElementById('travelTime');

    if (destSelect) {
        // Keep the placeholder if it exists or clear it?
        // Let's create the default placeholder option
        /*
        <option value="" disabled selected>Choose an Option</option>
        The current HTML has the placeholder options. I will append or overwrite?
        Overwriting is cleaner to remove hardcoded values.
        */
       // Actually, I can check if it has options.
       // Let's overwrite but include a placeholder.
       // Note: The HTML I will write in the next step will likely be empty or have a placeholder.
       // I'll assume the select exists.

       let optionsHtml = '<option value="" disabled selected>Choose an Option</option>';
       optionsHtml += destinationOptions.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
       destSelect.innerHTML = optionsHtml;
    }

    if (timeSelect) {
        let optionsHtml = '<option value="" disabled selected>Choose an Option</option>';
        optionsHtml += travelTimeOptions.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
        timeSelect.innerHTML = optionsHtml;
    }
}

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', function() {
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                // Optional: animate in
            } else {
                menu.classList.add('hidden');
            }
        });
    }
}
