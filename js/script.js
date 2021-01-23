const imageArr = [
  './images/1.jpg',
  './images/2.jpg',
  './images/3.jpg',
  './images/4.jpg',
  './images/5.jpg',
];

class Slider {
  constructor(images) {
    this.images = images;
    this.slide = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.image = null;
    this.currentSlide = 0;
    this.slideArrayLength = 0;
    this.slideCaption = null;

    this.UiSelector = {
      slide: '[data-slide]',
      buttonPrev: '[data-button-prev]',
      buttonNext: '[data-button-next]',
    };
  }
  initializeSlider() {
    this.slide = document.querySelector(this.UiSelector.slide);
    this.prevBtn = document.querySelector(this.UiSelector.buttonPrev);
    this.nextBtn = document.querySelector(this.UiSelector.buttonNext);

    this.image = document.createElement('img');
    this.image.classList.add('slide__image');
    this.setSlideAtributes(0);

    this.slideArrayLength = this.images && this.images.length;

    this.slide.appendChild(this.image);

    this.slideCaption = document.createElement('figcaption');
    this.addCaption();
    this.slideCaption.classList.add('slide__caption');
    this.slide.appendChild(this.slideCaption);

    this.disableButtons();
    this.addListeners();
  }

  changeSlide(index) {
    if (index === -1 || index === this.slideArrayLength) return;
    this.currentSlide = index;
    this.addCaption();
    this.setSlideAtributes(index);
    this.disableButtons();
  }

  addCaption() {
    this.slideCaption.innerText = `${this.currentSlide + 1}/${
      this.slideArrayLength
    }`;
  }
  addListeners() {
    this.prevBtn.addEventListener('click', () =>
      this.changeSlide(this.currentSlide - 1)
    );
    this.nextBtn.addEventListener('click', () =>
      this.changeSlide(this.currentSlide + 1)
    );

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 37) {
        this.changeSlide(this.currentSlide - 1);
      } else if (e.keyCode === 39) {
        this.changeSlide(this.currentSlide + 1);
      }
    });
  }

  disableButtons() {
    this.currentSlide === 0
      ? this.prevBtn.setAttribute('disabled', true)
      : this.prevBtn.removeAttribute('disabled');
    this.currentSlide === this.slideArrayLength - 1
      ? this.nextBtn.setAttribute('disabled', true)
      : this.nextBtn.removeAttribute('disabled');
  }

  setSlideAtributes(index) {
    this.image.setAttribute(
      'src',
      Array.isArray(this.images) && this.images.length && this.images[index]
    );
    this.image.setAttribute('alt', `Slide ${index + 1}`);
  }
}

const slider = new Slider(imageArr);
slider.initializeSlider();
