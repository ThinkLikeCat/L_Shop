export class VideoBanner {
    private slides = [
        '/video/Video1.mp4', 
        '/video/Video2.mp4', 
        '/video/Video3.mp4'
    ];
    private currentIndex = 0;

    render(): string {
        return `
            <section class="videobanner">
                <div class="videobanner__container">
                    <video 
                        id="hero-video-player"
                        class="videobanner__video" 
                        autoplay 
                        muted 
                        playsinline
                    >
                        <source src="${this.slides[this.currentIndex]}" type="video/mp4">
                    </video>
                    
                    <div class="videobanner__content">
                        <h2 class="videobanner__brand">ROYAL SECONDS</h2>
                        <h1 class="videobanner__title">EXCLUSIVE COLLECTION</h1>
                        <div class="videobanner__actions">
                            <button class="btn-shop">КУПИТЬ ЧАСЫ</button>
                            <button class="btn-discover">О КОЛЛЕКЦИИ</button>
                        </div>
                    </div>

                    <div class="videobanner__dots">
                        ${this.slides.map((_, i) => `
                            <div class="dot-wrapper" data-index="${i}">
                                <span class="dot ${i === 0 ? 'active' : ''}"></span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    init() {
        const video = document.getElementById('hero-video-player') as HTMLVideoElement;
        const dotWrappers = document.querySelectorAll('.dot-wrapper');

        if (!video) return;
        video.onended = () => {
            this.nextSlide(video);
        };

        dotWrappers.forEach(wrapper => {
            wrapper.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                const index = parseInt(target.dataset.index || '0');
                this.goToSlide(index, video);
            });
        });
    }

    private nextSlide(video: HTMLVideoElement) {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateUI(video);
    }

    private goToSlide(index: number, video: HTMLVideoElement) {
        if (this.currentIndex === index) return;
        this.currentIndex = index;
        this.updateUI(video);
    }

    private updateUI(video: HTMLVideoElement) {
        const dots = document.querySelectorAll('.dot');
        video.style.opacity = '0';
        
        setTimeout(() => {
            video.src = this.slides[this.currentIndex];
            video.load(); 
            video.play();
            video.style.opacity = '1';
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentIndex);
            });
        }, 600);
    }
}
