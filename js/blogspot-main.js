/* ============================================
   CRYPTOBLOG BLOGGER THEME - GITHUB HOSTED JS
   URL: https://rapspoint.github.io/cryptoblog/js/blogspot-main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    initScrollAnimations();
    initMobileMenu();
    initStickyHeader();
    initTickerSimulation();
    initBloggerTOC();
});

/* DARK MODE */
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const themeIcon = themeToggle.querySelector('.theme-icon');
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = String.fromCodePoint(0x2600, 0xFE0F);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.textContent = String.fromCodePoint(0x1F319);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        if (themeIcon) themeIcon.textContent = newTheme === 'dark' ? String.fromCodePoint(0x2600, 0xFE0F) : String.fromCodePoint(0x1F319);
        if (themeIcon) {
            themeIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => { themeIcon.style.transform = ''; }, 300);
        }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            if (themeIcon) themeIcon.textContent = newTheme === 'dark' ? String.fromCodePoint(0x2600, 0xFE0F) : String.fromCodePoint(0x1F319);
        }
    });
}

/* SCROLL ANIMATIONS */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => observer.observe(el));
}

/* MOBILE MENU */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    if (!menuBtn || !mainNav) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });

    mainNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* STICKY HEADER SHADOW */
function initStickyHeader() {
    const header = document.getElementById('mainHeader');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 10) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

/* TICKER PRICE SIMULATION */
function initTickerSimulation() {
    const prices = {
        'GOLD': { base: 2340.50, volatility: 2 },
        'BTC': { base: 67420.00, volatility: 150 },
        'ETH': { base: 3520.80, volatility: 15 },
        'XRP': { base: 0.6234, volatility: 0.01 },
        'SOL': { base: 148.90, volatility: 3 },
        'USDT': { base: 1.0002, volatility: 0.001 },
        'USDC': { base: 0.9998, volatility: 0.001 },
        'ARB': { base: 1.1240, volatility: 0.02 }
    };

    function updatePrices() {
        Object.keys(prices).forEach(symbol => {
            const el = document.getElementById('price-' + symbol);
            if (!el) return;
            const data = prices[symbol];
            const change = (Math.random() - 0.5) * data.volatility;
            const newPrice = data.base + change;

            let formatted;
            if (symbol === 'USDT' || symbol === 'USDC') {
                formatted = '$' + newPrice.toFixed(4);
            } else if (symbol === 'XRP' || symbol === 'ARB') {
                formatted = '$' + newPrice.toFixed(4);
            } else {
                formatted = '$' + newPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }

            el.textContent = formatted;
            el.style.transition = 'color 0.3s';
            el.style.color = change > 0 ? '#34d399' : '#f87171';
            setTimeout(() => { el.style.color = '#f8fafc'; }, 500);
        });
    }

    setInterval(updatePrices, 5000);
}

/* BLOGGER TOC GENERATOR */
function initBloggerTOC() {
    const postBody = document.querySelector('.post-body') || document.querySelector('.article-body');
    const tocNav = document.getElementById('tocNav');
    const tocToggle = document.getElementById('tocToggle');

    if (!postBody || !tocNav) return;

    const headings = postBody.querySelectorAll('h2, h3');
    if (headings.length === 0) {
        const tocWrapper = document.getElementById('tocWrapper');
        if (tocWrapper) tocWrapper.style.display = 'none';
        return;
    }

    headings.forEach((heading, index) => {
        if (!heading.id) heading.id = 'heading-' + index;

        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.className = 'toc-link' + (heading.tagName === 'H3' ? ' h3' : '');
        link.textContent = heading.textContent;
        link.dataset.target = heading.id;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        tocNav.appendChild(link);
    });

    if (tocToggle) {
        tocToggle.addEventListener('click', () => {
            tocNav.classList.toggle('collapsed');
            tocToggle.textContent = tocNav.classList.contains('collapsed') ? '+' : '-';
        });
    }

    const tocLinks = tocNav.querySelectorAll('.toc-link');
    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tocLinks.forEach(link => link.classList.remove('active'));
                const activeLink = tocNav.querySelector('[data-target="' + entry.target.id + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

    headings.forEach(heading => headingObserver.observe(heading));
}
