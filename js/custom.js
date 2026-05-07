/*!
 * Item: CodeX
 * Description:  Personal Portfolio / Resume / CV / vCard Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v1.0.0
 * License: Themeforest Standard Licenses: https://themeforest.net/licenses
 */

/*----------- CUSTOM JS SCRIPTS -----------*/

(function($) {
  'use strict';

  window.submitted = false;

  $(function() {
    var revealSelector = [
      '.home-content',
      '.hero-visual',
      '.section-heading',
      '.about-img',
      '.about-content',
      '.hire-area .content-part',
      '.hire-area .button-part',
      '.modern-project-grid .single-item',
      '.services-area .single-service',
      '.contact-aside',
      '.contact-card'
    ].join(',');

    document.documentElement.classList.add('js');

    $(revealSelector).addClass('reveal-on-scroll');

    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12
      });

      $('.reveal-on-scroll').each(function(index, element) {
        element.style.transitionDelay = Math.min(index * 35, 180) + 'ms';
        revealObserver.observe(element);
      });
    } else {
      $('.reveal-on-scroll').addClass('is-visible');
    }

    $('.portfolio-area .filter-control li')
      .attr('role', 'button')
      .attr('tabindex', '0')
      .on('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          $(this).trigger('click');
        }
      });

    function setLightboxAccessibility($modal, isOpen) {
      $modal
        .attr('aria-hidden', isOpen ? 'false' : 'true')
        .find('[data-modal-close]')
        .attr({
          'aria-label': 'Close case study',
          role: 'button',
          tabindex: isOpen ? '0' : '-1'
        });
    }

    $('.portfolio-area .lightbox-wrapper').each(function() {
      setLightboxAccessibility($(this), false);
    });

    $('.portfolio-area .portfolio-item').on('click', function() {
      var target = $(this).attr('href');

      window.setTimeout(function() {
        $('.portfolio-area .lightbox-wrapper').each(function() {
          setLightboxAccessibility($(this), false);
        });

        setLightboxAccessibility($(target), true);
      }, 20);
    });

    function forceCloseLightbox($modal) {
      var modalId = $modal.attr('id');

      if (!modalId) {
        return;
      }

      $modal
        .removeClass(modalId + '-on fadeIn')
        .addClass(modalId + '-off fadeOut')
        .attr('aria-hidden', 'true')
        .css({
          opacity: '0',
          overflowY: 'hidden',
          zIndex: '-9999'
        });

      $modal.find('[data-modal-close]').attr('tabindex', '-1');
      $modal.find('.lightbox-gallery.owl-loaded').trigger('destroy.owl.carousel');
      $('html').css({
        marginRight: '0',
        overflowY: 'scroll'
      });
    }

    window.closeCaseStudy = function(control) {
      forceCloseLightbox($(control).closest('.lightbox-wrapper'));
    };

    $(document).on('click', '.portfolio-area [data-modal-close], .portfolio-area .close-btn', function(event) {
      var $modal = $(this).closest('.lightbox-wrapper');

      event.preventDefault();
      event.stopPropagation();
      forceCloseLightbox($modal);
    });

    $(document).on('keydown', function(event) {
      if (event.key !== 'Escape') {
        return;
      }

      $('.portfolio-area .lightbox-wrapper').each(function() {
        var $modal = $(this);

        if (parseInt($modal.css('z-index'), 10) > 0) {
          forceCloseLightbox($modal);
        }
      });
    });

    var $contactForm = $('#contact-form');
    var $status = $contactForm.find('.form-status');
    var $submit = $contactForm.find('button[type="submit"]');

    $contactForm.on('submit', function() {
      window.submitted = true;
      $status.text('Sending through the secure form...');
      $submit.prop('disabled', true).text('Sending');
    });

    $('#hidden_iframe').on('load', function() {
      if (!window.submitted) {
        return;
      }

      $contactForm.addClass('is-sent');
      $status.text('Message sent. I will follow up soon.');
      $submit.prop('disabled', true).text('Sent');
    });
  });
}(jQuery));

