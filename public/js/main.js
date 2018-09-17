var rootElement = document;

var menus = Array.prototype.slice.call(rootElement.querySelectorAll('.site-nav-desktop__item-link--more'));
var lastLinks = Array.prototype.slice.call(rootElement.querySelectorAll('.site-nav-desktop__menu-links li:last-of-type > a'));

var mainNav = rootElement.querySelector('[data-role="main-nav"]');
var mainNavOpen = rootElement.querySelector('[data-role="open-left-hand-nav"]');

menus.forEach(function (item) {
	item.onclick = function (e) {
		e.preventDefault();

		if (this.classList.contains('site-nav-desktop__item--open')) {
			this.classList.remove('site-nav-desktop__item--open');
		} else {
			closeSubMenus();
			this.classList.add('site-nav-desktop__item--open');
		}
	};
});

lastLinks.forEach(function (item) {
	item.onblur = function () {
		closeSubMenus();
	};
});

mainNavOpen.onclick = function (e) {
	e.preventDefault();
	var expanded = mainNavOpen.getAttribute('aria-expanded');
	closeMainMenu(expanded);
};

function closeSubMenus(menu) {
	menus.forEach(function (item) {
		item.classList.remove('site-nav-desktop__item--open');
	});
}

function closeMainMenu(close) {
	if (close === 'true') {
		mainNav.setAttribute('aria-hidden', 'true');
		mainNavOpen.setAttribute('aria-expanded', false);
	} else {
		mainNav.setAttribute('aria-hidden', 'false');
		mainNavOpen.setAttribute('aria-expanded', true);
	}
}

// close sub menus if clicked off
document.body.addEventListener('click', function (e) {
	if (!document.querySelector('.site-header').contains(e.target)) {
		closeSubMenus();
	}
});

// close main menu if clicked off
document.body.addEventListener('click', function (e) {
	if (!mainNav.contains(e.target) && !mainNavOpen.contains(e.target)) {
		closeMainMenu('true');
	}
});
