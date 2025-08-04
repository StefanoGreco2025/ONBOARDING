// Onboarding Presentation JavaScript

class OnboardingPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 10;
        this.slides = document.querySelectorAll('.slide');
        this.progressFill = document.querySelector('.progress-fill');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideIndicators = document.getElementById('slideIndicators');
        
        this.init();
    }

    init() {
        this.createIndicators();
        this.updateProgress();
        this.bindEvents();
        this.updateNavigation();
        this.addInteractiveEffects();
        
        // Ensure first slide is properly displayed
        this.goToSlide(1);
    }

    createIndicators() {
        // Clear existing indicators
        this.slideIndicators.innerHTML = '';
        
        for (let i = 1; i <= this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (i === 1) indicator.classList.add('active');
            indicator.setAttribute('data-slide', i);
            
            // Add click event listener immediately
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.goToSlide(i);
            });
            
            this.slideIndicators.appendChild(indicator);
        }
    }

    updateProgress() {
        const progress = (this.currentSlide / this.totalSlides) * 100;
        if (this.progressFill) {
            this.progressFill.style.width = `${progress}%`;
        }
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            const slideNumber = index + 1;
            slide.classList.remove('active', 'prev');
            
            if (slideNumber === this.currentSlide) {
                slide.classList.add('active');
            } else if (slideNumber < this.currentSlide) {
                slide.classList.add('prev');
            }
        });
    }

    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index + 1 === this.currentSlide);
        });
    }

    updateNavigation() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 1;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.totalSlides;
        }
    }

    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides) return;
        
        this.currentSlide = slideNumber;
        this.updateSlides();
        this.updateIndicators();
        this.updateProgress();
        this.updateNavigation();
        this.triggerSlideAnimation();
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    prevSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    triggerSlideAnimation() {
        const currentSlideElement = document.querySelector(`[data-slide="${this.currentSlide}"]`);
        if (currentSlideElement) {
            // Add a subtle animation class
            currentSlideElement.style.transform = 'scale(0.98)';
            setTimeout(() => {
                currentSlideElement.style.transform = 'scale(1)';
            }, 100);
        }
    }

    bindEvents() {
        // Navigation buttons with proper error handling
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.nextSlide();
            });
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.prevSlide();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowRight':
                case ' ':
                    event.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    this.prevSlide();
                    break;
                case 'Home':
                    event.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    event.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
                case 'Escape':
                    event.preventDefault();
                    this.goToSlide(1);
                    break;
            }
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let startY = 0;

        document.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (event) => {
            if (!startX || !startY) return;

            const endX = event.changedTouches[0].clientX;
            const endY = event.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    this.nextSlide();
                } else {
                    // Swipe right - previous slide
                    this.prevSlide();
                }
            }

            startX = 0;
            startY = 0;
        }, { passive: true });

        // Prevent context menu on long press for better mobile experience
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    addInteractiveEffects() {
        // Add timeline navigation functionality
        setTimeout(() => {
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                // Add hover effects
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateX(8px) scale(1.02)';
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'translateX(0) scale(1)';
                });

                // Add click functionality to timeline items
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Navigate to corresponding phase slide (slides 3-7)
                    const phaseSlide = index + 3;
                    if (phaseSlide <= 7) {
                        this.goToSlide(phaseSlide);
                    }
                });

                // Add visual feedback for clickable items
                item.style.cursor = 'pointer';
                item.title = 'Clicca per andare alla fase corrispondente';
            });
        }, 500);

        // Add hover effects to tool cards
        setTimeout(() => {
            const toolCards = document.querySelectorAll('.tool-card');
            toolCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-8px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });
        }, 100);

        // Add hover effects to ROI cards
        setTimeout(() => {
            const roiCards = document.querySelectorAll('.roi-card');
            roiCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'scale(1.05)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'scale(1)';
                });
            });
        }, 100);

        // Add click effects to deliverable tags
        setTimeout(() => {
            const deliverableTags = document.querySelectorAll('.deliverable-tag');
            deliverableTags.forEach(tag => {
                tag.addEventListener('click', (e) => {
                    e.preventDefault();
                    tag.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        tag.style.transform = 'scale(1)';
                    }, 150);
                });
            });
        }, 100);
    }

    animateSlideContent(slide) {
        // Animate content based on slide type
        const slideNumber = parseInt(slide.getAttribute('data-slide'));
        
        switch (slideNumber) {
            case 1:
                this.animateTitleSlide(slide);
                break;
            case 2:
                this.animateTimelineSlide(slide);
                break;
            case 8:
                this.animateToolsSlide(slide);
                break;
            case 9:
                this.animateROISlide(slide);
                break;
            default:
                this.animatePhaseSlide(slide);
                break;
        }
    }

    animateTitleSlide(slide) {
        const elements = slide.querySelectorAll('h1, h2, .subtitle, .company-info');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 50);
            }, index * 200);
        });
    }

    animateTimelineSlide(slide) {
        const timelineItems = slide.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 50);
            }, index * 150);
        });
    }

    animatePhaseSlide(slide) {
        const phaseIcon = slide.querySelector('.phase-icon');
        const detailSections = slide.querySelectorAll('.detail-section');
        
        if (phaseIcon) {
            phaseIcon.style.transform = 'scale(0.8) rotate(-10deg)';
            phaseIcon.style.transition = 'all 0.6s ease';
            setTimeout(() => {
                phaseIcon.style.transform = 'scale(1) rotate(0deg)';
            }, 100);
        }

        detailSections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }

    animateToolsSlide(slide) {
        const toolCards = slide.querySelectorAll('.tool-card');
        toolCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px) scale(0.9)';
                card.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 50);
            }, index * 150);
        });
    }

    animateROISlide(slide) {
        const roiCards = slide.querySelectorAll('.roi-card');
        roiCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                card.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    
                    // Animate the ROI value counting up
                    const roiValue = card.querySelector('.roi-value');
                    if (roiValue) {
                        this.animateCountUp(roiValue);
                    }
                }, 50);
            }, index * 200);
        });
    }

    animateCountUp(element) {
        const text = element.textContent;
        const isPositive = text.includes('+');
        const isNegative = text.includes('-');
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9\+\-]/g, '');
        
        let current = 0;
        const increment = number / 30; // 30 steps
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            const prefix = isPositive ? '+' : (isNegative ? '-' : '');
            element.textContent = prefix + Math.floor(current) + suffix;
        }, 50);
    }

    handleResize() {
        // Recalculate any responsive elements if needed
        // Currently handled by CSS, but can be extended for complex responsive behavior
    }

    // Auto-play functionality (optional)
    startAutoPlay(interval = 10000) {
        this.autoPlayInterval = setInterval(() => {
            if (this.currentSlide < this.totalSlides) {
                this.nextSlide();
            } else {
                this.goToSlide(1); // Loop back to start
            }
        }, interval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    // Presentation mode toggle
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for all elements to be fully rendered
    setTimeout(() => {
        const presentation = new OnboardingPresentation();
        
        // Add fullscreen toggle on F11 or F key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'F11' || (event.key === 'f' && event.ctrlKey)) {
                event.preventDefault();
                presentation.toggleFullscreen();
            }
        });

        // Add mouse wheel navigation with throttling
        let wheelTimeout;
        document.addEventListener('wheel', (event) => {
            if (wheelTimeout) return;
            
            if (Math.abs(event.deltaY) > 50) { // Threshold to prevent accidental scrolling
                wheelTimeout = setTimeout(() => {
                    wheelTimeout = null;
                }, 300);
                
                if (event.deltaY > 0) {
                    presentation.nextSlide();
                } else {
                    presentation.prevSlide();
                }
            }
        }, { passive: true });

        // Add visibility change handler to pause auto-play when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                presentation.stopAutoPlay();
            }
        });

        // Expose presentation instance for debugging
        window.presentation = presentation;
        
        console.log('Onboarding presentation initialized successfully');
    }, 100);
});