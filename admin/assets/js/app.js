const products = [
  { id: 1, name: 'Prol Tape', category: 'Makanan', sku: 'CR-001', price: 25000, stock: 42, status: 'in', image: 'assets/images/prol-tape.avif' },
  { id: 2, name: 'Pia Tape', category: 'Makanan', sku: 'VS-044', price: 27000, stock: 3, status: 'low', image: 'assets/images/pia-tape.jpeg' },
  { id: 3, name: 'Edamame', category: 'Makanan', sku: 'TX-012', price: 45000, stock: 0, status: 'out', image: 'assets/images/edamame.jpg' },
  { id: 4, name: 'Keripik Tempe', category: 'Makanan', sku: 'CR-088', price: 15000, stock: 15, status: 'in', image: 'assets/images/keripik-tempe.webp' },
  { id: 5, name: 'Keripik Nangka', category: 'Makanan', sku: 'KN-021', price: 400000, stock: 20, status: 'in', image: 'assets/images/keripik-nangka.jpg' },
  { id: 6, name: 'Carang Mas', category: 'Makanan', sku: 'CM-032', price: 187000, stock: 11, status: 'in', image: 'assets/images/carang-mas.webp' }
];

let orders = [
  { id: '#GH-8829', customer: 'Budi Santoso', email: 'budi.s@gmail.com', date: '21 Mei 2026', time: '14:32', payment: 'Visa •••• 4242', total: 90000, status: 'Pending' },
  { id: '#GH-8828', customer: 'Farel Hasna', email: 'farel.h@studio.co', date: '21 Mei 2026', time: '09:15', payment: 'Bank Transfer', total: 73000, status: 'Processing' },
  { id: '#GH-8827', customer: 'Dafin Mirza', email: 'Dafin.m@gmail.com', date: '21 Mei 2026', time: '16:45', payment: 'Amex •••• 1002', total: 55000, status: 'Delivered' },
  { id: '#ORD-0091', customer: 'Eleanor Vance', email: 'eleanor.v@gmail.com', date: '24 Mei 2026', time: '10:05', payment: 'Bank Transfer', total: 100000, status: 'Paid' },
  { id: '#ORD-0090', customer: 'Marcus Reed', email: 'marcus.r@mail.com', date: '24 Mei 2026', time: '11:21', payment: 'Visa •••• 4421', total: 80000, status: 'Pending' },
  { id: '#ORD-0089', customer: 'Sarah Jenkins', email: 'sarah.j@mail.com', date: '24 Mei 2026', time: '13:44', payment: 'Amex •••• 1220', total: 70000, status: 'Shipped' },
  { id: '#ORD-0088', customer: 'James Lin', email: 'james.lin@mail.com', date: '22 Mei 2026', time: '15:02', payment: 'Visa •••• 7272', total: 50000, status: 'Shipped' }
];

const customers = [
  { name: 'Arthur Pendelton', type: 'Individu', tag: 'Wiraswasta', email: 'arthur@gmail.com', detail: '088996500219', orders: 142, lastLogin: '24 Mei 2026', avatar: 'AP', avatarClass: '' },
  { name: 'Eleanor Vance', type: 'Individu', tag: 'Mahasiswa', email: 'eleanor.v@gmail.com', detail: 'Surabaya, Indonesia', orders: 12, lastLogin: '2 Hari lalu', avatar: 'EV', avatarClass: 'a2' },
  { name: 'Ayu Anisa', type: 'Individu', tag: 'Ibu Rumah Tangga', email: 'Growth@gmail.com', detail: '45 Members Active', orders: 89, lastLogin: 'Hari ini', avatar: 'AA', avatarClass: 'a3' },
  { name: 'Nusantara Mart', type: 'Perusahaan', tag: 'Perusahaan', email: 'admin@nusantaramart.id', detail: 'Bandar Lampung, Indonesia', orders: 231, lastLogin: 'Kemarin', avatar: 'NM', avatarClass: 'a4' }
];

const money = value => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value).replace('IDR', 'Rp');

const pageButtons = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');
const sidebar = document.getElementById('sidebar');

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2300);
}

