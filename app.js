((d, w, l) => {
	'use strict';
	// Menu Nav
	const navbar = d.getElementById('navbar'),
		  btnUp = d.querySelector('.btn__scroll__up'),
		  boxTheme = d.querySelector('.switch__theme');

	let scrollY;
	w.addEventListener('scroll', () => {
		scrollY = w.scrollY;
		//Navbar menu
		if (scrollY >= 100 && scrollY < 550) {
			if (navbar.classList.contains('header--show')) navbar.classList.replace('header--show', 'header--hide');
			else navbar.classList.add('header--hide');
		}
		else if (scrollY >= 550) navbar.classList.replace('header--hide', 'header--show');
		else navbar.classList.remove('header--hide');
		//button scroll
		if (scrollY >= 550) btnUp.classList.add('show--scroll--btn');
		else btnUp.classList.remove('show--scroll--btn');
	});
	btnUp.onclick = () => w.scrollTo({top: 0, behavior: 'smooth'});

	// Navbar active
	const navLink = navbar.firstElementChild.children[1];
	navLink.addEventListener('click', (e) => {
		e.preventDefault();
		let slink = e.target;

		for (const ele of navLink.children) {
			ele.classList.remove('item__active');
		}
		if (slink.classList.contains('nav--item')) slink.classList.add('item__active');
		else slink.parentElement.classList.add('item__active');
	});
	const oriLinks = navLink.querySelectorAll('.bur-tem');
	oriLinks.forEach( (e) => e.onclick = () => onBurguer() );

	// navbar mobile
	const burguer = navbar.firstElementChild.lastElementChild;
	function onBurguer () {
		burguer.classList.toggle('toggle');
		navLink.classList.toggle('show__nav');
	}
	burguer.onclick = () => onBurguer();

	// changue theme page
	const btnDark = boxTheme.children[0],
		  btnLight = boxTheme.children[1];
	const onTheme = {
		setLight(){
			l.setItem('themeTik', null);
			d.body.classList.remove('dark--theme');
			boxTheme.lastElementChild.classList.add('changue');
		},
		setDark(){
			l.setItem('themeTik', 'true');
			d.body.classList.add('dark--theme');
			boxTheme.lastElementChild.classList.remove('changue');
		}
	};
	btnDark.onclick = () => onTheme.setDark();
	btnLight.onclick = () => onTheme.setLight();

	d.addEventListener('DOMContentLoaded', () => {
		const flag = l.getItem('themeTik');
		if(!flag || flag == 'null') return onTheme.setLight();
		else onTheme.setDark();
	});

})(document, window, localStorage);