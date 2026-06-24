// import AuthDecorator from './decorator/auth.decorator';
// import { Controller, Get, Res } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import type { Response } from 'express';
// import * as os from 'os';

// @Controller('')
// export class HomeController {
//   constructor(private configService: ConfigService) {}

//   @AuthDecorator()
//   @Get()
//   getDocs(@Res() res: Response) {
//     const nonce = res.locals.nonce;
//     const BASE_URL =
//       this.configService.get('API_URL') || 'http://localhost:3000';
//     const serverStatus = this.getServerStatus();

//     const html = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>E‑Commerce API Documentation</title>
//     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
//     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
//     <style>
//         :root {
//             --primary: #4f46e5;
//             --primary-dark: #4338ca;
//             --secondary: #10b981;
//             --danger: #ef4444;
//             --warning: #f59e0b;
//             --info: #3b82f6;
//             --dark: #1f2937;
//             --light: #f9fafb;
//             --border: #e5e7eb;
//             --code-bg: #1e293b;
//             --text-muted: #6b7280;
//         }
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { font-family: 'Inter', sans-serif; background: var(--light); color: var(--dark); line-height: 1.5; }
//         .container { max-width: 1400px; margin: 0 auto; padding: 2rem; }
//         .header {
//             background: white;
//             border-bottom: 1px solid var(--border);
//             padding: 1rem 2rem;
//             position: sticky;
//             top: 0;
//             z-index: 100;
//             backdrop-filter: blur(8px);
//             background: rgba(255,255,255,0.95);
//         }
//         .header-content {
//             max-width: 1400px;
//             margin: 0 auto;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             flex-wrap: wrap;
//             gap: 1rem;
//         }
//         .logo h1 {
//             font-size: 1.5rem;
//             font-weight: 700;
//             background: linear-gradient(135deg, var(--primary), var(--secondary));
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//         }
//         .status {
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             background: var(--light);
//             padding: 0.5rem 1rem;
//             border-radius: 2rem;
//             font-size: 0.875rem;
//         }
//         .status-badge {
//             width: 10px;
//             height: 10px;
//             border-radius: 50%;
//             background: var(--secondary);
//             animation: pulse 2s infinite;
//         }
//         @keyframes pulse {
//             0% { opacity: 1; transform: scale(1); }
//             50% { opacity: 0.6; transform: scale(1.2); }
//             100% { opacity: 1; transform: scale(1); }
//         }
//         .base-url {
//             font-family: monospace;
//             background: var(--light);
//             padding: 0.5rem 1rem;
//             border-radius: 0.5rem;
//             font-size: 0.875rem;
//         }
//         .main { display: flex; gap: 2rem; margin-top: 2rem; }
//         .sidebar {
//             width: 280px;
//             flex-shrink: 0;
//             position: sticky;
//             top: 90px;
//             height: fit-content;
//             background: white;
//             border-radius: 1rem;
//             padding: 1.5rem;
//             border: 1px solid var(--border);
//         }
//         .sidebar nav ul { list-style: none; }
//         .sidebar nav ul li { margin-bottom: 0.5rem; }
//         .sidebar nav ul li a {
//             text-decoration: none;
//             color: var(--dark);
//             display: block;
//             padding: 0.5rem 0.75rem;
//             border-radius: 0.5rem;
//             transition: all 0.2s;
//             font-weight: 500;
//         }
//         .sidebar nav ul li a:hover { background: var(--light); color: var(--primary); }
//         .content { flex: 1; min-width: 0; }
//         .section {
//             background: white;
//             border-radius: 1rem;
//             border: 1px solid var(--border);
//             margin-bottom: 2rem;
//             overflow: hidden;
//         }
//         .section-header {
//             padding: 1rem 1.5rem;
//             background: white;
//             border-bottom: 1px solid var(--border);
//             cursor: pointer;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             font-weight: 600;
//             font-size: 1.25rem;
//         }
//         .section-header:hover { background: var(--light); }
//         .section-content { padding: 1.5rem; }
//         .section-content.collapsed { display: none; }
//         .endpoint {
//             margin-bottom: 2rem;
//             border-left: 3px solid var(--border);
//             padding-left: 1rem;
//         }
//         .endpoint-method {
//             display: inline-block;
//             font-weight: 700;
//             padding: 0.25rem 0.75rem;
//             border-radius: 0.375rem;
//             font-size: 0.75rem;
//             margin-right: 0.75rem;
//         }
//         .method-get { background: #d1fae5; color: #065f46; }
//         .method-post { background: #fed7aa; color: #92400e; }
//         .method-put { background: #fef3c7; color: #b45309; }
//         .method-patch { background: #c7d2fe; color: #3730a3; }
//         .method-delete { background: #fee2e2; color: #991b1b; }
//         .endpoint-path { font-family: monospace; font-size: 1rem; font-weight: 500; }
//         .endpoint-desc { color: var(--text-muted); margin: 0.5rem 0; font-size: 0.875rem; }
//         .details { margin-top: 1rem; }
//         .details summary { cursor: pointer; font-weight: 500; color: var(--primary); margin-bottom: 0.5rem; }
//         pre {
//             background: var(--code-bg);
//             color: #e2e8f0;
//             padding: 1rem;
//             border-radius: 0.5rem;
//             overflow-x: auto;
//             font-size: 0.875rem;
//             margin: 0.5rem 0;
//             position: relative;
//         }
//         .copy-btn {
//             position: absolute;
//             top: 0.5rem;
//             right: 0.5rem;
//             background: #334155;
//             border: none;
//             color: white;
//             cursor: pointer;
//             font-size: 0.75rem;
//             padding: 0.25rem 0.5rem;
//             border-radius: 0.25rem;
//         }
//         .copy-btn:hover { background: #475569; }
//         .badge {
//             display: inline-block;
//             background: var(--light);
//             padding: 0.25rem 0.5rem;
//             border-radius: 0.375rem;
//             font-size: 0.75rem;
//             font-weight: 500;
//             margin-right: 0.5rem;
//         }
//         footer {
//             text-align: center;
//             margin-top: 3rem;
//             padding: 1.5rem;
//             color: var(--text-muted);
//             font-size: 0.875rem;
//             border-top: 1px solid var(--border);
//         }
//         @media (max-width: 768px) {
//             .main { flex-direction: column; }
//             .sidebar { width: 100%; position: static; margin-bottom: 1rem; }
//             .container { padding: 1rem; }
//         }
//     </style>
// </head>
// <body>
//     <div class="header">
//         <div class="header-content">
//             <div class="logo"><h1><i class="fas fa-store"></i> E‑Commerce API</h1></div>
//             <div class="status"><span class="status-badge"></span><span>Server: ${serverStatus.status}</span><span>Uptime: ${serverStatus.uptime}</span></div>
//             <div class="base-url"><i class="fas fa-link"></i> Base URL: <code>${BASE_URL}</code></div>
//         </div>
//     </div>
//     <div class="container">
//         <div class="main">
//             <aside class="sidebar">
//                 <nav><ul>
//                     <li><a href="#auth">🔐 Authentication</a></li>
//                     <li><a href="#products">📦 Products</a></li>
//                     <li><a href="#categories">🏷️ Categories</a></li>
//                     <li><a href="#cart">🛒 Cart</a></li>
//                     <li><a href="#users">👤 Users</a></li>
//                     <li><a href="#admin">📊 Admin Dashboard</a></li>
//                     <li><a href="#common">📄 Common & Errors</a></li>
//                 </ul></nav>
//             </aside>
//             <main class="content">
//                 <!-- ==================== AUTH ==================== -->
//                 <div class="section" id="auth">
//                     <div class="section-header" onclick="toggleSection(this)">
//                         <span><i class="fas fa-key"></i> Authentication</span><i class="fas fa-chevron-down"></i>
//                     </div>
//                     <div class="section-content">
//                         <div class="endpoint"><div><span class="endpoint-method method-post">POST</span><span class="endpoint-path">/auth/signup</span></div><div class="endpoint-desc">Create a new customer account. Sets <code>accessToken</code> cookie (HttpOnly).</div><details class="details"><summary>Request & Response</summary><p><strong>Request Body:</strong></p><pre><code>{
//   "name": "John Doe",
//   "email": "john@example.com",
//   "password": "StrongPass123"
// }</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre><p><strong>Response (201):</strong></p><pre><code>{
//   "data": {
//     "id": "uuid",
//     "name": "John Doe",
//     "role": "user",
//     "cartCounts": 0
//   },
//   "message": "Logged in successfully"
// }</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-post">POST</span><span class="endpoint-path">/auth/login</span></div><div class="endpoint-desc">Login with email & password. Returns user info and sets cookie.</div><details class="details"><summary>Request & Response</summary><pre><code>{"email":"john@example.com","password":"StrongPass123"}</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre><pre><code>{
//   "data": {
//     "id": "uuid",
//     "name": "John Doe",
//     "cartCounts": 2,
//     "role": "user"
//   },
//   "message": "Logged in successfully"
// }</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-post">POST</span><span class="endpoint-path">/auth/logout</span><span class="badge">🔒 Auth required</span></div><div class="endpoint-desc">Clear authentication cookies.</div><details class="details"><summary>Response</summary><pre><code>{"data":null,"message":"Logged out successfully"}</code></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-patch">PATCH</span><span class="endpoint-path">/auth/change-password</span><span class="badge">🔒 Auth required</span></div><div class="endpoint-desc">Change password (old + new).</div><details class="details"><summary>Request body</summary><pre><code>{"oldPassword":"StrongPass123","newPassword":"NewStrongPass456"}</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/auth/me</span><span class="badge">🔒 Auth required</span></div><div class="endpoint-desc">Get own profile (id, name, cartCounts, role).</div><details class="details"><summary>Response</summary><pre><code>{
//   "data": { "id": "uuid", "name": "John", "cartCounts": 2, "role": "user" },
//   "message": "User data successfully"
// }</code></pre></details></div>
//                     </div>
//                 </div>

