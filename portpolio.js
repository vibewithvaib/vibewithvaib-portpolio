lucide.createIcons();

        // --- Custom Mouse Pointer Interaction ---
        try {
            const cursor = document.getElementById('custom-cursor');
            const aura = document.getElementById('cursor-aura');
            
            window.addEventListener('mousemove', e => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
                aura.style.left = `${e.clientX}px`;
                aura.style.top = `${e.clientY}px`;
            });

            const interactiveElements = document.querySelectorAll('a, button, .card-glow, .hero-btn');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('hover');
                    aura.classList.add('hover');
                });
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hover');
                    aura.classList.remove('hover');
                });
            });
        } catch (e) {
            console.error("Custom cursor failed to load.", e);
            document.body.style.cursor = 'auto'; // Fallback to default cursor
        }

        // --- Futuristic Tech Grid Background ---
        try {
            const canvas = document.getElementById('tech-grid-canvas');
            const ctx = canvas.getContext('2d');
            let width, height;
            let mouse = { x: 0, y: 0 };
            const gridSpacing = 30;
            const dotSize = 1;
            const parallaxFactor = 0.05;
            let scanline = { y: 0, speed: 0.5, height: 100 };

            function init() {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }

            function drawGrid(offsetX, offsetY) {
                ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
                for (let y = 0; y < height + gridSpacing; y += gridSpacing) {
                    for (let x = 0; x < width + gridSpacing; x += gridSpacing) {
                        ctx.fillRect(x + offsetX, y + offsetY, dotSize, dotSize);
                    }
                }
            }

            function drawScanline() {
                const gradient = ctx.createLinearGradient(0, scanline.y, 0, scanline.y + scanline.height);
                gradient.addColorStop(0, 'rgba(236, 72, 153, 0)');
                gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.1)');
                gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(0, scanline.y, width, scanline.height);
                
                scanline.y += scanline.speed;
                if (scanline.y > height) {
                    scanline.y = -scanline.height;
                }
            }

            function animate() {
                ctx.clearRect(0, 0, width, height);

                const offsetX = -(mouse.x - width / 2) * parallaxFactor;
                const offsetY = -(mouse.y - height / 2) * parallaxFactor;

                drawGrid(offsetX, offsetY);
                drawScanline();

                requestAnimationFrame(animate);
            }

            window.addEventListener('resize', init);
            window.addEventListener('mousemove', (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            });

            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!prefersReducedMotion) {
                init();
                animate();
            } else {
                // Fallback: draw a static grid for reduced motion
                init();
                drawGrid(0, 0);
            }

        } catch (e) {
            console.error("Canvas animation failed to load.", e);
        }
        
        // Navigation bar scroll effect
        const navbar = document.getElementById('navbar');
        window.onscroll = function() {
            // We want the nav bar to appear after scrolling past the hero section.
            // A simple check is if scrollY is greater than a certain portion of the window height.
            if (window.scrollY > window.innerHeight * 0.8) {
                navbar.classList.add('sticky-nav', 'visible');
            } else {
                navbar.classList.remove('sticky-nav', 'visible');
            }
        };

        // Scroll animation logic
        const sections = document.querySelectorAll('.fade-in-section');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1
        });

        sections.forEach(section => {
            observer.observe(section);
        });
