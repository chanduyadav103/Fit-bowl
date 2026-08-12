// Open WhatsApp chat with the business number
function openWhatsApp() {
	const phone = '7981359187';
	const text = encodeURIComponent('Hi Fit Bowl! I would like to order.');
	const url = `https://wa.me/${phone}?text=${text}`;
	window.open(url, '_blank');
}

function openWhatsAppForProduct(productName){
	const phone = '7981359187';
	const text = encodeURIComponent(`Hello Fit Bowl! I would like to order: ${productName}`);
	const url = `https://wa.me/${phone}?text=${text}`;
	window.open(url, '_blank');
}

function openWhatsAppWithText(message){
	const phone = '7981359187';
	const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
	window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
	const top = document.getElementById('whatsappTop');
	const hero = document.getElementById('whatsappHero');
	const banner = document.getElementById('whatsappBanner');
	const menuToggle = document.getElementById('menuToggle');
	const mainNav = document.querySelector('.main-nav');

	[top, hero, banner].forEach(el => {
		if (!el) return;
		el.addEventListener('click', (e) => {
			e.preventDefault();
			openWhatsApp();
		});
	});

	// Mobile nav toggle
	if (menuToggle) {
		menuToggle.addEventListener('click', () => {
			if (mainNav.style.display === 'flex') mainNav.style.display = 'none';
			else mainNav.style.display = 'flex';
		});
	}

	// Simple testimonials carousel
	const testiEl = document.getElementById('testiText');
	const tPrev = document.getElementById('tPrev');
	const tNext = document.getElementById('tNext');
	const testimonials = [
		'Very tasty and healthy snacks. My kids love the ragi chocolates and laddus! — Sangeetha, Tirupati',
		'Quality is super and packing is very neat. Best homemade snacks I have ever tried. — Ramesh, Chittoor',
		'Sunnundalu and ragi puttu are so fresh and delicious. Highly recommended! — Lakshmi, Tirupati'
	];
	let idx = 0;
	function showTesti(i){ testiEl.textContent = testimonials[i]; }
	if (tPrev) tPrev.addEventListener('click', ()=>{ idx = (idx-1+testimonials.length)%testimonials.length; showTesti(idx); });
	if (tNext) tNext.addEventListener('click', ()=>{ idx = (idx+1)%testimonials.length; showTesti(idx); });
	// Auto rotate
	setInterval(()=>{ idx = (idx+1)%testimonials.length; showTesti(idx); }, 6000);

	// Product order buttons -> open WhatsApp with product name
	const productOrderBtns = document.querySelectorAll('.product-card .btn-small');
	productOrderBtns.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const card = btn.closest('.product-card');
			const titleEl = card ? card.querySelector('h4') : null;
			const productName = titleEl ? titleEl.textContent.trim() : 'a product';
			openWhatsAppForProduct(productName);
		});
	});

	// Product modal (cart-like) logic
	const viewAllBtn = document.getElementById('viewAllBtn');
	const highlightBtn = document.getElementById('viewAllBtn2');
	const productModal = document.getElementById('productModal');
	const productModalClose = productModal ? productModal.querySelector('.close') : null;
	const cartListEl = document.getElementById('cartList');
	const sendOrderBtn = document.getElementById('sendOrderBtn');

	let cart = [];

	function openProductModal(){
		if (!productModal) return;
		productModal.style.display = 'block';
		displayCart();
	}

	function closeProductModal(){
		if (!productModal) return;
		productModal.style.display = 'none';
	}

	if (viewAllBtn) viewAllBtn.addEventListener('click', (e) => { e.preventDefault(); openProductModal(); });

	if (highlightBtn) {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				highlightBtn.classList.toggle('border-highlight', entry.isIntersecting);
			});
		}, { threshold: 0.1 });
		observer.observe(highlightBtn);
	}
	if (productModalClose) productModalClose.addEventListener('click', closeProductModal);

	window.addEventListener('click', (e) => { if (e.target === productModal) closeProductModal(); });

	window.addToCart = function(product){
		cart.push(product);
		displayCart();
	};

	function displayCart(){
		if (!cartListEl) return;
		cartListEl.innerHTML = '';
		cart.forEach((item, idx) => {
			const li = document.createElement('li');
			li.textContent = `${idx+1}. ${item}`;
			cartListEl.appendChild(li);
		});
	}

	if (sendOrderBtn) sendOrderBtn.addEventListener('click', () => {
		if (!cart.length) { alert('Please add products first.'); return; }
		const phone = '7981359187';
		let message = 'Hello Fit Bowl! I would like to order:%0A';
		cart.forEach((item, idx) => { message += `${idx+1}. ${item}%0A`; });
		message += '%0APlease let me know the total price. Thank you!';
		window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
		closeProductModal();
	});

});