//                 <!-- ==================== PRODUCTS ==================== -->
//                 <div class="section" id="products">
//                     <div class="section-header" onclick="toggleSection(this)">
//                         <span><i class="fas fa-box"></i> Products</span><i class="fas fa-chevron-down"></i>
//                     </div>
//                     <div class="section-content">
//                         <div class="endpoint"><div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/products</span><span class="badge">🔒 Auth optional</span></div><div class="endpoint-desc">Get all products with filtering, pagination, and cart status (if logged in).</div><details class="details"><summary>Query parameters</summary><ul><li><code>page</code> (default 1)</li><li><code>limit</code> (default 2, max 100)</li><li><code>search</code> – search in title (case‑insensitive)</li><li><code>categoryId</code> – filter by category UUID</li><li><code>minPrice</code> / <code>maxPrice</code> – filter by price range</li></ul><p><strong>Example response:</strong></p><pre><code>{
//   "data": {
//     "meta": { "totalPages": 5, "page": 1, "limit": 10 },
//     "products": [
//       { "id": "...", "title": "...", "imageCover": "...", "price": 99, "star": 4, "isLiked": false }
//     ]
//   },
//   "message": "products retrieved successfully"
// }</code></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/products/:productId</span><span class="badge">🔒 Auth optional</span></div><div class="endpoint-desc">Get a single product + related products from same category. Includes <code>isLiked</code> (cart status) if authenticated.</div><details class="details"><summary>Response</summary><pre><code>{
//   "data": {
//     "product": { "id": "...", "title": "...", "price": 99, "isLiked": false, "category": {...} },
//     "products": [ /* related products */ ]
//   },
//   "message": "product retrieved successfully"
// }</code></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-post">POST</span><span class="endpoint-path">/products</span><span class="badge">🔒 Admin only</span></div><div class="endpoint-desc">Create a new product.</div><details class="details"><summary>Request body</summary><pre><code>{
//   "title": "Wireless Mouse",
//   "desc": "Ergonomic mouse with RGB",
//   "price": 29,
//   "star": 4,
//   "discount": 5,
//   "imageCover": "https://example.com/mouse.jpg",
//   "images": ["https://.../img1.jpg", "https://.../img2.jpg"],
//   "categoryId": "uuid"
// }</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-patch">PATCH</span><span class="endpoint-path">/products/:productId</span><span class="badge">🔒 Admin only</span></div><div class="endpoint-desc">Update a product (partial data allowed).</div><details class="details"><summary>Example</summary><pre><code>{ "price": 25, "discount": 10 }</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-delete">DELETE</span><span class="endpoint-path">/products/:productId</span><span class="badge">🔒 Admin only</span></div><div class="endpoint-desc">Delete a product (only by the admin who created it).</div></div>
//                     </div>
//                 </div>

