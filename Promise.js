function updateCount(counter) {
      const counters = document.querySelectorAll('.counter-block-wrap .counter-block-item .counter-integer');
      const speed    = 300;
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;
        if (count < target) {
          counter.innerText = Math.round(count + inc);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    }

    function isScrolledIntoViewForCounter( elem ) {
      let docViewTop    = $(window).scrollTop();
      let docViewBottom = docViewTop + $(window).height();
      let elemTop       = $(elem).offset().top;
      let elemBottom    = elemTop + $(elem).height();
      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    const promise = new Promise(function(resolve, reject) {
      const elem = $('.counter-block-wrap .counter-block-item .counter-integer');
      if( isScrolledIntoViewForCounter( elem ) ) {
        if( elem.is(':visible') ) {
          resolve();
        }
      } else {
        window.addEventListener("scroll", function() {
          if( isScrolledIntoViewForCounter( elem ) ) {
            if( elem.is(':visible') ) {
              resolve();
            }
          }
        });
      }
    }).then(() => {
      document.querySelectorAll('.counter-block-wrap .counter-block-item .counter-integer').forEach(updateCount);
    });