function setPage(pageName) {
  pageButtons.forEach(button => button.classList.toggle('active', button.dataset.page === pageName));
  pages.forEach(page => page.classList.toggle('active', page.id === `page-${pageName}`));
  sidebar.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

pageButtons.forEach(button => button.addEventListener('click', () => setPage(button.dataset.page)));
document.querySelectorAll('[data-page-target]').forEach(button => {
  button.addEventListener('click', () => setPage(button.dataset.pageTarget));
});

document.getElementById('mobileToggle').addEventListener('click', () => sidebar.classList.toggle('open'));

document.addEventListener('click', (event) => {
  if (window.innerWidth <= 920 && sidebar.classList.contains('open')) {
    const clickedInside = sidebar.contains(event.target) || event.target.id === 'mobileToggle';
    if (!clickedInside) sidebar.classList.remove('open');
  }
});

function renderBestProducts() {
  const target = document.getElementById('bestProducts');
  const best = [products[4], products[5]];
  target.innerHTML = best.map(item => `
    <div class="best-item">
      <img src="${item.image}" alt="${item.name}" />
      <div><strong>${item.name}</strong><small>${item.id === 5 ? '20' : '11'} units sold</small></div>
      <b>${money(item.price)}</b>
    </div>
  `).join('');
}

function orderStatusClass(status) {
  return status.replace(/\s+/g, '');
}

function renderRecentOrders() {
  const target = document.getElementById('recentOrdersBody');
  const recent = orders.slice(3, 7);
  target.innerHTML = recent.map(order => `
    <tr>
      <td><strong>${order.id}</strong></td>
      <td>${customerMini(order.customer)}</td>
      <td>${order.date}</td>
      <td><span class="status ${orderStatusClass(order.status)}">${order.status}</span></td>
      <td class="right"><strong>${money(order.total)}</strong></td>
    </tr>
  `).join('');
}

function customerMini(name) {
  const initials = name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
  return `<span style="display:inline-flex;align-items:center;gap:10px"><span class="mini-avatar">${initials}</span>${name}</span>`;
}

function renderOrders() {
  const tbody = document.getElementById('ordersTableBody');
  const search = document.getElementById('orderSearch').value.trim().toLowerCase();
  const status = document.getElementById('statusFilter').value;
  const payment = document.getElementById('paymentFilter').value;

  const filtered = orders.filter(order => {
    const matchesSearch = [order.id, order.customer, order.email, order.payment, order.status].some(value => value.toLowerCase().includes(search));
    const matchesStatus = status === 'all' || order.status === status;
    const matchesPayment = payment === 'All Payments' || order.payment.includes(payment);
    return matchesSearch && matchesStatus && matchesPayment;
  });

  tbody.innerHTML = filtered.map(order => `
    <tr>
      <td><input type="checkbox" class="order-check" /></td>
      <td><strong>${order.id}</strong></td>
      <td>${order.customer}<span class="muted">${order.email}</span></td>
      <td>${order.date}<span class="muted">${order.time}</span></td>
      <td><span class="payment-pill">${order.payment}</span></td>
      <td class="right"><strong>${money(order.total)}</strong></td>
      <td><span class="status ${orderStatusClass(order.status)}">${order.status}</span></td>
      <td class="right"><span class="action-cell"><button title="Lihat detail">⊙</button><button title="Menu">⋮</button></span></td>
    </tr>
  `).join('') || `<tr><td colspan="8" style="text-align:center;color:#667085;padding:36px">Tidak ada pesanan yang sesuai.</td></tr>`;

  document.getElementById('orderCountText').textContent = `Showing ${filtered.length ? 1 : 0} to ${filtered.length} of ${orders.length} results`;
  renderActiveFilters(status, payment);
  bindRowSelections();
}

function renderActiveFilters(status, payment) {
  const target = document.getElementById('activeFilters');
  const chips = [];
  if (status !== 'all') chips.push(`Status: ${status}`);
  if (payment !== 'All Payments') chips.push(`Payment: ${payment}`);

  target.innerHTML = chips.length
    ? `<span>ACTIVE FILTERS:</span>${chips.map(chip => `<span class="filter-chip">${chip} ×</span>`).join('')}<button class="filter-clear" id="clearFilters">Clear All</button>`
    : '';

  const clear = document.getElementById('clearFilters');
  if (clear) clear.addEventListener('click', () => {
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('paymentFilter').value = 'All Payments';
    renderOrders();
  });
}

function bindRowSelections() {
  document.querySelectorAll('.order-check').forEach(input => {
    input.addEventListener('change', () => input.closest('tr').classList.toggle('selected', input.checked));
  });
}

function stockLabel(product) {
  if (product.status === 'low') return `<span class="stock-badge low">⚠ Low Stock: ${product.stock}</span>`;
  if (product.status === 'out') return `<span class="stock-badge out">● Out of Stock</span>`;
  return `<span class="stock-badge in">● In Stock: ${product.stock}</span>`;
}

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  const q = document.getElementById('globalSearch').value.trim().toLowerCase();
  const filtered = products.filter(product => {
    const matchesFilter = filter === 'all' || product.category === filter;
    const matchesSearch = !q || [product.name, product.category, product.sku].some(value => String(value).toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        ${stockLabel(product)}
      </div>
      <div class="product-body">
        <div class="product-meta"><span>${product.category}</span><span>SKU: ${product.sku}</span></div>
        <h3>${product.name}</h3>
        <div class="product-bottom"><b>${money(product.price)}</b><button class="edit-btn" title="Edit produk">⌁</button></div>
      </div>
    </article>
  `).join('') || `<p style="color:#667085">Produk tidak ditemukan.</p>`;
}

function renderCustomers(filter = 'all') {
  const grid = document.getElementById('customersGrid');
  const q = document.getElementById('customerSearch').value.trim().toLowerCase();
  const filtered = customers.filter(customer => {
    const matchesFilter = filter === 'all' || customer.type === filter;
    const matchesSearch = !q || [customer.name, customer.email, customer.tag, customer.type].some(value => value.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = filtered.map(customer => `
    <article class="customer-card">
      <div class="customer-top">
        <div class="customer-main">
          <div class="avatar ${customer.avatarClass}">${customer.avatar}</div>
          <div><h3>${customer.name}</h3><span class="customer-tag">${customer.tag}</span></div>
        </div>
        <button class="icon-btn">⋮</button>
      </div>
      <div class="customer-lines">
        <span>✉ ${customer.email}</span>
        <span>♧ ${customer.detail}</span>
      </div>
      <div class="customer-stats">
        <div><span>Total Pesanan</span><b>${customer.orders}</b></div>
        <div><span>Login Terakhir</span><b>${customer.lastLogin}</b></div>
      </div>
    </article>
  `).join('') || `<p style="color:#667085">Pelanggan tidak ditemukan.</p>`;
}

function csvDownload(filename, rows) {
  const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}
function closeModals() {
  document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('open'));
}

document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.modal)));
document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', closeModals));
document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', event => {
  if (event.target === modal) closeModals();
}));

document.getElementById('orderSearch').addEventListener('input', renderOrders);
document.getElementById('statusFilter').addEventListener('change', renderOrders);
document.getElementById('paymentFilter').addEventListener('change', renderOrders);
document.getElementById('dateFilter').addEventListener('change', () => showToast('Filter tanggal demo aktif.'));

document.querySelectorAll('[data-product-filter]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-product-filter]').forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    renderProducts(tab.dataset.productFilter);
  });
});

document.querySelectorAll('[data-customer-filter]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-customer-filter]').forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    renderCustomers(tab.dataset.customerFilter);
  });
});

document.getElementById('customerSearch').addEventListener('input', () => {
  const active = document.querySelector('[data-customer-filter].active').dataset.customerFilter;
  renderCustomers(active);
});

document.getElementById('globalSearch').addEventListener('input', (event) => {
  const value = event.target.value.trim().toLowerCase();
  if (!value) {
    renderProducts(document.querySelector('[data-product-filter].active').dataset.productFilter);
    return;
  }
  const matchingPage = document.querySelector('.page.active')?.id;
  if (matchingPage === 'page-products') renderProducts(document.querySelector('[data-product-filter].active').dataset.productFilter);
  if (matchingPage === 'page-orders') {
    document.getElementById('orderSearch').value = value;
    renderOrders();
  }
  if (matchingPage === 'page-customers') {
    document.getElementById('customerSearch').value = value;
    renderCustomers(document.querySelector('[data-customer-filter].active').dataset.customerFilter);
  }
});

document.getElementById('selectAllOrders').addEventListener('change', (event) => {
  document.querySelectorAll('.order-check').forEach(check => {
    check.checked = event.target.checked;
    check.closest('tr').classList.toggle('selected', check.checked);
  });
});

document.getElementById('exportReport').addEventListener('click', () => {
  csvDownload('harmoni-orders-report.csv', [
    ['Order ID', 'Customer', 'Email', 'Date', 'Payment', 'Total', 'Status'],
    ...orders.map(order => [order.id, order.customer, order.email, `${order.date} ${order.time}`, order.payment, order.total, order.status])
  ]);
  showToast('Report CSV berhasil dibuat.');
});

document.getElementById('printShipping').addEventListener('click', () => {
  showToast('Mode cetak surat pengiriman dibuka.');
  window.print();
});

document.getElementById('productForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const stock = Number(form.get('stock'));
  products.unshift({
    id: products.length + 1,
    name: form.get('name'),
    category: form.get('category'),
    sku: `NW-${String(products.length + 11).padStart(3, '0')}`,
    price: Number(form.get('price')),
    stock,
    status: stock === 0 ? 'out' : stock < 5 ? 'low' : 'in',
    image: 'assets/images/keripik-nangka.jpg'
  });
  event.currentTarget.reset();
  closeModals();
  renderProducts(document.querySelector('[data-product-filter].active').dataset.productFilter);
  renderBestProducts();
  showToast('Produk baru ditambahkan ke katalog demo.');
});

document.getElementById('manualOrderForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  orders.unshift({
    id: `#GH-${8830 + orders.length}`,
    customer: form.get('customer'),
    email: `${String(form.get('customer')).toLowerCase().replaceAll(' ', '.')}@mail.com`,
    date: 'Hari ini',
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    payment: 'Manual Order',
    total: Number(form.get('total')),
    status: form.get('status')
  });
  event.currentTarget.reset();
  closeModals();
  renderOrders();
  renderRecentOrders();
  showToast('Pesanan manual berhasil dibuat.');
});

document.getElementById('loadMoreProducts').addEventListener('click', () => showToast('Semua produk demo sudah ditampilkan.'));
document.getElementById('loadMoreCustomers').addEventListener('click', () => showToast('Semua pelanggan demo sudah ditampilkan.'));

const style = document.createElement('style');
style.textContent = `.mini-avatar{width:28px;height:28px;border-radius:999px;background:#eef2f6;color:#344054;display:inline-grid;place-items:center;font-size:10px;font-weight:900}`;
document.head.appendChild(style);

renderBestProducts();
renderRecentOrders();
renderOrders();
renderProducts();
renderCustomers();