//                 <!-- ==================== CATEGORIES ==================== -->
//                 <div class="section" id="categories">
//                     <div class="section-header" onclick="toggleSection(this)">
//                         <span><i class="fas fa-tags"></i> Categories</span><i class="fas fa-chevron-down"></i>
//                     </div>
//                     <div class="section-content">
//                         <div class="endpoint"><div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/categories</span><span class="badge">🔒 Auth required</span></div><div class="endpoint-desc">Get all categories (sorted alphabetically).</div><details class="details"><summary>Response</summary><pre><code>{
//   "data": [{ "id": "uuid", "category": "Electronics" }],
//   "message": "Categories retrieved successfully"
// }</code></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-post">POST</span><span class="endpoint-path">/categories</span><span class="badge">🔒 Admin only</span></div><div class="endpoint-desc">Create a new category.</div><details class="details"><summary>Request body</summary><pre><code>{ "category": "Books" }</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-patch">PATCH</span><span class="endpoint-path">/categories/:categoryId</span><span class="badge">🔒 Admin only</span></div><div class="endpoint-desc">Update category name.</div><details class="details"><summary>Example</summary><pre><code>{ "category": "Electronics & Gadgets" }</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-delete">DELETE</span><span class="endpoint-path">/categories/:categoryId</span><span class="badge">🔒 Admin only</span></div><div class="endpoint-desc">Delete a category (decrements admin's <code>productCounts</code>).</div></div>
//                     </div>
//                 </div>

//                 <!-- ==================== CART ==================== -->
//                 <div class="section" id="cart">
//                     <div class="section-header" onclick="toggleSection(this)">
//                         <span><i class="fas fa-shopping-cart"></i> Cart</span><i class="fas fa-chevron-down"></i>
//                     </div>
//                     <div class="section-content">
//                         <div class="endpoint"><div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/carts</span><span class="badge">🔒 Auth required</span></div><div class="endpoint-desc">Get paginated cart items for the authenticated user.</div><details class="details"><summary>Query: <code>?page=1&limit=9</code></summary><pre><code>{
//   "data": {
//     "meta": { "totalPages": 2, "page": 1, "limit": 9 },
//     "carts": [
//       { "product": { "id": "...", "title": "...", "price": 29, "imageCover": "...", "star": 4, "discount": 5 } }
//     ]
//   },
//   "message": "Get All Carts Successfully"
// }</code></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-post">POST</span><span class="endpoint-path">/carts/:cartId</span><span class="badge">🔒 Auth required</span></div><div class="endpoint-desc">Add or remove a product from the cart (toggle). Updates user's <code>cartCounts</code>.</div><details class="details"><summary>Response</summary><pre><code>{ "data": true, "message": "Product liked successfully" }</code></pre></details></div>
//                     </div>
//                 </div>

