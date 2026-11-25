import { useEffect, useState } from 'react';

const phoneNumber = '7981359187';

const products = [
	{ name: 'Ragi Puttu', image: 'img-4.jpg' },
	{ name: 'Chikkies', image: 'img-7.jpg' },
	{ name: 'Dry Fruit Laddu', image: 'img-6.jpg' },
	{ name: 'Sunnundalu', image: 'img-5.jpg' },
	{ name: 'Ravva Laddu', image: 'rava-ladoo.jpg' },
	{ name: 'Pappu Chekkalu', image: 'img-3.jpg' },
	{ name: 'Ragi Muruku', image: 'img-8.jpg' },
	{ name: 'Peanut Laddu', image: 'Peanut-Laddu.webp' },
];

const testimonials = [
	'Very tasty and healthy snacks. My kids love the ragi chocolates and laddus! — Sangeetha, Tirupati',
	'Quality is super and packing is very neat. Best homemade snacks I have ever tried. — Ramesh, Chittoor',
	'Sunnundalu and ragi puttu are so fresh and delicious. Highly recommended! — Lakshmi, Tirupati',
];

function openWhatsApp(message) {
	window.open(
		`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
		'_blank',
		'noopener,noreferrer',
	);
}

function ProductCard({ product, onOrder }) {
	return (
		<article className="product-card">
			<img src={`/images/${product.image}`} alt={product.name} />
			<h4>{product.name}</h4>
			<button className="btn-small" type="button" onClick={() => onOrder(product.name)}>
				ORDER NOW
			</button>
		</article>
	);
}

function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [cart, setCart] = useState([]);
	const [testimonialIndex, setTestimonialIndex] = useState(0);
	const [deliveryHighlighted, setDeliveryHighlighted] = useState(false);

	useEffect(() => {
		const timer = window.setInterval(() => {
			setTestimonialIndex((index) => (index + 1) % testimonials.length);
		}, 6000);
		return () => window.clearInterval(timer);
	}, []);

	useEffect(() => {
		const deliveryButton = document.getElementById('viewAllBtn2');
		if (!deliveryButton || !('IntersectionObserver' in window)) return undefined;

		const observer = new IntersectionObserver(
			(entries) => setDeliveryHighlighted(entries.some((entry) => entry.isIntersecting)),
			{ threshold: 0.1 },
		);
		observer.observe(deliveryButton);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!modalOpen) return undefined;
		const closeOnEscape = (event) => {
			if (event.key === 'Escape') setModalOpen(false);
		};
		window.addEventListener('keydown', closeOnEscape);
		return () => window.removeEventListener('keydown', closeOnEscape);
	}, [modalOpen]);

	const navLinks = [
		['Home', '#'],
		['About Us', '#about'],
		['Products', '#products'],
		['Why Fit Bowl', '#why'],
		['Gallery', '#gallery'],
		['Contact Us', '#contact'],
	];

	const moveTestimonial = (direction) => {
		setTestimonialIndex((index) => (index + direction + testimonials.length) % testimonials.length);
	};

	const orderProduct = (name) => {
		openWhatsApp(`Hello Fit Bowl! I would like to order: ${name}`);
	};

	const sendCartOrder = () => {
		if (cart.length === 0) {
			window.alert('Please add products first.');
			return;
		}
		const items = cart.map((item, index) => `${index + 1}. ${item}`).join('\n');
		openWhatsApp(`Hello Fit Bowl! I would like to order:\n${items}\n\nPlease let me know the total price. Thank you!`);
		setModalOpen(false);
	};

	return (
		<>
			<header className="site-header">
				<div className="container header-inner">
					<div className="brand">
						<div className="logo">
							<img src="/images/img-22.jpeg" alt="Fit Bowl Logo" />
						</div>
						<div className="brand-text">
							<div className="name">FIT BOWL</div>
							<div className="tag">Healthy is Happy</div>
						</div>
					</div>

					<nav className={`main-nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
						{navLinks.map(([label, href]) => (
							<a href={href} key={label} onClick={() => setMenuOpen(false)}>
								{label}
							</a>
						))}
					</nav>

					<div className="cta-actions">
						<a
							className="whatsapp-btn"
							href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hi Fit Bowl! I would like to order.')}`}
							target="_blank"
							rel="noreferrer"
						>
							Order on WhatsApp<br /><span>79813 59187</span>
						</a>
						<button
							className="menu-toggle"
							type="button"
							aria-label="Toggle navigation"
							aria-expanded={menuOpen}
							onClick={() => setMenuOpen((open) => !open)}
						>
							☰
						</button>
					</div>
				</div>
			</header>

			<main>
				<section className="hero">
					<div className="container hero-inner">
						<div className="hero-left">
							<p className="hero-top-text">Welcome to</p>
							<h1 className="hero-title">FIT BOWL</h1>
							<p className="hero-subtitle">HEALTHY HOMEMADE FOODS</p>
							<p className="lead">We prepare healthy, tasty and homemade snacks with the best quality ingredients for you and your family.</p>
							<div className="hero-icons">
								<div className="hero-icon-item">100% Homemade</div>
								<div className="hero-icon-item">No Preservatives</div>
								<div className="hero-icon-item">Freshly Prepared</div>
								<div className="hero-icon-item">Hygienically Packed</div>
							</div>
							<a
								className="primary-btn"
								href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hi Fit Bowl! I would like to order.')}`}
								target="_blank"
								rel="noreferrer"
							>
								<span>ORDER NOW ON WHATSAPP</span><strong>79813 59187</strong>
							</a>
						</div>
						<div className="hero-right">
							<div className="hero-image-wrap">
								<img src="/images/img-1.png" alt="Fit Bowl Snacks" />
							</div>
						</div>
					</div>
				</section>

				<section id="products" className="products container">
					<h3 className="section-title">Our Products</h3>
					<div className="product-grid">
						{products.map((product) => (
							<ProductCard key={product.name} product={product} onOrder={orderProduct} />
						))}
					</div>
					<div className="center">
						<button className="view-all" type="button" onClick={() => setModalOpen(true)}>
							Select multiple Products
						</button>
					</div>
				</section>

				{modalOpen && (
					<div
						id="productModal"
						className="modal"
						role="presentation"
						onClick={(event) => {
							if (event.target === event.currentTarget) setModalOpen(false);
						}}
					>
						<div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
							<button className="close" type="button" aria-label="Close product selector" onClick={() => setModalOpen(false)}>
								&times;
							</button>
							<h2 id="modalTitle">Select Products</h2>
							<div className="product-grid modal-select-grid">
								{products.map((product) => (
									<article className="product-card" key={product.name}>
										<img src={`/images/${product.image}`} alt={product.name} />
										<h4>{product.name}</h4>
										<button type="button" onClick={() => setCart((items) => [...items, product.name])}>
											Add to Cart
										</button>
									</article>
								))}
							</div>
							<hr />
							<h3>🛒 Cart</h3>
							<ul id="cartList">
								{cart.map((item, index) => <li key={`${item}-${index}`}>{index + 1}. {item}</li>)}
							</ul>
							<button className="order-btn" type="button" onClick={sendCartOrder}>
								Order on WhatsApp
							</button>
						</div>
					</div>
				)}

				<section id="why" className="why container">
					<h3 className="section-title">Why Choose Fit Bowl?</h3>
					<div className="why-grid">
						<div className="why-item">100% Homemade</div>
						<div className="why-item">No Preservatives</div>
						<div className="why-item">Freshly Prepared</div>
						<div className="why-item">Quality Ingredients</div>
						<div className="why-item">Hygienically Packed</div>
						<div className="why-item">Made with Love</div>
					</div>
				</section>

				<section id="about" className="about container">
					<div className="about-inner">
						<div className="about-img">
							<img src="/images/img-22.jpeg" alt="About Fit Bowl" />
						</div>
						<div className="about-text">
							<h3>About Fit Bowl</h3>
							<p><span className="highlight">Fit Bowl</span> is a homemade food brand dedicated to offering healthy, delicious, and traditional snacks.
								We prepare every product using natural, high-quality ingredients with no compromise on freshness.
								Our recipes combine authentic homemade flavors with balanced nutrition for everyday wellness.
								From wholesome snacks to nutritious treats, every bite is crafted with care and love.
								We believe healthy eating should be simple, satisfying, and full of great taste.
								At Fit Bowl, our goal is to bring homemade goodness to every home with quality you can trust.</p>
							<a className="secondary-btn" href="#contact">Know More About Us</a>
						</div>
					</div>
				</section>

				<section className="cta-banner">
					<div className="container cta-inner">
						<div>
							<h3>Healthy Food For A Better You</h3>
							<p>Eat Healthy, Stay Healthy with Fit Bowl!</p>
						</div>
						<button
							id="viewAllBtn2"
							className={`view-all${deliveryHighlighted ? ' border-highlight' : ''}`}
							type="button"
						>
							Orders Delivered Within 24 Hours...!
						</button>
					</div>
				</section>

				<section id="testimonials" className="testimonials container">
					<h3 className="section-title">What Our Customers Say</h3>
					<div className="testi-wrap">
						<button className="t-arrow left" type="button" aria-label="Previous testimonial" onClick={() => moveTestimonial(-1)}>‹</button>
						<div className="testi" aria-live="polite">{testimonials[testimonialIndex]}</div>
						<button className="t-arrow right" type="button" aria-label="Next testimonial" onClick={() => moveTestimonial(1)}>›</button>
					</div>
				</section>
			</main>

			<footer id="contact" className="site-footer">
				<div className="container footer-inner">
					<div className="footer-brand">
						<div className="name">FIT BOWL</div>
						<div className="tag">Healthy homemade foods made with love</div>
					</div>
					<div className="footer-col">
						<h4>Quick Links</h4>
						<a href="#">Home</a>
						<a href="#about">About</a>
						<a href="#products">Products</a>
					</div>
					<div className="footer-col">
						<h4>Contact</h4>
						<p>79813 59187</p>
						<p>Tirupati, Andhra Pradesh</p>
						<p>9:00 AM - 8:00 PM</p>
					</div>
					<div className="footer-col footer-map">
						<h4>Location</h4>
						<div className="map-wrap" style={{ width: '100%', height: 160, borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
							<iframe
								title="Fit Bowl location"
								src="https://www.google.com/maps?q=13.587322235107422,79.39837646484375&z=17&output=embed"
								style={{ border: 0, width: '100%', height: '100%' }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							/>
						</div>
						<p style={{ marginTop: 8, fontSize: 14 }}>
							<a href="https://www.google.com/maps?q=13.587322235107422,79.39837646484375&z=17&hl=en" target="_blank" rel="noopener noreferrer">
								Open in Google Maps
							</a>
						</p>
					</div>
				</div>
				<div className="copyright">© 2024 Fit Bowl. All Rights Reserved.</div>
			</footer>
		</>
	);
}

export default App;
