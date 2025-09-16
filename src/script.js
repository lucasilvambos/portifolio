// Dados do portfólio (podem ser editados via admin)
let portfolioData = {
    bio: {
        name: "Lucas Ambos",
        title: "Desenvolvedor Frontend",
        description: "Desenvolvedor apaixonado por criar experiências web incríveis. Especializado em React, JavaScript e design responsivo."
    },
    contact: {
        email: "lucas@example.com",
        whatsapp: "+55 11 99999-9999",
        github: "https://github.com/lucasambos",
        linkedin: "https://linkedin.com/in/lucasambos"
    },
    projects: [
        {
            id: 1,
            title: "Link Tree",
            description: "Uma página simples e elegante para centralizar todos os seus links importantes em um só lugar.",
            url: "https://link-tree-brown.vercel.app/",
            technologies: ["HTML", "CSS", "JavaScript"]
        },
        {
            id: 2,
            title: "Local Storage App",
            description: "Aplicação que demonstra o uso do Local Storage para persistência de dados no navegador.",
            url: "https://local-storage-eosin.vercel.app/",
            technologies: ["React", "Local Storage", "CSS"]
        },
        {
            id: 3,
            title: "Cafeteria",
            description: "Site completo para uma cafeteria com navegação, catálogo de produtos e design moderno.",
            url: "https://cafeteria-sooty.vercel.app/",
            technologies: ["React", "CSS", "Responsive Design"]
        }
    ]
};

// Carregar dados salvos do localStorage
function loadData() {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        portfolioData = JSON.parse(savedData);
    }
    updateContent();
}

// Atualizar conteúdo da página
function updateContent() {
    // Atualizar bio
    document.getElementById('hero-name').textContent = portfolioData.bio.name;
    document.getElementById('hero-title').textContent = portfolioData.bio.title;
    document.getElementById('hero-description').textContent = portfolioData.bio.description;
    
    // Atualizar projetos
    updateProjects();
    
    // Atualizar contatos
    updateContacts();
}

// Atualizar seção de projetos
function updateProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    
    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const technologiesHTML = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        projectCard.innerHTML = `
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-technologies">
                ${technologiesHTML}
            </div>
            <a href="${project.url}" target="_blank" class="btn btn-primary">Ver Projeto</a>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Atualizar seção de contatos
function updateContacts() {
    const contactGrid = document.getElementById('contact-grid');
    contactGrid.innerHTML = '';
    
    const contacts = [
        {
            icon: '📧',
            title: 'Email',
            description: 'Envie-me um email',
            value: portfolioData.contact.email,
            href: `mailto:${portfolioData.contact.email}`
        },
        {
            icon: '💬',
            title: 'WhatsApp',
            description: 'Vamos conversar',
            value: portfolioData.contact.whatsapp,
            href: `https://wa.me/${portfolioData.contact.whatsapp.replace(/\D/g, '')}`
        },
        {
            icon: '🐙',
            title: 'GitHub',
            description: 'Veja meus códigos',
            value: 'github.com/lucasambos',
            href: portfolioData.contact.github
        },
        {
            icon: '💼',
            title: 'LinkedIn',
            description: 'Conecte-se comigo',
            value: 'linkedin.com/in/lucasambos',
            href: portfolioData.contact.linkedin
        }
    ];
    
    contacts.forEach(contact => {
        const contactCard = document.createElement('div');
        contactCard.className = 'contact-card';
        
        contactCard.innerHTML = `
            <div class="contact-icon">${contact.icon}</div>
            <h3 class="contact-title">${contact.title}</h3>
            <p class="contact-description">${contact.description}</p>
            <a href="${contact.href}" target="_blank" class="contact-link">${contact.value}</a>
        `;
        
        contactGrid.appendChild(contactCard);
    });
}

// Navegação suave
function smoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Altura da navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Fechar menu mobile se estiver aberto
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
        });
    });
}

// Menu hamburger para mobile
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Destacar link ativo na navegação
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animações ao scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar cards de projetos e contatos
    const cards = document.querySelectorAll('.project-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    smoothScroll();
    setupMobileMenu();
    highlightActiveSection();
    
    // Aguardar um pouco para as animações de scroll
    setTimeout(setupScrollAnimations, 500);
});

// Adicionar estilo para link ativo
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);