//                 <!-- ==================== USERS ==================== -->
//                 <div class="section" id="users">
//                     <div class="section-header" onclick="toggleSection(this)">
//                         <span><i class="fas fa-user"></i> Users</span><i class="fas fa-chevron-down"></i>
//                     </div>
//                     <div class="section-content">
//                         <div class="endpoint"><div><span class="endpoint-method method-patch">PATCH</span><span class="endpoint-path">/users</span><span class="badge">🔒 Auth required</span></div><div class="endpoint-desc">Update own profile (name only, based on BaseDataUserDto).</div><details class="details"><summary>Request body</summary><pre><code>{ "name": "New Name" }</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-delete">DELETE</span><span class="endpoint-path">/users</span><span class="badge">🔒 Auth required</span></div><div class="endpoint-desc">Permanently delete own account.</div><details class="details"><summary>Response</summary><pre><code>{"data":null,"message":"User deleted successfully"}</code></pre></details></div>
//                     </div>
//                 </div>

//                 <!-- ==================== ADMIN DASHBOARD ==================== -->
//                 <div class="section" id="admin">
//                     <div class="section-header" onclick="toggleSection(this)">
//                         <span><i class="fas fa-chart-line"></i> Admin Dashboard</span><i class="fas fa-chevron-down"></i>
//                     </div>
//                     <div class="section-content">
//                         <div class="endpoint"><div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/admin-dashboard</span><span class="badge">🔒 Admin only</span></div><div class="endpoint-desc">Get global counts: total products, orders (hardcoded 0 in current code), total users.</div><details class="details"><summary>Response</summary><pre><code>{
//   "data": { "productCounts": 120, "orderCounts": 0, "userCounts": 45 },
//   "message": "Admin dashboard data fetched successfully"
// }</code></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/admin-dashboard/users</span><span class="badge">🔒 Admin only</span></div><div class="endpoint-desc">Get all registered users (role = 'user') with pagination.</div><details class="details"><summary>Query: <code>?page=1&limit=10</code></summary><pre><code>{
//   "data": {
//     "meta": { "totalPages": 5, "page": 1, "limit": 10 },
//     "users": [{ "id": "uuid", "name": "John", "email": "john@example.com", "createdAt": "..." }]
//   },
//   "message": "Get All Users successfully"
// }</code></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/admin-dashboard/products</span><span class="badge">🔒 Admin only</span></div><div class="endpoint-desc">Get all products (admin view) with search, pagination.</div><details class="details"><summary>Query: <code>?search=laptop&page=1&limit=10</code></summary><pre><code>{
//   "data": {
//     "meta": { "totalPages": 3, "page": 1, "limit": 10 },
//     "products": [{ "id": "...", "title": "...", "imageCover": "...", "price": 999, "star": 5, "category": {...} }]
//   }
// }</code></pre></details></div>
//                         <div class="endpoint"><div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/admin-dashboard/:productId</span><span class="badge">🔒 Admin only</span></div><div class="endpoint-desc">Get single product details (including full description, images, category).</div></div>
//                     </div>
//                 </div>

//                 <!-- ==================== COMMON ==================== -->
//                 <div class="section" id="common">
//                     <div class="section-header" onclick="toggleSection(this)">
//                         <span><i class="fas fa-cubes"></i> Common DTOs & Error Handling</span><i class="fas fa-chevron-down"></i>
//                     </div>
//                     <div class="section-content">
//                         <h4>Standard Response Format</h4>
//                         <pre><code>{ "data": any | null, "message": string }</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre>
//                         <h4>Authentication</h4>
//                         <p>All endpoints marked with <span class="badge">🔒 Auth required</span> expect a valid <code>accessToken</code> cookie (HttpOnly, SameSite=Strict, Secure in production). Admin endpoints also require the user role to be <code>admin</code>.</p>
//                         <h4>Common HTTP Errors</h4>
//                         <ul>
//                             <li><strong>400 Bad Request</strong> – Validation error, email exists, weak password, etc.</li>
//                             <li><strong>401 Unauthorized</strong> – Missing or invalid token.</li>
//                             <li><strong>403 Forbidden</strong> – Authenticated but not admin (for admin routes).</li>
//                             <li><strong>404 Not Found</strong> – Product, category, or user not found.</li>
//                         </ul>
//                         <h4>Important DTOs</h4>
//                         <ul>
//                             <li><strong>SignUpAuthDto</strong> – name, email, password</li>
//                             <li><strong>CreateProductDto</strong> – title, desc, price, star, discount, imageCover, images, categoryId</li>
//                             <li><strong>GetAllProductDto</strong> – page, limit, search, categoryId, minPrice, maxPrice</li>
//                             <li><strong>CreateCategoryDto</strong> – category (string)</li>
//                         </ul>
//                     </div>
//                 </div>
//             </main>
//         </div>
//         <footer><p>E‑Commerce API v1 | Built with NestJS + Prisma | © ${new Date().getFullYear()}</p></footer>
//     </div>
//     <script nonce="${nonce}">
//         function toggleSection(header) {
//             const content = header.nextElementSibling;
//             content.classList.toggle('collapsed');
//             const icon = header.querySelector('i:last-child');
//             icon.classList.toggle('fa-chevron-down');
//             icon.classList.toggle('fa-chevron-right');
//         }

