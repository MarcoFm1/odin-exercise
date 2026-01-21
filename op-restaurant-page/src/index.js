import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");
    const content = document.getElementById("div-content");


    const loadHome = () => {
    content.innerHTML = `
        <div id="div-welcome">
            <div id="div-welcome-text">
                <h1>WELCOME</h1>
                <p>欢迎</p>
                <p><i>An intense taste of China</i></p>
                <button id="go-menu">View Menu</button>
            </div>
        </div>
    `;

    document.getElementById("go-menu").addEventListener("click", loadMenu);
    };

    const loadMenu = () => {
        content.innerHTML = `        
        <div id="div-page">
            <h1>Chinese Menu</h1>

            <div class="menu-item">
                <h3>Sweet and Sour Chicken</h3>
                <p>Crispy chicken with pineapple and bell peppers in sweet and sour sauce.</p>
                <span>$12.99</span>
            </div>

            <div class="menu-item">
                <h3>Kung Pao Chicken</h3>
                <p>Spicy stir-fried chicken with peanuts, vegetables, and chili peppers.</p>
                <span>$13.50</span>
            </div>

            <div class="menu-item">
                <h3>Beef with Broccoli</h3>
                <p>Tender beef slices sautéed with fresh broccoli in soy sauce.</p>
                <span>$14.00</span>
            </div>

            <div class="menu-item">
                <h3>Vegetable Fried Rice</h3>
                <p>Fried rice with mixed vegetables, eggs, and soy sauce.</p>
                <span>$9.99</span>
            </div>

            <div class="menu-item">
                <h3>Spring Rolls</h3>
                <p>Crispy rolls filled with vegetables, served with sweet chili sauce.</p>
                <span>$6.50</span>
            </div>
        </div>
`
    }

    const loadAbout = () => {
        content.innerHTML = `
            <div id="div-page">
            <h1>About Us</h1>
            <p>
                Our restaurant was born from a passion for traditional Chinese cuisine,
                blending ancient recipes with a modern touch.
            </p>
            <p>
                Every dish represents balance: flavors, textures and harmony — a core
                principle of Chinese culture.
            </p>
            <p>
                From family tables in China to your plate, we honor authenticity,
                quality ingredients and the joy of sharing food.
            </p>
            <p style="margin-top:20px; font-style: italic;">
                食如人生，贵在平衡  
            </p>
        </div>

        `
    }

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const page = btn.textContent.trim();
            if (page === "Home") loadHome();
            if (page === "Menu") loadMenu();
            if (page === "About") loadAbout();

        })
    });
    loadHome()
});