//         function copyToClipboard(btn) {
//             const pre = btn.closest('pre');
//             if (pre) {
//                 const code = pre.querySelector('code');
//                 const text = code ? code.innerText : pre.innerText;
//                 navigator.clipboard.writeText(text).then(() => {
//                     btn.innerHTML = '✓ Copied!';
//                     setTimeout(() => btn.innerHTML = 'Copy', 2000);
//                 }).catch(() => alert('Press Ctrl+C to copy'));
//             }
//         }

//         window.toggleSection = toggleSection;
//         window.copyToClipboard = copyToClipboard;

//         document.querySelectorAll('.sidebar a').forEach(anchor => {
//             anchor.addEventListener('click', function(e) {
//                 e.preventDefault();
//                 const targetId = this.getAttribute('href').substring(1);
//                 const target = document.getElementById(targetId);
//                 if (target) {
//                     target.scrollIntoView({ behavior: 'smooth' });
//                     history.pushState(null, null, '#' + targetId);
//                 }
//             });
//         });

//         // Dark mode toggle
//         const darkToggle = document.createElement('button');
//         darkToggle.innerHTML = '<i class="fas fa-moon"></i> Dark mode';
//         darkToggle.className = 'status';
//         darkToggle.style.cursor = 'pointer';
//         darkToggle.style.marginLeft = '10px';
//         document.querySelector('.header-content').appendChild(darkToggle);
//         darkToggle.addEventListener('click', () => {
//             document.body.classList.toggle('dark');
//             localStorage.setItem('darkMode', document.body.classList.contains('dark'));
//             darkToggle.innerHTML = document.body.classList.contains('dark') ? '<i class="fas fa-sun"></i> Light mode' : '<i class="fas fa-moon"></i> Dark mode';
//         });
//         if (localStorage.getItem('darkMode') === 'true') {
//             document.body.classList.add('dark');
//             darkToggle.innerHTML = '<i class="fas fa-sun"></i> Light mode';
//         }
//     </script>
// </body>
// </html>`;
//     res.send(html);
//   }

//   private getServerStatus() {
//     const uptime = os.uptime();
//     const days = Math.floor(uptime / 86400);
//     const hours = Math.floor((uptime % 86400) / 3600);
//     const minutes = Math.floor((uptime % 3600) / 60);
//     return {
//       status: 'online',
//       uptime: `${days}d ${hours}h ${minutes}m`,
//       timestamp: new Date().toISOString(),
//       nodeVersion: process.version,
//       env: process.env.NODE_ENV || 'development',
//     };
//   }
// }

import { Controller, Get, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import * as os from 'os';
import AuthDecorator from './decorator/auth.decorator';

@Controller('')
export class HomeController {
  constructor(private configService: ConfigService) {}

  @AuthDecorator()
  @Get()
  getDocs(@Res() res: Response) {
    const nonce = res.locals.nonce || '';
    const BASE_URL =
      this.configService.get('API_URL') || 'http://localhost:3000';
    const serverStatus = this.getServerStatus();

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E‑Commerce API Documentation</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        :root {
            --primary: #4f46e5;
            --primary-dark: #4338ca;
            --secondary: #10b981;
            --danger: #ef4444;
            --warning: #f59e0b;
            --info: #3b82f6;
            --dark: #1f2937;
            --light: #f9fafb;
            --border: #e5e7eb;
            --code-bg: #1e293b;
            --text-muted: #6b7280;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: var(--light); color: var(--dark); line-height: 1.5; }
        .container { max-width: 1400px; margin: 0 auto; padding: 2rem; }
        .header {
            background: white;
            border-bottom: 1px solid var(--border);
            padding: 1rem 2rem;
            position: sticky;
            top: 0;
            z-index: 100;
            backdrop-filter: blur(8px);
            background: rgba(255,255,255,0.95);
        }
        .header-content {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .logo h1 {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .status {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--light);
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-size: 0.875rem;
        }
        .status-badge {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--secondary);
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.2); }
            100% { opacity: 1; transform: scale(1); }
        }
        .base-url {
            font-family: monospace;
            background: var(--light);
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
        }
        .main { display: flex; gap: 2rem; margin-top: 2rem; }
        .sidebar {
            width: 280px;
            flex-shrink: 0;
            position: sticky;
            top: 90px;
            height: fit-content;
            background: white;
            border-radius: 1rem;
            padding: 1.5rem;
            border: 1px solid var(--border);
        }
        .sidebar nav ul { list-style: none; }
        .sidebar nav ul li { margin-bottom: 0.5rem; }
        .sidebar nav ul li a {
            text-decoration: none;
            color: var(--dark);
            display: block;
            padding: 0.5rem 0.75rem;
            border-radius: 0.5rem;
            transition: all 0.2s;
            font-weight: 500;
        }
        .sidebar nav ul li a:hover { background: var(--light); color: var(--primary); }
        .content { flex: 1; min-width: 0; }
        .section {
            background: white;
            border-radius: 1rem;
            border: 1px solid var(--border);
            margin-bottom: 2rem;
            overflow: hidden;
        }
        .section-header {
            padding: 1rem 1.5rem;
            background: white;
            border-bottom: 1px solid var(--border);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            font-size: 1.25rem;
        }
        .section-header:hover { background: var(--light); }
        .section-content { padding: 1.5rem; }
        .section-content.collapsed { display: none; }
        .endpoint {
            margin-bottom: 2rem;
            border-left: 3px solid var(--border);
            padding-left: 1rem;
        }
        .endpoint-method {
            display: inline-block;
            font-weight: 700;
            padding: 0.25rem 0.75rem;
            border-radius: 0.375rem;
            font-size: 0.75rem;
            margin-right: 0.75rem;
        }
        .method-get { background: #d1fae5; color: #065f46; }
        .method-post { background: #fed7aa; color: #92400e; }
        .method-put { background: #fef3c7; color: #b45309; }
        .method-patch { background: #c7d2fe; color: #3730a3; }
        .method-delete { background: #fee2e2; color: #991b1b; }
        .endpoint-path { font-family: monospace; font-size: 1rem; font-weight: 500; }
        .endpoint-desc { color: var(--text-muted); margin: 0.5rem 0; font-size: 0.875rem; }
        .details { margin-top: 1rem; }
        .details summary { cursor: pointer; font-weight: 500; color: var(--primary); margin-bottom: 0.5rem; }
        pre {
            background: var(--code-bg);
            color: #e2e8f0;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            font-size: 0.875rem;
            margin: 0.5rem 0;
            position: relative;
        }
        .copy-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: #334155;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
        }
        .copy-btn:hover { background: #475569; }
        .badge {
            display: inline-block;
            background: var(--light);
            padding: 0.25rem 0.5rem;
            border-radius: 0.375rem;
            font-size: 0.75rem;
            font-weight: 500;
            margin-right: 0.5rem;
        }
        .badge-admin { background: #fee2e2; color: #991b1b; }
        .badge-auth { background: #dbeafe; color: #1e40af; }
        footer {
            text-align: center;
            margin-top: 3rem;
            padding: 1.5rem;
            color: var(--text-muted);
            font-size: 0.875rem;
            border-top: 1px solid var(--border);
        }
        @media (max-width: 768px) {
            .main { flex-direction: column; }
            .sidebar { width: 100%; position: static; margin-bottom: 1rem; }
            .container { padding: 1rem; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="header-content">
            <div class="logo"><h1><i class="fas fa-store"></i> E‑Commerce API</h1></div>
            <div class="status"><span class="status-badge"></span><span>Server: ${serverStatus.status}</span><span>Uptime: ${serverStatus.uptime}</span></div>
            <div class="base-url"><i class="fas fa-link"></i> Base URL: <code>${BASE_URL}</code></div>
        </div>
    </div>
    <div class="container">
        <div class="main">
            <aside class="sidebar">
                <nav><ul>
                    <li><a href="#auth">🔐 Authentication</a></li>
                    <li><a href="#products">📦 Products</a></li>
                    <li><a href="#categories">🏷️ Categories</a></li>
                    <li><a href="#cart">🛒 Cart</a></li>
                    <li><a href="#orders">📋 Orders</a></li>
                    <li><a href="#users">👤 Users</a></li>
                    <li><a href="#admin">📊 Admin Dashboard</a></li>
                    <li><a href="#common">📄 Common</a></li>
                </ul></nav>
            </aside>
            <main class="content">
                <!-- AUTH -->
                <div class="section" id="auth">
                    <div class="section-header" onclick="toggleSection(this)">
                        <span><i class="fas fa-key"></i> Authentication</span><i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="section-content">
                        <div class="endpoint">
                            <div><span class="endpoint-method method-post">POST</span><span class="endpoint-path">/auth/signup</span></div>
                            <div class="endpoint-desc">Create a new user account. Returns user data and sets <code>accessToken</code> cookie (HttpOnly).</div>
                            <details class="details"><summary>Request body</summary><pre><code>{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPass123"
}</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-post">POST</span><span class="endpoint-path">/auth/login</span></div>
                            <div class="endpoint-desc">Login with email & password. Returns user info and sets cookie.</div>
                            <details class="details"><summary>Request body</summary><pre><code>{"email":"john@example.com","password":"StrongPass123"}</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-post">POST</span><span class="endpoint-path">/auth/logout</span><span class="badge badge-auth">🔒 Auth required</span></div>
                            <div class="endpoint-desc">Clear authentication cookies.</div>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-patch">PATCH</span><span class="endpoint-path">/auth/change-password</span><span class="badge badge-auth">🔒 Auth required</span></div>
                            <div class="endpoint-desc">Change password (requires old + new).</div>
                            <details class="details"><summary>Request body</summary><pre><code>{"oldPassword":"StrongPass123","newPassword":"NewStrongPass456"}</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/auth/me</span><span class="badge badge-auth">🔒 Auth required</span></div>
                            <div class="endpoint-desc">Get own profile (id, name, cartCounts, role).</div>
                        </div>
                    </div>
                </div>

                <!-- PRODUCTS -->
                <div class="section" id="products">
                    <div class="section-header" onclick="toggleSection(this)">
                        <span><i class="fas fa-box"></i> Products</span><i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="section-content">
                        <div class="endpoint">
                            <div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/products</span><span class="badge badge-auth">🔒 Auth optional</span></div>
                            <div class="endpoint-desc">Get all products with filtering, pagination, and cart status (<code>isLiked</code>) if logged in.</div>
                            <details class="details"><summary>Query params</summary><ul>
                                <li><code>page</code> (default 1)</li>
                                <li><code>limit</code> (default 2)</li>
                                <li><code>search</code> – search in title (case‑insensitive)</li>
                                <li><code>categoryId</code> – filter by category UUID</li>
                                <li><code>minPrice</code> / <code>maxPrice</code> – filter by price range</li>
                            </ul></details>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/products/:productId</span><span class="badge badge-auth">🔒 Auth optional</span></div>
                            <div class="endpoint-desc">Get single product + related products from same category. Includes <code>isLiked</code> if authenticated.</div>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-post">POST</span><span class="endpoint-path">/products</span><span class="badge badge-admin">🔒 Admin only</span></div>
                            <div class="endpoint-desc">Create a new product.</div>
                            <details class="details"><summary>Request body</summary><pre><code>{
  "title": "Wireless Mouse",
  "desc": "Ergonomic mouse with RGB",
  "price": 29.99,
  "imageCover": "https://example.com/mouse.jpg",
  "categoryId": "uuid"
}</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-patch">PATCH</span><span class="endpoint-path">/products/:productId</span><span class="badge badge-admin">🔒 Admin only</span></div>
                            <div class="endpoint-desc">Update a product (partial data allowed).</div>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-delete">DELETE</span><span class="endpoint-path">/products/:productId</span><span class="badge badge-admin">🔒 Admin only</span></div>
                            <div class="endpoint-desc">Soft‑delete a product (only by the admin who created it).</div>
                        </div>
                    </div>
                </div>

                <!-- CATEGORIES -->
                <div class="section" id="categories">
                    <div class="section-header" onclick="toggleSection(this)">
                        <span><i class="fas fa-tags"></i> Categories</span><i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="section-content">
                        <div class="endpoint">
                            <div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/categories</span><span class="badge badge-auth">🔒 Auth required</span></div>
                            <div class="endpoint-desc">Get all categories (sorted alphabetically).</div>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-post">POST</span><span class="endpoint-path">/categories</span><span class="badge badge-admin">🔒 Admin only</span></div>
                            <div class="endpoint-desc">Create a new category.</div>
                            <details class="details"><summary>Request body</summary><pre><code>{ "category": "Books" }</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-patch">PATCH</span><span class="endpoint-path">/categories/:categoryId</span><span class="badge badge-admin">🔒 Admin only</span></div>
                            <div class="endpoint-desc">Update category name.</div>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-delete">DELETE</span><span class="endpoint-path">/categories/:categoryId</span><span class="badge badge-admin">🔒 Admin only</span></div>
                            <div class="endpoint-desc">Soft‑delete a category (<code>isDeleted = true</code>).</div>
                        </div>
                    </div>
                </div>

                <!-- CART -->
                <div class="section" id="cart">
                    <div class="section-header" onclick="toggleSection(this)">
                        <span><i class="fas fa-shopping-cart"></i> Cart</span><i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="section-content">
                        <div class="endpoint">
                            <div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/carts</span><span class="badge badge-auth">🔒 Auth required</span></div>
                            <div class="endpoint-desc">Get paginated cart items for the authenticated user.</div>
                            <details class="details"><summary>Query: <code>?page=1&limit=9</code></summary></details>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-post">POST</span><span class="endpoint-path">/carts/:productId</span><span class="badge badge-auth">🔒 Auth required</span></div>
                            <div class="endpoint-desc">Toggle product in cart (add/remove). Updates user's <code>cartCounts</code>.</div>
                        </div>
                    </div>
                </div>

                <!-- ORDERS -->
                <div class="section" id="orders">
                    <div class="section-header" onclick="toggleSection(this)">
                        <span><i class="fas fa-clipboard-list"></i> Orders</span><i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="section-content">
                        <div class="endpoint">
                            <div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/orders/my-orders</span><span class="badge badge-auth">🔒 Auth required</span></div>
                            <div class="endpoint-desc">Get all orders for the authenticated user.</div>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/orders/:orderId</span><span class="badge badge-auth">🔒 Auth required</span></div>
                            <div class="endpoint-desc">Get a specific order (with items and product details).</div>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-post">POST</span><span class="endpoint-path">/orders</span><span class="badge badge-auth">🔒 Auth required</span></div>
                            <div class="endpoint-desc">Create a new order. Clears user's cart and resets <code>cartCounts</code>.</div>
                            <details class="details"><summary>Request body</summary><pre><code>{
  "paymentMethod": "CASH", // or "ONLINE"
  "items": [{ "productId": "uuid" }, { "productId": "uuid" }]
}</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details>
                        </div>
                    </div>
                </div>

                <!-- USERS -->
                <div class="section" id="users">
                    <div class="section-header" onclick="toggleSection(this)">
                        <span><i class="fas fa-user"></i> Users</span><i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="section-content">
                        <div class="endpoint">
                            <div><span class="endpoint-method method-patch">PATCH</span><span class="endpoint-path">/users</span><span class="badge badge-auth">🔒 Auth required</span></div>
                            <div class="endpoint-desc">Update own profile (name only).</div>
                            <details class="details"><summary>Request body</summary><pre><code>{ "name": "New Name" }</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre></details>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-delete">DELETE</span><span class="endpoint-path">/users</span><span class="badge badge-auth">🔒 Auth required</span></div>
                            <div class="endpoint-desc">Permanently delete own account.</div>
                        </div>
                    </div>
                </div>

                <!-- ADMIN DASHBOARD -->
                <div class="section" id="admin">
                    <div class="section-header" onclick="toggleSection(this)">
                        <span><i class="fas fa-chart-line"></i> Admin Dashboard</span><i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="section-content">
                        <div class="endpoint">
                            <div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/admin-dashboard</span><span class="badge badge-admin">🔒 Admin only</span></div>
                            <div class="endpoint-desc">Get global counts: total products, orders, and users.</div>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/admin-dashboard/users</span><span class="badge badge-admin">🔒 Admin only</span></div>
                            <div class="endpoint-desc">Get all registered users (role = 'user') with pagination.</div>
                            <details class="details"><summary>Query: <code>?page=1&limit=10</code></summary></details>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/admin-dashboard/orders</span><span class="badge badge-admin">🔒 Admin only</span></div>
                            <div class="endpoint-desc">Get all orders (admin view) with pagination.</div>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/admin-dashboard/products</span><span class="badge badge-admin">🔒 Admin only</span></div>
                            <div class="endpoint-desc">Get all products (admin view) with search & pagination.</div>
                            <details class="details"><summary>Query: <code>?search=laptop&page=1&limit=10</code></summary></details>
                        </div>
                        <div class="endpoint">
                            <div><span class="endpoint-method method-get">GET</span><span class="endpoint-path">/admin-dashboard/:productId</span><span class="badge badge-admin">🔒 Admin only</span></div>
                            <div class="endpoint-desc">Get single product details (full description, category).</div>
                        </div>
                    </div>
                </div>

                <!-- COMMON -->
                <div class="section" id="common">
                    <div class="section-header" onclick="toggleSection(this)">
                        <span><i class="fas fa-cubes"></i> Common DTOs & Errors</span><i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="section-content">
                        <h4>Standard Response Format</h4>
                        <pre><code>{ "data": any | null, "message": string }</code><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button></pre>
                        <h4>Authentication</h4>
                        <p>Endpoints marked with <span class="badge badge-auth">🔒 Auth required</span> expect a valid <code>accessToken</code> cookie (HttpOnly, SameSite=Strict, Secure in production). Admin endpoints require <code>role = admin</code>.</p>
                        <h4>Common HTTP Errors</h4>
                        <ul>
                            <li><strong>400</strong> – Validation error, duplicate email, weak password, etc.</li>
                            <li><strong>401</strong> – Missing or invalid token.</li>
                            <li><strong>403</strong> – Not admin (for admin routes).</li>
                            <li><strong>404</strong> – Resource not found.</li>
                        </ul>
                        <h4>Key DTOs</h4>
                        <ul>
                            <li><strong>SignUpAuthDto</strong> – name, email, password</li>
                            <li><strong>CreateProductDto</strong> – title, desc, price, imageCover, categoryId</li>
                            <li><strong>GetAllProductDto</strong> – page, limit, search, categoryId, minPrice, maxPrice</li>
                            <li><strong>CreateCategoryDto</strong> – category (string)</li>
                            <li><strong>CreateOrderDto</strong> – paymentMethod (CASH/ONLINE), items (array of productId)</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
        <footer><p>E‑Commerce API v1 | Built with NestJS + Prisma | © ${new Date().getFullYear()}</p></footer>
    </div>
    <script nonce="${nonce}">
        function toggleSection(header) {
            const content = header.nextElementSibling;
            content.classList.toggle('collapsed');
            const icon = header.querySelector('i:last-child');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-right');
        }
        function copyToClipboard(btn) {
            const pre = btn.closest('pre');
            if (pre) {
                const code = pre.querySelector('code');
                const text = code ? code.innerText : pre.innerText;
                navigator.clipboard.writeText(text).then(() => {
                    btn.innerHTML = '✓ Copied!';
                    setTimeout(() => btn.innerHTML = 'Copy', 2000);
                }).catch(() => alert('Press Ctrl+C to copy'));
            }
        }
        window.toggleSection = toggleSection;
        window.copyToClipboard = copyToClipboard;
        // Smooth scrolling for sidebar links
        document.querySelectorAll('.sidebar a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    history.pushState(null, null, '#' + targetId);
                }
            });
        });
    </script>
</body>
</html>`;
    res.send(html);
  }

  private getServerStatus() {
    const uptime = os.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    return {
      status: 'online',
      uptime: `${days}d ${hours}h ${minutes}m`,
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      env: process.env.NODE_ENV || 'development',
    };
  }
}
